import { CanvasInterface } from "../helper-functions/background";
/**
 * Generative lines bg
 * Based off of: https://codepen.io/tjoen/pen/iCgfj
 * Blog: http://rectangleworld.com/blog/archives/462
 */
interface CircleConstants {
  numCircles: number;
  maxMaxRad: number;
  minMaxRad: number;
  minRadFactor: number;
  iterations: number;
  numPoints: number;
  drawsPerFrame: number;
  fullTurn: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  twistAmount: number;
  stepsPerSegment: number;
  lineAlpha: number;
  lineWidth: number;
  xSqueeze: number;
  drawingQueue: Array<number>;
}

interface ScreenConstantsInterface extends CanvasInterface {
  height: number;
  width: number;
  constants: CircleConstants;
  circles: Array<Circle>;
  colors: Array<string>;
  lineNumber: number;
}

interface Coord {
  first: Coord;
  x: number;
  y: number;
  next: Coord;
}

interface Circle {
  centerX: number;
  centerY: number;
  maxRad: number;
  minRad: number;
  phase: number;
  pointArray: Array<number>;
}

/**
 * Based off of stacking noisy circles and drawing smooth lines between each circle center
 */
const generateLines = (width: number, height: number) => {
  const screenConstants: ScreenConstantsInterface = {
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    height: height,
    width: width,
    context: {} as CanvasRenderingContext2D,
    constants: {} as CircleConstants,
    circles: [],
    colors: [],
    lineNumber: 0,
    lastDraw: 0,
  };

  const init = () => {
    screenConstants.context = screenConstants.canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    resetCanvas();
    screenConstants.constants = initConstants();
    screenConstants.circles = setCircles(screenConstants.constants);
    screenConstants.colors = setColors(screenConstants.constants);
    draw();
    return resetCanvas;
  };

  const initConstants = (): CircleConstants => {
    const constants = {} as CircleConstants;
    constants.numCircles = Math.floor(8 + Math.random() * 7);
    constants.maxMaxRad = 8;
    constants.minMaxRad = 5;
    constants.minRadFactor = 0.9;
    constants.iterations = 11;
    constants.numPoints = Math.pow(2, constants.iterations) + 1;
    constants.drawsPerFrame = 6;
    constants.fullTurn =
      (Math.PI * 2 * constants.numPoints) / (5 + constants.numPoints);
    constants.minX = -constants.maxMaxRad;
    constants.maxX = screenConstants.width + constants.maxMaxRad;
    constants.minY = screenConstants.height / 2 - 100;
    constants.maxY = (screenConstants.height * 7) / 8;
    constants.twistAmount = 1.3 * Math.PI;
    constants.stepsPerSegment = Math.floor(600 / constants.numCircles);
    constants.lineAlpha = 0.01;
    constants.lineWidth = 2.5;
    constants.xSqueeze = 1;

    return constants;
  };

  const resetCanvas = (): void => {
    window.cancelAnimationFrame(screenConstants.lastDraw);
    screenConstants.lastDraw = 0;
    screenConstants.lineNumber = 0;
    screenConstants.context.setTransform(1, 0, 0, 1, 0, 0);
    screenConstants.context.clearRect(
      0,
      0,
      screenConstants.width,
      screenConstants.height
    );
  };

  const setLinePoints = (iterations: number) => {
    const pointList = {} as Coord;
    const pointArray = [] as number[];
    pointList.first = { x: 0, y: 1 } as Coord;
    const lastPoint = { x: 1, y: 1 } as Coord;
    let minY: number = 1;
    let maxY: number = 1;

    pointList.first.next = lastPoint as Coord;

    for (let i = 0; i < iterations; i++) {
      let point = pointList.first as Coord;
      while (point.next != null) {
        const nextPoint: Coord = point.next;

        const dx: number = nextPoint.x - point.x;
        const newX: number = 0.5 * (point.x + nextPoint.x);
        const newY: number =
          0.5 * (point.y + nextPoint.y) + dx * (Math.random() * 2 - 1);

        const newPoint = { x: newX, y: newY } as Coord;

        if (newY < 1) minY = newY;
        if (newY > 1) maxY = newY;

        newPoint.next = nextPoint as Coord;
        point.next = newPoint as Coord;

        point = nextPoint as Coord;
      }
    }

    //normalize to values between 0 and 1
    //Also store y values in array here.
    const normalizeRate: number = maxY === minY ? 0 : 1 / (maxY - minY);

    let point: Coord = pointList.first;
    while (point != null) {
      point.y = normalizeRate > 0 ? normalizeRate * (point.y - minY) : 1;
      pointArray.push(point.y);
      point = point.next;
    }

    return pointArray;
  };

  const setCircles = (constants: CircleConstants) => {
    let circle_index = 0;
    const circles = Array.from({ length: constants.numCircles }, () => {
      const maxR =
        constants.minMaxRad +
        Math.random() * (constants.maxMaxRad - constants.minMaxRad);
      const minR = constants.minRadFactor * maxR;

      const newCircle: Circle = {
        centerX:
          constants.minX +
          (circle_index * constants.maxX - constants.minX) /
            (constants.numCircles - 1),
        centerY:
          constants.minY +
          Math.floor(Math.random() * constants.maxX - constants.minX) /
            (constants.numCircles - 1),
        maxRad: maxR,
        minRad: minR,
        phase:
          (circle_index / (constants.numCircles - 1)) * constants.twistAmount,
        pointArray: setLinePoints(constants.iterations),
      };
      circle_index++;
      return newCircle;
    });
    return circles;
  };

  const setColors = ({ lineAlpha, iterations }: CircleConstants) => {
    const colorParamArray = setLinePoints(iterations);
    const colors = colorParamArray.map((weight) => {
      const shade = Math.random() * 50 + weight;
      return `rgba(${shade},${shade},${shade},${lineAlpha})`;
    });

    return colors;
  };

  const draw = () => {
    const { context, constants, circles, colors } = screenConstants;
    const {
      numCircles,
      drawsPerFrame,
      numPoints,
      fullTurn,
      lineWidth,
      stepsPerSegment,
      xSqueeze,
    } = constants;

    for (let k = 0; k < drawsPerFrame; k++) {
      const lineNumber = screenConstants.lineNumber;
      const theta: number = (lineNumber / (numPoints - 1)) * fullTurn;
      context.globalCompositeOperation = "lighter";
      context.lineJoin = "miter";

      context.strokeStyle = colors[lineNumber];
      context.lineWidth = lineWidth;
      context.beginPath();

      //move to first point
      const centerX = circles[0].centerX;
      const centerY = circles[0].centerY;
      const rad =
        circles[0].minRad +
        circles[0].pointArray[lineNumber] *
          (circles[0].maxRad - circles[0].minRad);
      const phase = circles[0].phase;
      const x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
      const y0 = centerY + rad * Math.sin(theta + phase);
      context.moveTo(x0, y0);

      for (let i = 0; i < numCircles - 1; i++) {
        //draw between i and i+1 circle
        const rad0 =
          circles[i].minRad +
          circles[i].pointArray[lineNumber] *
            (circles[i].maxRad - circles[i].minRad);
        const rad1 =
          circles[i + 1].minRad +
          circles[i + 1].pointArray[lineNumber] *
            (circles[i + 1].maxRad - circles[i + 1].minRad);
        const phase0 = circles[i].phase;
        const phase1 = circles[i + 1].phase;

        for (let j = 0; j < stepsPerSegment; j++) {
          const linParam = j / (stepsPerSegment - 1);
          const cosParam = 0.5 - 0.5 * Math.cos(linParam * Math.PI);

          //interpolate center
          const centerX =
            circles[i].centerX +
            linParam * (circles[i + 1].centerX - circles[i].centerX);
          const centerY =
            circles[i].centerY +
            cosParam * (circles[i + 1].centerY - circles[i].centerY);

          //interpolate radius
          const rad = rad0 + cosParam * (rad1 - rad0);

          //interpolate phase
          const phase = phase0 + cosParam * (phase1 - phase0);

          const x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
          const y0 = centerY + rad * Math.sin(theta + phase);

          context.lineTo(x0, y0);
        }
      }

      context.stroke();

      screenConstants.lineNumber++;
    }

    if (screenConstants.lineNumber < numPoints) {
      screenConstants.lastDraw = window.requestAnimationFrame(draw);
    }
  };

  return init();
};

export default generateLines;
