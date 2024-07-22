#version 300 es

in vec2 a_position; // {-1,1}x{-1,1}

out vec2 v_coords; // {0,1}x{0,1}

void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4(a_position, 0, 1);

  // Pass the color to the fragment shader.
  v_coords = .5 * a_position + .5;
}
