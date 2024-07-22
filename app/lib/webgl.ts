export const createShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string,
): WebGLProgram | null => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const createProgram = (
  gl: WebGLRenderingContext,
  shaders: WebGLShader[],
) => {
  var program = gl.createProgram();

  if (!program) {
    return null;
  }

  for (const shader of shaders) {
    gl.attachShader(program, shader);
  }

  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
};
