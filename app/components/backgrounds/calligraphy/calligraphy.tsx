import React, { useEffect } from "react";
import generator from "./generator";
import { useScreenSize } from "../background";

/**
 * Spinning background
 * Should be slow enough, but seizures beware
 * @returns Orbiting background
 */
const Calligraphy = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();

    useEffect(() => {
      // const reset = generator(width, height);
      // return () => reset();
      // Disable height checks since IOS has the flippy toolbar messing with width/height
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);
    return (
      <canvas width={width} height={height} id="calligraphyCanvas">
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

export default Calligraphy;
