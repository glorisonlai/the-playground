import React from "react";
import Particles from "react-particles-js";

/**
 * Uses particles.js script to create THE developer background
 * TODO: Write own generator
 * @returns Nodes background
 */
const Nodes = () => {
  // useEffect(() => {
  //   const particlesJS = window.particlesJS;
  //   particlesJS.load("particles-js", "./particles.json", () => {
  //     console.log("callback-particles.js config loaded");
  //   });
  // }, []);
  return (
    <div className="bg">
      <Particles />
    </div>
  );
};

export default Nodes;
