import React, { useEffect } from "react";
import useScreenSize from "lib/hooks/screenSizeObserver";
import generator from "./generator";
import styles from "styles/background.module.scss";

const Blob = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();
    useEffect(() => {
      const reset = generator(width, height);
      return () => reset();
      // Disable height checks since IOS has the flippy toolbar messing with width/height
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);
    return (
      <canvas width={width} height={height} id={"blobCanvas"}>
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
    <div className={styles.bg}>
      <Canvas />
    </div>
  );
};

export default Blob;
