interface vector2dInterface {
  x: number;
  y: number;
}

interface vector2dMethods {
  create(x: number, y: number): vector2dInterface;
  add(vectors: vector2dInterface[]): vector2dInterface;
  reverse(vector: vector2dInterface): vector2dInterface;
  extend(vector: vector2dInterface, extension: number): vector2dInterface;
  resolveDegreesToUnitVector(degrees: number): vector2dInterface;
  resolveUnitVectorToRadians(vector: vector2dInterface): number;
  resolveRadiansToUnitVector(radians: number): vector2dInterface;
  dotProd(v1: vector2dInterface, v2: vector2dInterface): number;
}

const vector2d: vector2dMethods = {
  create(x, y) {
    return { x, y };
  },

  add(vectors) {
    const vector = this.create(0, 0);
    for (const arg of vectors) {
      vector.x += arg.x;
      vector.y += arg.y;
    }
    return vector;
  },

  reverse(vector) {
    return {
      x: -vector.x,
      y: -vector.y,
    };
  },

  extend(vector, extension) {
    return {
      x: vector.x * extension,
      y: vector.y * extension,
    };
  },

  /**
   * Convert degrees into vectors.
   * Degrees go clockwise as +y does down, -y goes up
   * @param degrees Degrees, clockwise
   * @returns 2D Vector
   */
  resolveDegreesToUnitVector(degrees) {
    const radians = Math.PI / 180;
    const x = Math.cos(radians * degrees);
    const y = Math.sin(radians * degrees);
    return { x, y };
  },

  resolveUnitVectorToRadians(vector) {
    return Math.atan2(vector.y, vector.x);
  },

  resolveRadiansToUnitVector(radians) {
    return { x: Math.cos(radians), y: Math.sin(radians) };
  },

  dotProd(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  },
};

export type { vector2dInterface };

export default vector2d;
