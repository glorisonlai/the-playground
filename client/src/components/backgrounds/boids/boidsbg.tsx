import React, { useEffect } from "react";
import generator from "./generator";
import { useScreenSize } from "../background";

/**
 * Background to simulate boid flocking behaviour
 * Inspired by Sebastian Lague's animations
 * TODO: Make fallback background
 * @returns Boids background
 */
const Boids = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();
    useEffect(() => {
      const reset = generator(width, height);
      return () => reset();
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

export default Boids;
