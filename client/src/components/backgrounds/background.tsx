import React, { lazy, Suspense } from "react";

const BubbleBg = lazy(() => import("./bubbs/bubbles"));
const LinesBg = lazy(() => import("./lines/lines"));
const BoidsBg = lazy(() => import("./boids/boids"));
const EyesBg = lazy(() => import("./eyes/eyes"));
const MountainBg = lazy(() => import("./mountains/mountains"));
const MissingBg = lazy(() => import("./missing/missing"));
const NodesBg = lazy(() => import("./nodes/nodes"));

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
 * Adds resizing event listener to rerender backgrounds
 * @returns Current Screen Consants
 */
const ScreenConstants = {
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
};

export { ScreenConstants };

export default Background;
