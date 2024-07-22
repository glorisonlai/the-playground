import SlimeAgent from "./slime-agent";
import { createShader, createProgram } from "lib/webgl";
const vertShaderSource = require("raw-loader!./vertex.glsl");
const fragShaderSource = require("raw-loader!./fragment.glsl");
// const fragShaderSource = require("raw-loader!./randTexture.glsl");

interface CanvasConstantsInterface {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  context: CanvasRenderingContext2D;
  slimeArr: SlimeAgent[];
  slimeTextures: [WebGLTexture | null, WebGLTexture | null];
  slimeTextureSize: [number, number];
  lastDraw: number;
  blurPixels: number[];
  program: {
    program: WebGLProgram;
    [key: string]: GLint;
  };
}

const upperPowerOfTwo = (n: number): number => {
  return Math.pow(2, Math.ceil(Math.log(n) * Math.LOG2E));
};

/**
 * TODO: Find a way to make calculations in parallel
 * Function to iterate over canvas pixels and simulate slime movement
 */
const slimeGenerator = (width: number, height: number) => {
  /**
   * Instantiate canvas context
   */
  const canvasConstants: CanvasConstantsInterface = {
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    gl: {} as WebGL2RenderingContext,
    context: {} as CanvasRenderingContext2D,
    slimeArr: [],
    slimeTextures: [null, null],
    slimeTextureSize: [0, 0],
    lastDraw: 0,
    blurPixels: [],
    program: {
      program: null as WebGLProgram,
    },
  };

  // Number of slime agents on canvas
  const NUMAGENTS = 1;
  let i = 0;

  //Reset canvas, instantiate boids, and start drawing
  const init = () => {
    reset();
    canvasConstants.gl = canvasConstants.canvas.getContext("webgl2")!;
    if (!canvasConstants.gl) {
      console.error("WEBGL2  not supported");
    }
    // canvasConstants.context = canvasConstants.canvas.getContext("2d")!;
    canvasConstants.slimeArr = createSlime(NUMAGENTS);
    canvasConstants.lastDraw = window.requestAnimationFrame(draw);

    const vertShader = createShader(
      canvasConstants.gl,
      canvasConstants.gl.VERTEX_SHADER,
      vertShaderSource.default,
    );

    const fragShader = createShader(
      canvasConstants.gl,
      canvasConstants.gl.FRAGMENT_SHADER,
      fragShaderSource.default,
    );

    if (!fragShader || !vertShader) {
      return reset;
    }

    const program = createProgram(canvasConstants.gl, [vertShader, fragShader]);

    if (!program) {
      return reset;
    }
    const { gl } = canvasConstants;

    const positionLocation = gl.getAttribLocation(program, "a_position");
    // Create a buffer to put positions in
    const positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    canvasConstants.program.program = program;
    canvasConstants.program["positionLocation"] = positionLocation;
    canvasConstants.program["positionBuffer"] = positionBuffer;
    canvasConstants.program["u_width"] = gl.getUniformLocation(
      program,
      "u_width",
    );
    canvasConstants.program["u_height"] = gl.getUniformLocation(
      program,
      "u_height",
    );
    canvasConstants.program["u_previous"] = gl.getUniformLocation(
      program,
      "u_previous",
    );
    canvasConstants.program["u_previousCellSize"] = gl.getUniformLocation(
      program,
      "u_previousCellSize",
    );

    const physicalWidth = upperPowerOfTwo(width);
    const physicalHeight = upperPowerOfTwo(height);

    canvasConstants.slimeTextureSize = [physicalWidth, physicalHeight];

    const data = new Uint8Array(4 * physicalWidth * physicalHeight);
    for (let i = data.length - 1; i >= 0; --i) {
      data[i] = Math.floor(256 * Math.random());
    }

    for (let i = 0; i < 2; i++) {
      if (canvasConstants.slimeTextures[i] === null) {
        canvasConstants.slimeTextures[i] = gl.createTexture();
      }

      gl.bindTexture(gl.TEXTURE_2D, canvasConstants.slimeTextures[i]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        physicalWidth,
        physicalHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      console.log("hello", canvasConstants.slimeTextures[i]);
    }

    return reset;
  };

  //Cancels current drawing frame, and resets boid array
  const reset = () => {
    console.log("reset");
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
   * Instantiates slimes into array
   * @param numSlime Number of slimes to create
   * @returns Array of slimes
   */
  const createSlime = (numAgents: number): SlimeAgent[] => {
    const slimeArr = Array.from(
      {
        length: numAgents,
      },
      () => {
        // const x = randNum(100);
        // const y = randNum(100);
        const x = 100;
        const y = 100;
        // const direction = randNum(2 * Math.PI, false) - Math.PI; // TODO: Make getting random direction not so inefficent
        const direction = -Math.PI + 0.2;
        return new SlimeAgent(x, y, direction);
      },
    );
    return slimeArr;
  };

  /**
   * Draws to canvas
   * Every frame, clear the canvas, update and draw each boid onto canvas
   */
  const draw = () => {
    const { gl, program } = canvasConstants;

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program.program);

    // Turn on the position attribute
    gl.enableVertexAttribArray(program.positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, program.positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = true; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      program.positionLocation,
      size,
      type,
      normalize,
      stride,
      offset,
    );

    gl.uniform1i(program.widthLocation, width);
    gl.uniform1i(program.heightLocation, height);

    const physicalWidth = upperPowerOfTwo(width);
    const physicalHeight = upperPowerOfTwo(height);

    canvasConstants.slimeTextureSize = [physicalWidth, physicalHeight];

    console.log(canvasConstants.slimeTextures);
    gl.uniform1iv(program["u_previous"], [1, 1]);

    gl.uniform2fv(
      program["u_previousCellSize"],
      canvasConstants.slimeTextureSize.map((x) => 1 / x),
    );

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  return init();
};

export default slimeGenerator;
