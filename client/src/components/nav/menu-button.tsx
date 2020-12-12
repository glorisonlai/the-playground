import React from 'react';
import './menu-button.css';

const MenuButton = ({bg}) => {
    // const selectSvg = (logoId: Number) => {
    //   return (
      //   <use xlink:href=`{/assets/img/sprites/${logoId}` />
    //   );
  // }
  return (
      <button className="circle-btn glowy-btn" aria-label="menu" onClick={() => {console.log('Open menu')}}>
        <svg className="bg-sprite">
          {/* {selectSvg(bg)} */}
        </svg>
      </button>
  )
};

export default MenuButton;