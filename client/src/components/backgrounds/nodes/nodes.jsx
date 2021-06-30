import React, { useEffect } from "react";
import "particles.js/particles";

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
