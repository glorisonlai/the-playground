import React, { useEffect } from "react";
import generator from "./generator";
import useScreenSize from "lib/hooks/screenSizeObserver";

/**
 * Background to simulate line adhesion
 * Inspired by Sebastian Lague's animations
 * TODO: Make fallback background
 * @returns Slime background
 */
const Slime = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();
    useEffect(() => {
      generator(width, height);
      // Disable height checks since IOS has the flippy toolbar messing with width/height
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);
    return (
      <canvas width={width} height={height} id={"boidCanvas"}>
        {/* Fallback message */}
        <h1 style={{ alignContent: "center" }}>
          Sorry!
          <br />
          Canvas not Supported in this Browser!
        </h1>
      </canvas>
    );
  };

  return (
    <div className="bg">
      <Canvas />
    </div>
  );
};

export default Slime;
