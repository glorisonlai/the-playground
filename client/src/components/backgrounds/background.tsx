import React, { lazy, Suspense, useEffect } from "react";

const BubbleBg = lazy(() => import("./bubbs/bubbles"));
const LinesBg = lazy(() => import("./lines/lines"));
const BirdsBg = lazy(() => import("./boids/boids"));
const EyesBg = lazy(() => import("./eyes/eyes"));
const MissingBg = lazy(() => import("./missing/missing"));

/**
 * Current available backgrounds. Will be updated!
 * @param bg Background ID
 * @returns Background
 */
const renderBg = (bg: number): JSX.Element => {
  switch (bg) {
    case 0:
      return <BubbleBg />;
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
  bgCallback: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const background = renderBg(bg);
  bgCallback(true);
  return (
    <Suspense fallback={<div className="bg"></div>}>{background}</Suspense>
  );
};

// Current screen dimensions, to be accessed by backgrounds if needed
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
