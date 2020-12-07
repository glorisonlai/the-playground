import React from 'react';

const BgLogo = (logoId) => {
    const selectSvg = (logoId) => {
    return (
      <use xlink:href=`{/assets/img/sprites/${logoId}` />
    )
  }
  return (
      <button class="circle-btn glowy-btn" aria-label="menu">
        <svg class="bg-sprite">
          {selectSvg(logoId)}
        </svg>
      </button>
  )
}