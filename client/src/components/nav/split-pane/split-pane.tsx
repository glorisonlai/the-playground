import React from "react";
import "./split-pane.css";

const SplitPane = ({ children }) => {
  console.log(children);
  return (
    <div className="split">
      {children.map((element) => {
        return <div className="panel">{element}</div>;
      })}
    </div>
  );
};

export default SplitPane;
