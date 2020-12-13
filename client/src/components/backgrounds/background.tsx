import React, {lazy, Suspense} from 'react';
import Bubbles from './bubbs/bubbles';
import Lines from './lines/lines';

const Background = ({bg}) => {
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