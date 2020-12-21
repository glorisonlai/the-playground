import React from 'react';
require('./bubbles.css');

const Bubbles = () => {
  const randomCss = () => {
    const seed = Math.random();
    return {
    width: `${seed * 50 + 10}px`,
    height: `${seed * 50 + 10}px`,
    left: `${(Math.random() * 105)-5}%`,
    animationDuration: `${seed * 15 + 7}s`,
    animationDelay: `${Math.random() * 30}s`,
  }};

  const bubbleArray = (seed: Number) => {
    if (seed < 0) return null;
    if (seed > 100) return null;
    return Array(seed).fill(0).map((e, i) => <li key={i} style={randomCss()} />);
  }

  return (
    <div className="bg">
      <ul
        id="bubbles"
      >
        {bubbleArray(100)}
      </ul>
    </div>
  );
}

export default Bubbles;