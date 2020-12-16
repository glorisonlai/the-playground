import React, {useState, useEffect} from 'react';
import './menu.css';
import classNames from 'classnames';
import Challenges from './challenges';
import MenuButton from '../nav/menu-button';

const Menu = ({bgId, unlock} : { bgId: number, unlock: Function }) => {
	console.log('bgId', bgId);
	const handleWidthResize = () => {
			setWidth(getWidth());
		}

	useEffect(() => {
    window.addEventListener('resize', handleWidthResize);
    return () => window.removeEventListener('resize', handleWidthResize);
	}, [handleWidthResize]);

	const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; 
	

	const [width, setWidth] = useState(getWidth());
	const [visible, setVisible] = useState(true);
	const [focussedId, setFocussedId] = useState(bgId);

	const showState = visible ? {'visible': true} : {'hidden': true};
	const menuClass = classNames('cover', 'flyout', {...showState});
	const flagState = width <= 404 ? {'bottom': true} : {'side': true};
	const flagClass = classNames('flag', 'flag-form', {...flagState});
	const menuWidth = width > 404 ? Math.floor(width / 200) - 1 : 2;

	const handler = (id: number) => {
		Challenges.isUnlockedFromId(id) ? 
			switchBackground(id) :
			focusOnChallenge(id);
	}

	const switchBackground = (id: number) => {
		unlock(id);
		setFocussedId(id);
	}

	const focusOnChallenge = (id: number) => {
		setFocussedId(id);
	}

	const ChallengeMenu = () => {
		const challenges = Challenges.getAllChallenges();
		const focussedBg = Challenges.getChallengeFromId(focussedId);
		const focussedBgIsUnlocked = Challenges.isUnlockedFromId(focussedId);

		const challengeArr = challenges.map(({id, title, logo}) => {
			const unlocked = Challenges.isUnlockedFromId(id) ? 'unlocked' : 'locked';
			const focussed = id === bgId? 'focussed' : 'unfocussed';
			const imgClass = classNames(unlocked, focussed)

			return (
				<div className={'challenge'} key={id} onClick={() => handler(id)} style={{height: '50px', width: 'auto'}} >
					<img className={imgClass} src={logo} alt="" style={{width: '50px'}} />
					<div className="challenge-text">{title}</div>
				</div>
			)
		})

		return (
			<div className="menu">
				<div className="table" style={{width: width/2}}>
					{challengeArr}
				</div>
				{focussedBg && 
					<Flag 
						title={focussedBg.title} 
						desc={focussedBg.desc} 
						unlocked={focussedBgIsUnlocked}
					/>
				}
			</div>
		)
	}

	const Flag = ({title, desc, unlocked}: {title: string, desc: string, unlocked: boolean}) => {
		return ( 
			<form className={flagClass} style={{width: width/2}}>
				<label className="flag flag-label" htmlFor="flag"><strong>{title}</strong></label>
				<p>{desc}</p><br/>
				{!unlocked &&
				<>
					<input className='flag' type="text" id="flag" name="flag" placeholder="FLAG{ ... }" /><br/>
					<input className='flag' type="submit" value="Submit" />
				</>
				}
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