import React, {lazy, Suspense} from 'react';

const BubbleBg = lazy(() => import('./bubbs/bubbles'));
const LinesBg = lazy(() => import('./lines/lines'));

const Backgrounds = [
  <BubbleBg />,
  <LinesBg />
];

const Background = ({ bg }: {bg: number}) => {
  return (
    <Suspense fallback={<div className="bg"></div>}>
      { Backgrounds[bg] }
    </Suspense>
  )
}

export default Background;