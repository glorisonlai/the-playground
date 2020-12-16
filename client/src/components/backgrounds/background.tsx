import React, {lazy, Suspense} from 'react';

const Background = ({ bg }: {bg: number}) => {
  const BubbleBg = lazy(() => import('./bubbs/bubbles'));
  const LinesBg = lazy(() => import('./lines/lines'));
  
  const bgs = {
    0: <BubbleBg />,
    1: <LinesBg />,
  }

  return (
    <Suspense fallback={<div className="bg"></div>}>
      { bgs[bg] }
    </Suspense>
  )
}

export default Background;