import vector2d, {
  Vector2dInterface,
} from "components/backgrounds/helper-functions/vector2d";

const SlimeConstants = {
  sampleRadian: Math.PI / 16,
};

class SlimeAgent {
  pos: Vector2dInterface;
  direction: number;

  constructor(x: number, y: number, radian: number) {
    this.pos = vector2d.create(x, y);
    this.direction = radian;
  }

  // shouldTurnLeft(directionRadian: number): boolean {
  //   return directionRadian >= 0
  //     ? steeringRadian >= directionRadian ||
  //     steeringRadian <= directionRadian - Math.PI
  //     : steeringRadian <= directionRadian + Math.PI &&
  //     steeringRadian >= directionRadian;
  // }

  update = (boundary: Vector2dInterface) => {
    // Flip view direction if it is inside a wall
    const expectedPos = vector2d.add(
      this.pos,
      vector2d.extend(vector2d.resolveRadiansToUnitVector(this.direction), 5),
    );

    if (expectedPos.x < 0 || expectedPos.x > boundary.x) {
      if (this.direction >= 0) {
        this.direction = (Math.PI - this.direction) % (2 * Math.PI);
      } else {
        this.direction = (-Math.PI - this.direction) % Math.PI;
      }
    }
    // Reflect across x-axis
    if (expectedPos.y < 0 || expectedPos.y > boundary.y) {
      this.direction = -this.direction;
    }

    const newpos = vector2d.add(
      this.pos,
      vector2d.extend(vector2d.resolveRadiansToUnitVector(this.direction), 5),
    );
    console.log(this.direction);
    this.pos.x = Math.floor(newpos.x);
    this.pos.y = Math.floor(newpos.y);
  };

  draw = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "white";
    context.fill();

    //draw a simple arrow for the slime direction
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    const endX = this.pos.x + Math.cos(this.direction) * 10;
    const endY = this.pos.y + Math.sin(this.direction) * 10;
    context.lineTo(endX, endY);
    context.closePath();
    context.strokeStyle = "white";
    context.stroke();

    context.beginPath();
    context.arc(endX, endY, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "red";
    context.fill();
  };
}

export default SlimeAgent;
