// Interface for backgrounds with no canvas
export interface BackgroundInterface {
  resizeListener: number;
}

// Interface for cavas backgrounds
export interface CanvasInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  lastDraw: number;
}
