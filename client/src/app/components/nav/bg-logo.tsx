import React from 'react';

const BgLogo = (logoId: Number) => {
    const selectSvg = (logoId: Number) => {
    return (
    //   <use xlink:href=`{/assets/img/sprites/${logoId}` />
        <button onClick={() => {console.log('Open menu')}}/>
    )
  }
  return (
      <button className="circle-btn glowy-btn" aria-label="menu">
        <svg className="bg-sprite">
          {selectSvg(logoId)}
        </svg>
      </button>
  )
}

export default BgLogo;