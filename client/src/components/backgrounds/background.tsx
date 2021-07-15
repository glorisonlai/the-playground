import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

// Challenges: 4
// Backgrounds: 5
const BubbleBg = lazy(() => import("./bubbs/bubblesbg")); // DONE
const LinesBg = lazy(() => import("./lines/linesbg")); // DONE
const BoidsBg = lazy(() => import("./boids/boidsbg")); // DONE
const EyesBg = lazy(() => import("./eyes/eyesbg")); // INCOMPLETE
const MountainBg = lazy(() => import("./mountains/mountainsbg")); // INCOMPLETE
const NodesBg = lazy(() => import("./nodes/nodesbg")); // DONE
const SlimeBg = lazy(() => import("./slime/slimebg")); // INCOMPLETE
const OrbitBg = lazy(() => import("./orbit/orbitbg")); // DONE
const MissingBg = lazy(() => import("./missing/missingbg")); // DONE

/**
 * Current available backgrounds. Will be updated!
 * @param bg Background ID
 * @returns Background
 */
const renderBg = (bg: number): JSX.Element => {
  switch (bg) {
    case 0:
      return <BoidsBg />;
    case 1:
      return <LinesBg />;
    case 2:
      return <OrbitBg />;
    case 3:
      return <BoidsBg />;
    default:
      return <MissingBg />;
  }
};

/**
 * Suspended background. Not sure if worth it
 * @param bg Background ID
 * @returns Background
 */
const Background = ({
  bg,
  bgCallback,
}: {
  bg: number;
  bgCallback: (loaded: boolean) => void;
}) => {
  // Load background, call Callback function, then render
  const BackgroundLoader = () => {
    const background = renderBg(bg);
    bgCallback(true);
    return background;
  };

  return (
    <Suspense fallback={<div className="bg" />}>{BackgroundLoader()}</Suspense>
  );
};

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

export { useScreenSize };

export default Background;
