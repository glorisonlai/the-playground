// Interface for backgrounds with no canvas
export interface BackgroundInterface {
  resizeListener: number;
}

// Interface for cavas backgrounds
export interface CanvasInterface extends BackgroundInterface {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}
