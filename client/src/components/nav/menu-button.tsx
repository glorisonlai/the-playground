import React from 'react';
import './menu-button.css';
import classNames from 'classnames';

const MenuButton = ({shape, bg, setVis}: {shape: boolean, bg: number, setVis: VoidFunction}) => {
    const Svg = (logoId: number) => {
      const icons: Array<string> = [
        'bubbs',
        'logo',
      ];
      
      return (
        <img className="bg-sprite" src={require(`assets/sprites/${icons[logoId]}.svg`)} alt="" />
      );
  }

  const shapeStyle = {'cross': shape};
  const buttonPos = shape ? {'right': true} : {'left': true};

  const buttonClass = classNames('btn', 'flyout', {...buttonPos});
	const menuClass = classNames('glowy', 'menu-btn', {...shapeStyle});
  console.log(menuClass);
  
  return (
    <button className={buttonClass} aria-label="menu" onClick={() => {setVis()}}>
      <div className={menuClass}>
        {!shape && Svg(bg)}
      </div>
    </button>
  )
};

export default MenuButton;