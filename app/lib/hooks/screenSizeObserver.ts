import { useState, useLayoutEffect } from "react";

/**
 * Current screen dimensions, to be accessed by backgrounds if needed
 * Add resizing event listener to rerender backgrounds
 * @returns Current Screen Consants
 */
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width:
      window.innerWidth ||
      window.screen.width ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      window.screen.height ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  });
  useLayoutEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width:
          window.innerWidth ||
          window.screen.width ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          window.screen.height ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
      });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return screenSize;
};

export default useScreenSize;
