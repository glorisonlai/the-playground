import React from 'react';
import './menu.css';
import classNames from 'classnames';

const Menu = ({visible, initFocus, unlock} : { visible: boolean, initFocus: number, unlock: void }) => {
	const showState = visible ? {'visible': true} : {'hidden': true};
	const menuClass = classNames('cover', 'flyout', 'menu', {...showState});
	console.log(menuClass);

	return (
		<div className={menuClass}>
			<h1>Hello</h1>
		</div>
	)
}

export default Menu;