import React, {useState, useEffect} from 'react';
import './App.css';
import Background from 'components/backgrounds/background';
import Menu from 'components/challenges/menu';
import Challenges from 'components/challenges/challenges';

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

  const getBgId = (): number => {
    const id: number = Number(localStorage.getItem('bgId'));
    return Challenges.isUnlockedFromId(id) ? id : 0;
  };

  const [bgId, setBgId] = useState(getBgId());

  return (
    <div className="app">
      <Background bg={bgId} />
      <Menu bgId={bgId} unlock={(id: number) => setBgId(id)} />
      {/* {showPortfolio ? <Portfolio /> : <Pitch/>} */}
    </div>
  );
}

export default App;
