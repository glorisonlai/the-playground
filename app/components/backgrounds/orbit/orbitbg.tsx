import React, { useEffect } from "react";
import generator from "./generator";
import useScreenSize from "lib/hooks/screenSizeObserver";
import styles from "styles/background.module.scss";

/**
 * Spinning background
 * Should be slow enough, but seizures beware
 * @returns Orbiting background
 */
const Orbit = () => {
  const Canvas = () => {
    const { width, height } = useScreenSize();

    useEffect(() => {
      const reset = generator(width, height);
      return () => reset();
      // Disable height checks since IOS has the flippy toolbar messing with width/height
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);
    return (
      <canvas width={width} height={height} id="orbitCanvas">
        Sorry, Canvas is not supported in this browser
      </canvas>
    );
  };

  return (
    <div className={styles.bg}>
      <Canvas />
    </div>
  );
};

export default Orbit;
