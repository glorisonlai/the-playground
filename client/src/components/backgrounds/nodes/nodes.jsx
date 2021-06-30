import React, { useEffect } from "react";
import "particles.js/particles";

/**
 * Uses particles.js script to create THE developer background
 * TODO: Write own generator
 * @returns Nodes background
 */
const Nodes = () => {
  useEffect(() => {
    const particlesJS = window.particlesJS;
    particlesJS.load("particles-js", "./particles.json", () => {
      console.log("callback-particles.js config loaded");
    });
  }, []);
  return <div id="particles-js" />;
};

export default Nodes;
