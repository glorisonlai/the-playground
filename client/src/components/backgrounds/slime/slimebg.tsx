import React, { useEffect } from "react";
import generator from "./generator";
import { ScreenConstants } from "../background";

/**
 * Background to simulate line adhesion
 * Inspired by Sebastian Lague's animations
 * TODO: Make fallback background
 * @returns Slime background
 */
const Slime = () => {
  useEffect(() => {
    generator();
  }, []);

  const Canvas = () => (
    <canvas
      width={ScreenConstants.width}
      height={ScreenConstants.height}
      id={"boidCanvas"}
    >
      {/* Fallback message */}
      <h1 style={{ alignContent: "center" }}>
        Sorry!
        <br />
        Canvas not Supported in this Browser!
      </h1>
    </canvas>
  );

  return (
    <div className="bg">
      <Canvas />
    </div>
  );
};

export default Slime;
