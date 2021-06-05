import React from "react";

const Pitch = () => {
  const noUnlockedBGs = () => {
    return [1, 1];
  };

  const [solved, total] = noUnlockedBGs();
  return (
    <div className={"heading"}>
      <h1>The Playground</h1>
      <h3>
        {solved} solved of {total}
      </h3>
    </div>
  );
};

export default Pitch;
