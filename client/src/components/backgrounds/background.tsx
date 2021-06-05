import React, { lazy, Suspense } from "react";

const BubbleBg = lazy(() => import("./bubbs/bubbles"));
const LinesBg = lazy(() => import("./lines/lines"));
const BirdsBg = lazy(() => import("./boids/boids"));
const EyesBg = lazy(() => import("./eyes/eyes"));

const Backgrounds = [<BubbleBg />, <LinesBg />, <BirdsBg />, <EyesBg />];

const Background = ({ bg }: { bg: number }) => {
  return (
    <Suspense fallback={<div className="bg"></div>}>{Backgrounds[bg]}</Suspense>
  );
};

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
