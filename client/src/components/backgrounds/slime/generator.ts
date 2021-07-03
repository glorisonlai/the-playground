import { ScreenConstants } from "../background";
import Agent from "./slime-agent";

interface CanvasConstantsInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  slimeArr: Agent[];
  lastDraw: number;
}

/**
 * Function to start drawing boids onto canvas
 */
const slimeGenerator = () => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: CanvasConstantsInterface = {
    canvas: document.getElementById("boidCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    slimeArr: [],
    lastDraw: 0,
  };

  // Number of boids on canvas
  const NUMAGENTS = 20;

  //Reset canvas, instantiate boids, and start drawing
  const init = (): void => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.slimeArr = createSlime(NUMAGENTS);
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  //Cancels current drawing frame, and resets boid array
  const reset = () => {
    window.cancelAnimationFrame(canvasConstants.lastDraw);
    canvasConstants.lastDraw = 0;
    canvasConstants.slimeArr = [];
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
   * @param numSlime Number of boids to create
   * @returns Array of boids
   */
  const createSlime = (numAgents: number): Agent[] => {
    const boidsArr = [];
    for (let id = 0; id < numAgents; id++) {
      const x = randNum()
        ? randNum(ScreenConstants.width)
        : randNum()
        ? 0
        : ScreenConstants.width;
      const y =
        x === 0 || x === ScreenConstants.width
          ? randNum(ScreenConstants.height)
          : randNum()
          ? 0
          : ScreenConstants.height;
      const vx =
        x >= (ScreenConstants.width * 4) / 7
          ? -1
          : x <= (ScreenConstants.width * 3) / 7
          ? 1
          : 0;
      const vy =
        y >= (ScreenConstants.height * 4) / 7
          ? -1
          : x <= (ScreenConstants.height * 3) / 7
          ? 1
          : 0;
      boidsArr.push(new Agent(x, y, vx, vy));
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
    canvasConstants.slimeArr.forEach((slime) => {
      // slime.update(canvasConstants.slimeArr, {
      //   x: canvasConstants.canvas.width,
      //   y: canvasConstants.canvas.height,
      // });
      slime.draw(ctx);
    });
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  init();
};

export default slimeGenerator;
