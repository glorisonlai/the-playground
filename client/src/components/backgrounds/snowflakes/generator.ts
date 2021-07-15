// Properties of a snowflake
interface Snowflake {
  connective_points: number;
  radius: number;
  branch: string[];
  path: string[];
}

// Weights to modify orbitting behaviour
const snowflakeConstants = {
  SIDES: 4,
  MAX_POINTS: 8,
  MAX_SIZE: 10,
};

const generator = (width: number, height: number) => {
  // How many snowflakes to draw
  const NUMFLAKES: number = 300;

  /**
   * Create snowflakes
   * Creates random starting position, point distribution as branch
   * Mirrors branch, and transforms each branch SIDES times to create revolution
   * @param numFlakes number of snowflakes to create
   * @returns Array of snowflake svg's
   */
  // const generateSnowflakes = (numFlakes: number): Snowflake[] => {
  //   const snowflakeArr = Array.from(
  //     {
  //       length: numFlakes,
  //     },
  //     () => {
  //       const radius = Math.random() * snowflakeConstants.MAX_SIZE + 10;

  //       return {
  //         connective_points,
  //         radius,
  //         branch,
  //         path,
  //       } as Snowflake;
  //     }
  //   );
  //   return snowflakeArr;
  // };

  // return generateSnowflakes(NUMFLAKES);
};

export default generator;
