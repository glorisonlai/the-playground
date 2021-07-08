import React, { useEffect } from "react";
import "./orbit.css";
import generator from "./generator";
import { ScreenConstants } from "../background";

/**
 * Spinning background
 * Should be slow enough, but seizures beware
 * @returns Orbiting background
 */
const Orbit = () => {
  const Canvas = () => {
    useEffect(generator, []);
    return (
      <canvas
        width={ScreenConstants.width}
        height={ScreenConstants.height}
        id="orbitCanvas"
      >
        Sorry, Canvas is not supported in this browser
      </canvas>
    );
  };

  return (
    <div className="bg gradient">
      <Canvas />
    </div>
  );
};

export default Orbit;
