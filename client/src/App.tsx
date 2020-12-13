import React, {useState, useEffect} from 'react';
import './App.css';
import Background from 'components/backgrounds/background';
import MenuButton from 'components/nav/menu-button';
import Menu from 'components/challenges/menu';


function App() {
  useEffect(() => {
    console.log('%c'+
    '-------------------------------------------------------\n' +
    '|                                                     |\n' +
    '|              Tired of the background?               |\n' +
    '|               Try unlocking some! ;)                |\n' +
    '|                                                     |\n' +
    '-------------------------------------------------------',
    'background: #222; color: #bada55'
    );
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');

  const [showPortfolio, setShowPortfolio] = useState(!!view ? 1 : 0);
  console.log(showPortfolio);

  const [showMenu, setShowMenu] = useState(false);

  const getBgId = (): number => {
    const id: number = Number(localStorage.getItem('bgId'));
    return !!id ? id : 0;
  };

  const [bgId, setBgId] = useState(getBgId());

  return (
    <div className="app">
      <Background bg={bgId} />
      <Menu visible={showMenu} initFocus={bgId} unlock={(id) => setBgId(id)} />
      <MenuButton shape={showMenu} bg={bgId} onClick={() => setShowMenu(!showMenu)} />
      {/* {showPortfolio ? <Portfolio /> : <Pitch/>} */}
    </div>
  );
}

export default App;
