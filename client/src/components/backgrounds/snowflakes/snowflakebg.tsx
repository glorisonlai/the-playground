import React, { useEffect } from "react";
import generator from "./generator";
import { useScreenSize } from "../background";

/**
 * Fading snowflakes
 * @returns Snowflake background
 */
const Orbit = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();

    useEffect(() => generator(width, height), [width, height]);
    return (
      <canvas width={width} height={height} id="orbitCanvas">
        Sorry, Canvas is not supported in this browser
      </canvas>
    );
  };

  return (
    <div className="bg">
      <Canvas />
    </div>
  );
};

export default Orbit;
