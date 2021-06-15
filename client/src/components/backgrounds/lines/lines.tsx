import React, { useEffect } from "react";
import "./lines.css";
import generator from "./generator";
import { ScreenConstants } from "../background";
// TODO: GET MODERNIZR WORKING
// import Modernizr from 'modernizr';
// import Generator from './generator';

const Lines = () => {
  // const supportsCanvas = () => (
  //   Modernizr.canvas
  // )
  useEffect(() => {
    // if (supportsCanvas)
    const redrawLines = () => {
      // generator.init;
      // console.time("Drawing");
      // window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", redrawLines);
    redrawLines();
    return () => window.removeEventListener("resize", redrawLines);
  }, []);

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

export default Lines;
