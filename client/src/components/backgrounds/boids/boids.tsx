import React, { useEffect } from "react";
import "./boids.css";
import generator from "./generator";
import { ScreenConstants } from "../background";

const Boids = () => {
  useEffect(() => {
    generator();
  }, []);
  const Canvas = () => (
    <canvas
      width={ScreenConstants.width}
      height={ScreenConstants.height}
      id={"boidCanvas"}
    >
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

export default Boids;
