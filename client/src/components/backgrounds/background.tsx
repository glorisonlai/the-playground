import React, {lazy, ReactComponentElement, ReactFragment, Suspense} from 'react';

const Background = ({ bg }: {bg: number}) => {
  const BubbleBg = lazy(() => import('./bubbs/bubbles'));
  const LinesBg = lazy(() => import('./lines/lines'));
  
  const bgs = [ 
    <BubbleBg />,
    <LinesBg />,
  ];

  return (
    <Suspense fallback={<div className="bg"></div>}>
      { bgs[bg] as JSX.Element}
    </Suspense>
  )
}

export default Background;