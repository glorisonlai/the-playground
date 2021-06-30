import Boid from "./boid";
import { ScreenConstants } from "../background";

interface CanvasConstantsInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  boidsArr: Boid[];
  lastDraw: number;
}

const boidGenerator = () => {
  const canvasConstants: CanvasConstantsInterface = {
    canvas: document.getElementById("boidCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    boidsArr: [],
    lastDraw: 0,
  };
  const NUMBOIDS = 20;

  const init = (): void => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.boidsArr = createBoids(NUMBOIDS);
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  const reset = () => {
    window.cancelAnimationFrame(canvasConstants.lastDraw);
    canvasConstants.lastDraw = 0;
    canvasConstants.boidsArr = [];
  };

  /**
   * Returns random number between bounds
   * No arguments supplied defaults to boolean expression
   * @param bound Largest bound. Defaults to 0-1
   * @returns Random integer from 0-(bound-1)
   */
  const randNum = (bound: number = 2) => Math.floor(Math.random() * bound);

  const createBoids = (numBoids: number): Boid[] => {
    const boidsArr = [];
    for (let id = 0; id < numBoids; id++) {
      const x = randNum(ScreenConstants.width);
      const y = randNum(ScreenConstants.height);
      const force = randNum(360);
      boidsArr.push(new Boid({ id, x, y, force }));
    }
    return boidsArr;
  };

  const draw = () => {
    const ctx = canvasConstants.context;
    ctx.clearRect(
      0,
      0,
      canvasConstants.canvas.width,
      canvasConstants.canvas.height
    );
    canvasConstants.boidsArr.forEach((boid: Boid) => {
      boid.update(canvasConstants.boidsArr, {
        x: canvasConstants.canvas.width,
        y: canvasConstants.canvas.height,
      });
      boid.draw(ctx);
    });
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  init();
};

export default boidGenerator;
