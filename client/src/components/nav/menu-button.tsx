import React from 'react';
import './menu-button.css';
import classNames from 'classnames';
import Challenges from '../challenges/challenges';

const MenuButton = ({shape, bgId, setVis}: {shape: boolean, bgId: number, setVis: () => void}) => {
  const Svg = (bgId: number) => {
    const challenge = Challenges.getChallengeFromId(bgId);
    if (!challenge) return;

    return ( 
      <img className="bg-sprite" src={require(`assets/sprites/${challenge.logo}`)} alt="" />
      );
  }

  const shapeStyle = {'cross': shape};
  const buttonPos = shape ? {'right': true} : {'left': true};

  const buttonClass = classNames('btn', 'flyout', {...buttonPos});
	const menuClass = classNames('glowy', 'menu-btn', {...shapeStyle});
  
  return (
    <button className={buttonClass} aria-label="menu" onClick={() => {setVis()}}>
      <div className={menuClass}>
        {!shape && Svg(bgId)}
      </div>
    </button>
  )
};

export default MenuButton;