import Boid from "./boid";
import { CanvasInterface } from "../helper-functions/background";

interface BoidInterface extends CanvasInterface {
  boidsArr: Boid[];
}

/**
 * Function to start drawing boids onto canvas
 */
const boidGenerator = (width: number, height: number) => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: BoidInterface = {
    canvas: document.getElementById("boidCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    boidsArr: [],
    lastDraw: 0,
  };

  // Number of boids on canvas
  const NUMBOIDS = 100;

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
    let id_counter = 0;
    const boidArr = Array.from(
      {
        length: numBoids,
      },
      () => {
        const id = id_counter++;
        const x = randNum(width);
        const y = randNum(height);
        const force = randNum(360);
        return new Boid(id, x, y, force);
      }
    );
    return boidArr;
  };

  /**
   * Draws to canvas
   * Every frame, clear the canvas, update and draw each boid onto canvas
   */
  const draw = () => {
    const { context, canvas, boidsArr } = canvasConstants;
    context.clearRect(0, 0, canvas.width, canvas.height);
    boidsArr.forEach((boid: Boid) => {
      boid.update(boidsArr, {
        x: canvas.width,
        y: canvas.height,
      });
      boid.draw(context);
    });
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  init();
};

export default boidGenerator;
