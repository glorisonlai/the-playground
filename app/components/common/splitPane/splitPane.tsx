import React, { useState } from "react";
import "styles/splitPane.module.scss";

const SplitPane = ({ children }: { children: JSX.Element[] }) => {
  const [screen, setScreen] = useState(0);
  return (
    <div className="split">
      {screen > 0 && (
        <button
          className="prev"
          onClick={() => setScreen((screen) => screen - 1)}
        >
          &lt;
        </button>
      )}
      {<div className="panel">{children[screen]}</div>}
      {screen < children.length - 1 && (
        <button
          className="next"
          onClick={() => setScreen((screen) => screen + 1)}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default SplitPane;
