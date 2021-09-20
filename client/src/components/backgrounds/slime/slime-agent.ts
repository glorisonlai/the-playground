import vector2d, {
  vector2dInterface,
} from "components/backgrounds/helper-functions/vector2d";

const SlimeConstants = {
  sampleRadian: Math.PI / 16,
};

class agent {
  pos: vector2dInterface;
  direction: number;

  constructor(x: number, y: number, radian: number) {
    this.pos = vector2d.create(x, y);
    this.direction = radian;
  }

  update = (boundary: vector2dInterface) => {
    // Flip view direction if it is inside a wall
    if (this.pos.x < 0 || this.pos.x > boundary.x) {
      this.direction = (this.direction + Math.PI) % Math.PI;
    }
    if (this.pos.y < 0 || this.pos.y > boundary.y) {
      this.direction = -this.direction;
    }
    const newpos = vector2d.add(
      this.pos,
      vector2d.extend(vector2d.resolveRadiansToUnitVector(this.direction), 1)
    );
    this.pos.x = Math.floor(newpos.x);
    this.pos.y = Math.floor(newpos.y);
  };
}

export default agent;
