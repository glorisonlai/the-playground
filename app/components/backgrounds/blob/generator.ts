import vector2d, { vector2dInterface } from "../helper-functions/vector2d";
import {
  BackgroundGenerator,
  CanvasInterface,
} from "../helper-functions/background";

type VectorList = vector2dInterface[];

type BezierPoint = {
  radians: number;
  radius: number;
};

type BezierPair = {
  top: BezierPoint;
  bottom: BezierPoint;
};

interface BlobInterface extends CanvasInterface {
  circlePoints: VectorList;
  bezierPairs: BezierPair[];
}

const blobGenerator: BackgroundGenerator = (width: number, height: number) => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: BlobInterface = {
    canvas: document.getElementById("blobCanvas") as HTMLCanvasElement,
    context: {} as CanvasRenderingContext2D,
    circlePoints: [],
    bezierPairs: [],
    lastDraw: 0,
  };

  const roundEven = (number: number) =>
    Math.floor(number) % 2 ? Math.floor(number) + 1 : Math.floor(number);

  const NUMPOINTS = Math.max(4, Math.floor(Math.min(width, height) / 100));
  const RADIUS = Math.floor(Math.min(width, height) / 3);
  const CENTRE = { x: width / 2, y: height / 2 } as vector2dInterface;

  //Reset canvas, instantiate boids, and start drawing
  const init = () => {
    reset();
    canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    console.log(NUMPOINTS);
    canvasConstants.circlePoints = createCirclePoints(NUMPOINTS);
    canvasConstants.bezierPairs = createBezierPairs(
      canvasConstants.circlePoints
    );
    console.log(canvasConstants.bezierPairs);
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
    return reset;
  };

  const draw = () => {
    const { canvas, context, circlePoints, bezierPairs } = canvasConstants;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    circlePoints.forEach((startV: vector2dInterface, index, arr) => {
      const nextPointV = Object.is(arr.length - 1, index)
        ? arr[0]
        : arr[index + 1];
      const { bottom, top } = bezierPairs[index];

      const start = vector2d.add(CENTRE, startV);
      const nextPoint = vector2d.add(CENTRE, nextPointV);
      const bottomPoint = vector2d.add(
        CENTRE,
        vector2d.extend(
          vector2d.resolveRadiansToUnitVector(bottom.radians),
          bottom.radius
        )
      );
      const topPoint = vector2d.add(
        CENTRE,
        vector2d.extend(
          vector2d.resolveRadiansToUnitVector(top.radians),
          top.radius
        )
      );

      context.lineTo(CENTRE.x, CENTRE.y);
      context.lineTo(start.x, start.y);
      context.bezierCurveTo(
        bottomPoint.x,
        bottomPoint.y,
        topPoint.x,
        topPoint.y,
        nextPoint.x,
        nextPoint.y
      );
      // context.lineTo(nextPoint.x, nextPoint.y);
      context.lineTo(CENTRE.x, CENTRE.y);
    });
    context.fill();
    context.closePath();

    bezierPairs.forEach((point) => {
      const { bottom, top } = point;
      const bottomPoint = vector2d.add(
        CENTRE,
        vector2d.extend(
          vector2d.resolveRadiansToUnitVector(bottom.radians),
          bottom.radius
        )
      );
      const topPoint = vector2d.add(
        CENTRE,
        vector2d.extend(
          vector2d.resolveRadiansToUnitVector(top.radians),
          top.radius
        )
      );
      context.fillStyle = "red";
      context.beginPath();
      context.arc(bottomPoint.x, bottomPoint.y, 5, 0, 2 * Math.PI);
      context.fill();
      context.closePath();

      context.fillStyle = "blue";
      context.beginPath();
      context.arc(topPoint.x, topPoint.y, 5, 0, 2 * Math.PI);
      context.fill();
      context.closePath();

      incrementPoint(point);
    });
    circlePoints.forEach((point) => {
      context.fillStyle = "green";
      context.beginPath();
      context.arc(CENTRE.x + point.x, CENTRE.y + point.y, 5, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    });

    canvasConstants.lastDraw = window.requestAnimationFrame(draw);
  };

  const createCirclePoints = (numpoints: number): VectorList => {
    const portionedRadians = Math.PI / (numpoints / 2);
    return Array.from({ length: numpoints }, (_, index) =>
      vector2d.extend(
        {
          x: Math.cos(index * portionedRadians),
          y: Math.sin(index * portionedRadians),
        } as vector2dInterface,
        RADIUS
      )
    );
  };

  const incrementPoint = (point: BezierPair) => {
    point.top.radius += 0.5 * (Math.random() > 0.5 ? 1 : -1);
    point.bottom.radius += 0.5 * (Math.random() > 0.5 ? 1 : -1);
  };

  const createBezierPairs = (points: VectorList): BezierPair[] => {
    return points.map((point, index, pointsList) => {
      const nextPoint = Object.is(pointsList.length - 1, index)
        ? pointsList[0]
        : pointsList[index + 1];
      const midPoint = vector2d.extend(vector2d.add(point, nextPoint), 0.5);
      const midRadians = vector2d.resolveVectorToRadians(midPoint);
      const upperRad = RADIUS * (1 + Math.random() / 2);
      const lowerRad = RADIUS * (0.2 + Math.random() / 2);
      return {
        top: { radians: midRadians, radius: upperRad },
        bottom: { radians: midRadians, radius: lowerRad },
      } as BezierPair;
    });
  };

  //Cancels current drawing frame, and resets boid array
  const reset = (): void => {
    window.cancelAnimationFrame(canvasConstants.lastDraw);
    canvasConstants.lastDraw = 0;
    canvasConstants.circlePoints = [];
    canvasConstants.bezierPairs = [];
  };

  return init();
};

export default blobGenerator;
