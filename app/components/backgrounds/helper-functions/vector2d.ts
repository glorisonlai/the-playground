interface vector2dInterface {
  x: number;
  y: number;
}

interface vector2dMethods {
  create(x: number, y: number): vector2dInterface;
  add(
    vector1: vector2dInterface,
    vector2: vector2dInterface
  ): vector2dInterface;
  accum(vector1: vector2dInterface, vectors: vector2dInterface[]): void;
  reverse(vector: vector2dInterface): vector2dInterface;
  normalize(vector: vector2dInterface): vector2dInterface;
  extend(vector: vector2dInterface, extension: number): vector2dInterface;
  resolveDegreesToUnitVector(degrees: number): vector2dInterface;
  resolveVectorToRadians(vector: vector2dInterface): number;
  resolveRadiansToUnitVector(radians: number): vector2dInterface;
  dotProd(v1: vector2dInterface, v2: vector2dInterface): number;
}

// Helper functions to work with 2d vectors
const vector2d: vector2dMethods = {
  /**
   * Creates new vector off of coordinates
   * @param x x component
   * @param y y component
   * @returns Vector
   */
  create(x, y) {
    return { x, y };
  },

  /**
   * Adds 2 vectors together
   * @param vectors Array of vectors
   * @returns Sum of vectors
   */
  add(vector1, vector2) {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y,
    };
  },

  /**
   * Appends values of vectors array to accumulated vector
   * @param vector1 Accumulated vector
   * @param vectors Array of vectors
   */
  accum(vector1, vectors) {
    for (const vector of vectors) {
      vector1.x += vector.x;
      vector1.y += vector.y;
    }
  },

  /**
   * Returns unit vector in the same direction
   * @param vector
   * @returns
   */
  normalize(vector) {
    const mag = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    return { x: vector.x / mag, y: vector.y / mag };
  },

  /**
   * Creates new vector pointing away from vector
   * @param vector Vector
   * @returns Flipped vector
   */
  reverse(vector) {
    return {
      x: -vector.x,
      y: -vector.y,
    };
  },

  /**
   * Multiply vector by magnitude
   * @param vector Vector
   * @param extension Magnitude
   * @returns Extended vector
   */
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

  /**
   * Convert vector into radians
   * @param vector Vector
   * @returns Radians
   */
  resolveVectorToRadians(vector) {
    return Math.atan2(vector.y, vector.x);
  },

  /**
   * Convert radians into unit vector
   * @param radians Radians
   * @returns Unit vector
   */
  resolveRadiansToUnitVector(radians) {
    return { x: Math.cos(radians), y: Math.sin(radians) };
  },

  /**
   * Calculates projection of v1 onto v2
   * @param v1 Vector
   * @param v2 Vector
   * @returns Dot product of v1 and v2
   */
  dotProd(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  },
};

export type { vector2dInterface };

export default vector2d;
