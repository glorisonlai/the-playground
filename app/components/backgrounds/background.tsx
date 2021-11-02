import React, { lazy, Suspense } from "react";
import "styles/background.module.scss";

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
const SnowflakeBg = lazy(() => import("./snowflakes/snowflakebg")); // INCOMPLETE
const BlobBg = lazy(() => import("./blob/blobbg")); // INCOMPLETE
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
      return <BoidsBg />;
    case 3:
      return <OrbitBg />;
    case 4:
      return <BubbleBg />;
    default:
      return <MissingBg />;
  }
};

/**
 * Suspended background. Not sure if worth it
 * @param bg Background ID
 * @returns Background
 */
const Background = ({ bg }: { bg: number }) => {
  // Load background, call Callback function, then render
  const BackgroundLoader = () => {
    const background = renderBg(bg);
    return background;
  };

  return (
    <Suspense fallback={<div className="bg" />}>{BackgroundLoader()}</Suspense>
  );
};

export default Background;
