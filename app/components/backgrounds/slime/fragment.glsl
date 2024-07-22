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
out vec4 fragColor;

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
   uint blah = uint(texture(u_previous, v_coords).x);
   vec4 color = vec4(0.0);
   if (blah > uint(0)) {
      color = vec4(1.0, 1.0, 1.0, 1.0);
   } else {
      color = vec4(0.0, 0.0, 0.0, 1.0);
   }

   fragColor = color;
}

