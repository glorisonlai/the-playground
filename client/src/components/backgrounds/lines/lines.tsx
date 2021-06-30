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
  useEffect(generator, []);

  const Canvas = () => (
    <canvas
      width={ScreenConstants.width}
      height={ScreenConstants.height}
      id={"canvas"}
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

export default Lines;
