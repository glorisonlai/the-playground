import React from "react";
import "./boids.css";
import generator from "./generator";
import { ScreenConstants } from "../background";

const Boids = () => {
  const Canvas = () => (
    <canvas
      width={ScreenConstants.width}
      height={ScreenConstants.height}
      id={"screen"}
    >
      <div className={"bg"}>
        <h1 style={{ alignContent: "center" }}>
          Sorry!
          <br />
          Canvas not Supported in this Browser!
        </h1>
      </div>
    </canvas>
  );

  return (
    <div className="bg">
      <Canvas />
    </div>
  );
};

export default Boids;
