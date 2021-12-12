import React, { useState } from "react";
import styles from "styles/splitPane.module.scss";

const SplitPane = ({ children }: { children: JSX.Element[] }) => {
  const [screen, setScreen] = useState(0);
  return (
    <div className={styles.split}>
      {screen > 0 && (
        <button
          className={`${styles.splitBtn}`}
          onClick={() => setScreen((screen) => screen - 1)}
        >
          &lt;
        </button>
      )}
      {<div className={styles.panel}>{children[screen]}</div>}
      {screen < children.length - 1 && (
        <button
          className={`${styles.splitBtn}`}
          onClick={() => setScreen((screen) => screen + 1)}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default SplitPane;
