import vector2d, { vector2dInterface } from "components/classes/vector2d";

type slimeVector = -1 | 0 | 1;

class agent {
  pos: vector2dInterface;
  direction: vector2dInterface;
  vision = [-1, 0, 1];

  constructor(x: number, y: number, vx: slimeVector, vy: slimeVector) {
    this.pos = vector2d.create(x, y);
    this.direction = vector2d.create(vx, vy);
  }

  draw = (ctx: CanvasRenderingContext2D) => {};
}

export default agent;
