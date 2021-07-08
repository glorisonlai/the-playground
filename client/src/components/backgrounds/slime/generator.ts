import { ScreenConstants } from "../background";
import Agent from "./slime-agent";

interface CanvasConstantsInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasData: ImageData;
  slimeArr: Agent[];
  lastDraw: number;
  blurPixels: number[];
}

/**
 * ** TRASHED ** - Iterating over all pixes takes way to much time synchronously
 * TODO: Find a way to make calculations in parallel
 * Function to iterate over canvas pixels and simulate slime movement
 */
const slimeGenerator = () => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: CanvasConstantsInterface = {
    canvas: document.getElementById("boidCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    canvasData: {} as ImageData,
    slimeArr: [],
    lastDraw: 0,
    blurPixels: [],
  };

  // Number of boids on canvas
  const NUMAGENTS = 1;
  var i = 0;

  //Reset canvas, instantiate boids, and start drawing
  const init = (): void => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.canvasData = canvasConstants.context.getImageData(
      0,
      0,
      canvasConstants.canvas.width,
      canvasConstants.canvas.height
    );
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
  const randNum = (bound: number = 2, floor: boolean = true) =>
    floor ? Math.floor(Math.random() * bound) : Math.random() * bound;

  /**
   * Instantiates boids into array
   * @param numSlime Number of boids to create
   * @returns Array of boids
   */
  const createSlime = (numAgents: number): Agent[] => {
    const slimeArr: Agent[] = [];
    for (let id = 0; id < numAgents; id++) {
      const x = randNum(100);
      const y = randNum(100);
      const direction = randNum(2 * Math.PI, false) - Math.PI; // TODO: Make getting random direction not so inefficent
      console.log(direction);
      slimeArr.push(new Agent(x, y, direction));
    }
    return slimeArr;
  };

  /**
   * Draws to canvas
   * Every frame, clear the canvas, update and draw each boid onto canvas
   */
  const draw = () => {
    const { context, canvasData, canvas } = canvasConstants;
    canvasConstants.slimeArr.forEach((slime) => {
      slime.update({
        x: canvas.width,
        y: canvas.height,
      });
      const canvasIndex = (slime.pos.x + slime.pos.y * canvas.width) * 4;
      canvasData.data[canvasIndex] = 255;
      canvasData.data[canvasIndex + 1] = 255;
      canvasData.data[canvasIndex + 2] = 255;
      canvasData.data[canvasIndex + 3] = 255;
    });

    context.putImageData(canvasData, 0, 0);
    while (i < 20) {
      canvasConstants.lastDraw = window.requestAnimationFrame(draw);
      i++;
    }
  };

  init();
};

export default slimeGenerator;
