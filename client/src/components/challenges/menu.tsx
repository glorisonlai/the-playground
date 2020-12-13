import React, {useState, useEffect} from 'react';
import './menu.css';
import classNames from 'classnames';
import Challenges from './challenges';
import MenuButton from '../nav/menu-button';

const Menu = ({initFocus, unlock} : { initFocus: number, unlock: void }) => {
	useEffect(() => {
    window.addEventListener('resize', handleWidthResize);
    return () => window.removeEventListener('resize', handleWidthResize);
	}, []);

	const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
	const handleWidthResize = () => {
			setWidth(getWidth());
		}

	const [width, setWidth] = useState(getWidth());
	const [visible, setVisible] = useState(false);
	const [bgId, setBgId] = useState(initFocus);

	const showState = visible ? {'visible': true} : {'hidden': true};
	const menuClass = classNames('cover', 'flyout', 'menu', {...showState});
	const flagState = width <= 404 ? {'bottom': true} : {'side': true};
	const flagClass = classNames('flag-form', {...flagState});
	const menuWidth = width > 404 ? Math.floor(width / 200) - 1 : 2;

	const handler = (e) => {
		console.log(e.target.getAttribute("key"));
	}

	const ChallengeMenu = () => {
		const challenges = Challenges.getAllChallenges();
		const focusedBg = Challenges.getChallengeFromId(bgId);

		const challengeArr = Challenges.challenges.map(({id, title, logo}, i) => {
			const unlocked = Challenges.isUnlockedFromId(id) ? 'unlocked' : 'locked';
			const focussed = id === bgId ? {'focussed': true} : {'focussed': false};
			const className = classNames('challenge', {...focussed});

			return (
				<div className={className} key={id} data-index={id} onClick={handler} style={{height: '50px', width: '50px'}} >
					<img className={unlocked} src={logo} alt="" />
					{title}
				</div>
			)
		})

		return (
			<div className="menu">
				<div className="table">
					{challengeArr}
				</div>
				{focusedBg && 
					<Flag 
						title={focusedBg.title} 
						desc={focusedBg.desc} 
					/>
				}
			</div>
		)
	}

	const Flag = ({title, desc}: {title: string, desc: string}) => {
		return ( 
			<form className={flagClass} >
				<label className="flag-label" htmlFor="flag"><strong>{title}</strong></label>
				<p>{desc}</p><br/>
				<input type="text" id="flag" name="flag" placeholder="FLAG{ ... }" /><br/>
				<input type="submit" value="Submit" />
			</form>
		);
	};

	return (
		<>
			<div className={menuClass}>
				<h1>Backgrounds</h1>
				{visible && <ChallengeMenu />}
			</div>
			<MenuButton shape={visible} bg={bgId} setVis={() => setVisible(prevVisible => !prevVisible)} />
		</>
	)
}

export default Menu;