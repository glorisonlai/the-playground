import React, {useEffect} from 'react';
import './lines.css';
import {screenConstants, init, draw} from './generator';
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
      init(screenConstants);
      console.log(screenConstants.width)
      console.time('Drawing');
      window.requestAnimationFrame(draw);
    };

    window.addEventListener('resize', redrawLines);
    redrawLines();
    return () => window.removeEventListener('resize', redrawLines);
  }, []);

  const Canvas = () => (
    <canvas width={screenConstants.width} height={screenConstants.height} id={"screen"}>
      <div className = {"bg"}>
        <h1 style={{alignContent: 'center'}}>
          Sorry!<br/>Canvas not Supported in this Browser!
        </h1>
      </div>
    </canvas> 
  )

  return (
    <div className="bg">
      <Canvas />
    </div>
  )
}

export default Lines;