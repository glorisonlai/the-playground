import React, {lazy, Suspense} from 'react';

const BubbleBg = lazy(() => import('./bubbs/bubbles'));
const LinesBg = lazy(() => import('./lines/lines'));
// const BirdsBg = lazy(() )
const CreepyBg = lazy(() => import('./creep/creep'));

const Backgrounds = [
  <BubbleBg />,
  <LinesBg />,
  // <BirdsBg />,
  <CreepyBg />
];

const Background = ({ bg }: {bg: number}) => {
  return (
    <Suspense fallback={<div className="bg"></div>}>
      { Backgrounds[bg] }
    </Suspense>
  )
}

export default Background;