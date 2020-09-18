import React from 'react';
import Headroom from 'react-headroom';

const NavBar = () => {
  const selectSvg = () => {
    return (
      <use xlink:href=`/assets/img/sprites/${logoId}` />
    )
  }
  return (
    <Headroom>
      <button class="circle-btn glowy-btn" aria-label="menu">
        <svg class="bg-sprite">
          {selectSvg()}
        </svg>
      </button>
    </Headroom>
  )
}