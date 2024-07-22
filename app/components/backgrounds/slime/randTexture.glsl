#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
   precision highp float;
#else
   precision mediump float;
#endif


uniform uint u_width;
uniform uint u_height;
uniform sampler2D u_previous;
uniform vec2 u_physicalCellSize;

in vec2 v_coords;
out float fragColor;

// Hash function www.cs.ubc.ca/~rbridson/docs/schechter-sca08-turbulence.pdf
uint hash(uint state)
{
    state ^= 2747636419u;
    state *= 2654435769u;
    state ^= state >> 16;
    state *= 2654435769u;
    state ^= state >> 16;
    state *= 2654435769u;
    return state;
}

void main() {
  uint posX = uint(v_coords.x * float(u_width));
  uint posY = uint(v_coords.y * float(u_height));

  if (posX < uint(0) || posX >= u_width || posY < uint(0) || posY >= u_height) {
    return;
  }

  uint pixelIndex = posY * u_width + posX;
  uint random = hash(uint(100));

  fragColor = texture2D(random, v_coords);
}
