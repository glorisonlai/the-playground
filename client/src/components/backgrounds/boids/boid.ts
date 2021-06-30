import vector2d, { vector2dInterface } from "../../classes/vector2d";

/**
 * File Stores state of boid, and steering logic
 */

// Constants to change steering bias
const boidConstants = {
  SPEED: 5,
  VIEWDIST: 40,
  AVOIDDIST: 20,
  STEERING_LIMIT: Math.PI / 16,
  AVOIDANCE_WEIGHT: 0,
  COHESION_WEIGHT: 9,
  ALIGNMENT_WEIGHT: 5,
  WALL_WEIGHT: 100,
  BIRD_LENGTH: 21,
  BIRD_WING: 30,
};

/**
 * Class to simulate boid and flocking behaviour
 * Source: https://gamedevelopment.tutsplus.com/tutorials/3-simple-rules-of-flocking-behaviors-alignment-cohesion-and-separation--gamedev-3444
 * TODO: Boids like to go to top-left corner and stay there. Something to do with cohesion/avoidance logic
 */
class Boid {
  id: number;
  head: vector2dInterface;
  direction: vector2dInterface;

  constructor({
    id,
    x,
    y,
    force,
  }: {
    id: number;
    x: number;
    y: number;
    force: number;
  }) {
    this.id = id;
    this.head = vector2d.create(x, y);
    this.direction = vector2d.resolveDegreesToUnitVector(force);
  }

  // Draw boid onto canvas
  draw = (ctx: CanvasRenderingContext2D) => {
    const centre = vector2d.add([
      this.head,
      vector2d.reverse(
        vector2d.extend(this.direction, boidConstants.BIRD_LENGTH)
      ),
    ]);
    const reverseRadians =
      vector2d.resolveUnitVectorToRadians(this.direction) - Math.PI;
    const tailRightRadian = reverseRadians + boidConstants.STEERING_LIMIT,
      tailLeftRadian = reverseRadians - boidConstants.STEERING_LIMIT;
    const tailRight = vector2d.resolveRadiansToUnitVector(tailRightRadian);
    const tailLeft = vector2d.resolveRadiansToUnitVector(tailLeftRadian);
    ctx.beginPath();
    ctx.moveTo(this.head.x, this.head.y);
    ctx.lineTo(
      this.head.x + tailRight.x * boidConstants.BIRD_WING,
      this.head.y + tailRight.y * boidConstants.BIRD_WING
    );
    ctx.lineTo(centre.x, centre.y);
    ctx.lineTo(
      this.head.x + tailLeft.x * boidConstants.BIRD_WING,
      this.head.y + tailLeft.y * boidConstants.BIRD_WING
    );
    ctx.lineTo(this.head.x, this.head.y);
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  };

  squaredDist = ({ head }: Boid) =>
    (this.head.x - head.x) ** 2 + (this.head.y - head.y) ** 2;

  /**
   * Simulates view cone of 180deg in front of boid
   * @param radius Radius of view cone
   * @param otherBoid Target boid
   * @returns True if in radius
   */
  inView = (radius: number, otherBoid: Boid) => {
    if (otherBoid.id === this.id) return false;
    if (this.squaredDist(otherBoid) >= radius ** 2) return false;
    const toOtherBoidVector = vector2d.add([
      otherBoid.head,
      vector2d.reverse(this.head),
    ]);
    const projection = vector2d.dotProd(this.direction, toOtherBoidVector);
    return projection >= -0.2 && projection <= radius ** 2;
  };

  turnLeft = (steeringRadian: number, directionRadian: number): boolean =>
    directionRadian >= 0
      ? steeringRadian >= directionRadian ||
        steeringRadian <= directionRadian - Math.PI
      : steeringRadian <= directionRadian + Math.PI &&
        steeringRadian >= directionRadian;

  /**
   * Return radians to steer boid after adjusting for boid behaviour
   * Limits turn rate to STEERING_LIMIT
   * @param alignmentVector How much to follow boid direction
   * @param cohesionVector How close to follow boid
   * @param avoidanceVector How far to steer away from collision
   * @returns Steering radians
   */
  steer = (
    alignmentVector: vector2dInterface,
    cohesionVector: vector2dInterface,
    avoidanceVector: vector2dInterface
  ) => {
    const steeringVector = vector2d.add([
      this.direction,
      vector2d.extend(alignmentVector, boidConstants.ALIGNMENT_WEIGHT),
      vector2d.extend(cohesionVector, boidConstants.COHESION_WEIGHT),
      vector2d.extend(avoidanceVector, boidConstants.AVOIDANCE_WEIGHT),
    ]);
    const steeringRadians = vector2d.resolveUnitVectorToRadians(steeringVector);
    const currVectorRadians = vector2d.resolveUnitVectorToRadians(
      this.direction
    );
    if (this.turnLeft(steeringRadians, currVectorRadians)) {
      // Go left
      if (
        currVectorRadians + boidConstants.STEERING_LIMIT > Math.PI &&
        steeringRadians < 0
      ) {
        return steeringRadians <=
          currVectorRadians + boidConstants.STEERING_LIMIT - 2 * Math.PI
          ? steeringRadians
          : currVectorRadians + boidConstants.STEERING_LIMIT;
      } else {
        return steeringRadians <=
          currVectorRadians + boidConstants.STEERING_LIMIT &&
          steeringRadians >= currVectorRadians
          ? steeringRadians
          : currVectorRadians + boidConstants.STEERING_LIMIT;
      }
    } else {
      // Go right
      if (
        currVectorRadians - boidConstants.STEERING_LIMIT <= -Math.PI &&
        steeringRadians >= 0
      ) {
        return steeringRadians >=
          currVectorRadians - boidConstants.STEERING_LIMIT + 2 * Math.PI
          ? steeringRadians
          : currVectorRadians - boidConstants.STEERING_LIMIT;
      } else {
        return steeringRadians >=
          currVectorRadians - boidConstants.STEERING_LIMIT &&
          steeringRadians <= currVectorRadians
          ? steeringRadians
          : currVectorRadians - boidConstants.STEERING_LIMIT;
      }
    }
  };

  /**
   * Looks at surroundings and updates direction and position
   * @param boidArr Every boid
   * @param boundary Screen dimensions
   */
  update = (boidArr: Boid[], boundary: vector2dInterface) => {
    let alignmentVector = { x: 0, y: 0 };
    let cohesionVector = { x: 0, y: 0 };
    let avoidanceVector = { x: 0, y: 0 };
    const nextVector = vector2d.add([
      this.head,
      vector2d.extend(this.direction, boidConstants.AVOIDDIST),
    ]);
    for (const otherBoid of boidArr) {
      if (this.inView(boidConstants.VIEWDIST, otherBoid)) {
        // Align direction with nearby boids
        alignmentVector = vector2d.add([alignmentVector, otherBoid.direction]);
        // Aim towards other boids
        cohesionVector = vector2d.add([
          cohesionVector,
          vector2d.extend(otherBoid.direction, boidConstants.SPEED),
          vector2d.reverse(this.head),
        ]);
        // Avoid collisions
        if (this.inView(boidConstants.AVOIDDIST, otherBoid)) {
          avoidanceVector = vector2d.add([
            avoidanceVector,
            vector2d.reverse(otherBoid.head),
            this.head,
          ]);
        }
      }
    }
    // Avoid walls
    if (nextVector.x <= 0) {
      // debugger;
      avoidanceVector.x += (boidConstants.WALL_WEIGHT * boundary.x) / 2;
      avoidanceVector.y += this.direction.y;
    } else if (nextVector.x >= boundary.x) {
      avoidanceVector.x -= (boidConstants.WALL_WEIGHT * boundary.x) / 2;
      avoidanceVector.y += this.direction.y;
    }
    if (nextVector.y <= 0) {
      // debugger;
      avoidanceVector.x += this.direction.x;
      avoidanceVector.y += (boidConstants.WALL_WEIGHT * boundary.y) / 2;
    } else if (nextVector.y >= boundary.y) {
      avoidanceVector.x += boidConstants.WALL_WEIGHT * this.direction.x;
      avoidanceVector.y -= (boidConstants.WALL_WEIGHT * boundary.y) / 2;
    }
    if (this.head.x < -10) {
      this.head.x = boundary.x + 10;
    } else if (this.head.x > boundary.x + 10) {
      this.head.x = -10;
    }
    if (this.head.y < -10) {
      this.head.y = boundary.y + 10;
    } else if (this.head.y > boundary.y + 10) {
      this.head.y = -10;
    }

    // Steer boid
    // debugger;
    const steeringVector = vector2d.resolveRadiansToUnitVector(
      this.steer(alignmentVector, cohesionVector, avoidanceVector)
    );
    // Update boid location
    this.direction = steeringVector;
    this.head = vector2d.add([
      this.head,
      vector2d.extend(this.direction, boidConstants.SPEED),
    ]);
  };
}

export default Boid;
