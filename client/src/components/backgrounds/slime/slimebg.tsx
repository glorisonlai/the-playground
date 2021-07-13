import React, { useEffect } from "react";
import generator from "./generator";
import { useScreenSize } from "../background";

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
    }, [width, height]);
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
