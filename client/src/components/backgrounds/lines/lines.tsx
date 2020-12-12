import React, {useState, useEffect} from 'react';
import './lines.css';
import generator from './generator';
// TODO: GET MODERNIZR WORKING
// import Modernizr from 'modernizr';
// import Generator from './generator';

const Lines = () => {
  // const supportsCanvas = () => (
  //   Modernizr.canvas
  // )
  useEffect(() => {
    // if (supportsCanvas) 
    window.addEventListener('resize', handleWindowResize);
    generator.init();
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

const [dimensions, setDimensions] = useState({
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  });

  useEffect(() => {
    generator.init();
  }, [dimensions]);

  
  const handleWindowResize = () => {
    setDimensions({
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    })
  };

  const NoSupport = () => (
    <div className = {"bg"}>
      <h1 style={{alignContent: 'center'}}>Sorry!<br/>Canvas not Supported in this Browser!</h1>
    </div>
  );

  const Canvas = () => (
    <canvas width={dimensions.width} height={dimensions.height} id={"screen"}>
      Your browser does not support HTML5 canvas.
    </canvas> 
  )

  return (
    <div className="bg">
      <Canvas />
    </div>
  )
}

export default Lines;