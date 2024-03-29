import { useEffect } from "react";
import useScreenSize from "lib/hooks/screenSizeObserver";
import { BackgroundGenerator } from "./helper-functions/background";
import styles from "styles/background.module.scss";

/**
 * Background to simulate boid flocking behaviour
 * Inspired by Sebastian Lague's animations
 * TODO: Make fallback background
 * @returns Boids background
 */
export const CanvasBackground = (generator: BackgroundGenerator) => () => {
  const { width, height } = useScreenSize();
  useEffect(() => {
    const reset = generator(width, height);
    return () => reset();
    // Disable height checks since IOS has the flippy toolbar messing with width/height
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <canvas width={width} height={height} className={styles.bg} id={"canvas"}>
      {/* Fallback message */}
      <h1 style={{ alignContent: "center" }}>
        Sorry!
        <br />
        Canvas not Supported in this Browser!
      </h1>
    </canvas>
  );
};
