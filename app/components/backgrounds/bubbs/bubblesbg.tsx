import React from "react";
import bubbleStyle from "styles/bubbles.module.scss";
import styles from "styles/background.module.scss";
import { BackgroundGenerator } from "../helper-functions/background";

/**
 * Floating bubbles animation
 * @returns Bubbles background
 */
const Bubbles = () => {
  /**
   * Assigns random position and size to bubble
   * Animation time scales with bubble size
   * @returns CSS styling for individual bubble
   */
  const randomCss = (seed: number = Math.random()) => {
    return {
      width: `${seed * 50 + 10}px`,
      height: `${seed * 50 + 10}px`,
      left: `${Math.random() * 105 - 5}%`,
      animationDuration: `${seed * 15 + 7}s`,
      animationDelay: `${Math.random() * 30}s`,
    };
  };

  /**
   * Creates array of bubbles with random CSS
   * @param bubbles How many bubbles to render
   * @returns array of list elements with bubble CSS
   */
  const bubbleArray = (bubbles: number) => {
    if (bubbles < 0 || bubbles > 10) return null;
    return Array(bubbles)
      .fill(0)
      .map((_, i) => <li key={i} style={randomCss()} />);
  };
  return (
    <div className={styles.bg}>
      <ul id="bubbles">{bubbleArray(100)}</ul>
    </div>
  );
};

export default Bubbles;
