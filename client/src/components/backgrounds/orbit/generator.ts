import { ScreenConstants } from "../background";
import { CanvasInterface } from "../helper-functions/background";

// Properties of an arc
interface Arc {
  radius: number; // How far arc starts from center
  startRadian: number; // Starting radians (+Math.PI to avoid neg numbers)
  strokeWidth: number; // How thin to draw arc
  lengthNoise: number; // Randomly elongate arc
  speedNoise: number; // Randomly speed up arc
}

// Canvas Constants for background
interface OrbitCanvasInterface extends CanvasInterface {
  orbitArr: Arc[];
}

// Weights to modify orbitting behaviour
const orbitConstants = {
  centerX: 300,
  centerY: 40, // Origin point
  orbitSpeed: 0.006, // base rotational speed
  arcLength: 0.2, // angle of arc drawn
  lengthRandomnessWeight: 50, // How similar arc length should be
  speedRandomnessWeight: 200, // How similar arc speed should be
};

const generator = () => {
  // Initialize canvas
  const canvasConstants: OrbitCanvasInterface = {
    canvas: document.getElementById("orbitCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    lastDraw: 0,
    orbitArr: [],
  };

  // How many arcs to draw
  const NUMARCS: number = 300;

  // Reset canvas, initialize context and orbits, start drawing
  const init = () => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.orbitArr = generateArcs(NUMARCS);
    canvasConstants.context.fillStyle = "white";
    canvasConstants.context.strokeStyle = "white";
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  // Cancel previous draws
  const reset = () => {
    window.cancelAnimationFrame(canvasConstants.lastDraw);
    canvasConstants.lastDraw = 0;
    canvasConstants.orbitArr = [];
  };

  /**
   * Create arcs with random starting position, line weight and speed
   * @param numArcs Number of arcs to generate
   * @returns Array of arcs
   */
  const generateArcs = (numArcs: number): Arc[] => {
    const arcArr = [];
    const maxRadius =
      Math.max(ScreenConstants.width, ScreenConstants.height) -
      orbitConstants.centerX -
      5; // arbitrary value to force orbits closer to center
    for (let i = 0; i < numArcs; i++) {
      const radius = Math.random() * maxRadius + 10;
      const startRadian = Math.random() * 2 * Math.PI;
      const strokeWidth = Math.random();
      const lengthNoise = Math.random() / orbitConstants.lengthRandomnessWeight;
      const speedNoise = Math.random() / orbitConstants.speedRandomnessWeight;
      arcArr.push({
        radius,
        startRadian,
        strokeWidth: strokeWidth > 0.5 ? 0.2 : strokeWidth,
        lengthNoise,
        speedNoise,
      } as Arc);
    }
    return arcArr;
  };

  /**
   * Every frame:
   *  Clear canvas
   *  Draw tiny dot in the cneter
   *  Update each arc's start angle, and draw to canvas
   */
  const draw = () => {
    const { context, canvas, orbitArr } = canvasConstants;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillRect(orbitConstants.centerX, orbitConstants.centerY, 3, 2);

    orbitArr.forEach((arc: Arc) => {
      arc.startRadian =
        (arc.startRadian + orbitConstants.orbitSpeed + arc.speedNoise) %
        (2 * Math.PI);
      context.beginPath();
      context.lineWidth = arc.strokeWidth;
      context.arc(
        orbitConstants.centerX,
        orbitConstants.centerY,
        arc.radius,
        arc.startRadian,
        arc.startRadian + orbitConstants.arcLength + arc.lengthNoise
      );
      context.stroke();
      context.closePath();
    });
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  init();
};

export default generator;
