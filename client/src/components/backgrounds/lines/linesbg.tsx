import React, { useEffect } from "react";
import generator from "./generator";
import { useScreenSize } from "../background";

/**
 * Animates drawing lines based on sine waves
 * TODO: Implement fallback background if Canvas/JS not supported
 * @returns Lines background
 */
const Lines = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();

    useEffect(() => generator(width, height), [width, height]);

    return (
      <canvas width={width} height={height} id={"canvas"}>
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

export default Lines;
