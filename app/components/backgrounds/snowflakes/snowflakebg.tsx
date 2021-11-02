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
    // Disable height checks since IOS has the flippy toolbar messing with width/height
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => generator(width, height), [width]);
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
