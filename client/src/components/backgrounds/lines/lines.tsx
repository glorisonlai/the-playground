import React, {useState, useEffect} from 'react';
import './lines.css';
import generateLines from './generator';
// TODO: GET MODERNIZR WORKING
// import Modernizr from 'modernizr';
// import Generator from './generator';

const Lines = () => {
    // const supportsCanvas = () => (
  //   Modernizr.canvas
  // )
  useEffect(() => {
    // if (supportsCanvas) 
    const handleWindowResize = () => {
      setDimensions(getScreenDimensions());
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const getScreenDimensions = () => ({
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    });

  const [dimensions, setDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    generateLines();
  }, [dimensions]);

  const Canvas = () => (
    <canvas width={dimensions.width} height={dimensions.height} id={"screen"}>
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