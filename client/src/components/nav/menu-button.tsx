import React from 'react';
import './menu-button.css';
import classNames from 'classnames';

const MenuButton = ({shape, bg, onClick}: {shape: boolean, bg: number, onClick: void}) => {
    // const selectSvg = (logoId: Number) => {
    //   return (
      //   <use xlink:href=`{/assets/img/sprites/${logoId}` />
    //   );
  // }
  const shapeStyle = {'cross': shape};
  const buttonPos = shape ? {'right': true} : {'left': true};

  const buttonClass = classNames('btn', 'flyout', {...buttonPos});
	const menuClass = classNames('glowy', 'menu-btn', {...shapeStyle});
  console.log(menuClass);
  
  return (
    <button className={buttonClass} aria-label="menu" onClick={() => {onClick()}}>
      <div className={menuClass}>
        {/* {!shape && <svg className="bg-sprite">
          {/* {selectSvg(bg)} */}
        {/* </svg>} */}
      </div>
    </button>
  )
};

export default MenuButton;