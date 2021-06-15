import React from "react";
import "./content.css";

const Pitch = ({ unlocked, locked }: { unlocked: number; locked: number }) => {
  return (
    <div className="main">
      <h1>The Playground</h1>
      <h3>
        {solved} solved of {total}
      </h3>
    </div>
  );
};

export default Pitch;
