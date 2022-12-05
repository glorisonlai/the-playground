import { useState, useLayoutEffect } from "react";

/**
 * Current screen dimensions, to be accessed by backgrounds if needed
 * Add resizing event listener to rerender backgrounds
 * @returns Current Screen Consants
 */
type screenDimensions = {
  width: number;
  height: number;
};
const useScreenSize = () => {
  const genDimensions = (): screenDimensions => ({
    width: window.innerWidth || window.screen.width,
    height: window.innerHeight || window.screen.height,
  });

  const [screenSize, setScreenSize] = useState<screenDimensions>(
    genDimensions()
  );

  useLayoutEffect(() => {
    const updateSize = () => {
      setScreenSize(genDimensions());
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return screenSize;
};

export default useScreenSize;
