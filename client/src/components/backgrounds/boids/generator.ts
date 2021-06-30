import Boid from "./boid";
import { ScreenConstants } from "../background";

interface CanvasConstantsInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  boidsArr: Boid[];
  lastDraw: number;
}

/**
 * Function to start drawing boids onto canvas
 */
const boidGenerator = () => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: CanvasConstantsInterface = {
    canvas: document.getElementById("boidCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    boidsArr: [],
    lastDraw: 0,
  };

  // Number of boids on canvas
  const NUMBOIDS = 20;

  //Reset canvas, instantiate boids, and start drawing
  const init = (): void => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.boidsArr = createBoids(NUMBOIDS);
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  //Cancels current drawing frame, and resets boid array
  const reset = () => {
    window.cancelAnimationFrame(canvasConstants.lastDraw);
    canvasConstants.lastDraw = 0;
    canvasConstants.boidsArr = [];
  };

  /**
   * Returns random number between bounds
   * If no arguments are supplied function picks between 0 and 1
   * @param bound Largest bound. Defaults to 0-1
   * @returns Random integer from 0-(bound-1)
   */
  const randNum = (bound: number = 2) => Math.floor(Math.random() * bound);

  /**
   * Instantiates boids into array
   * @param numBoids Number of boids to create
   * @returns Array of boids
   */
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

  /**
   * Draws to canvas
   * Every frame, clear the canvas, update and draw each boid onto canvas
   */
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
