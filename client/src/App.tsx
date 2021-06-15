import React, {useState, useEffect} from 'react';
import './App.css';
import Background from 'components/backgrounds/background';
import Menu from 'components/challenges/menu';
import Challenges from 'components/challenges/challenges';
import Pitch from 'components/content/pitch';

function App() {
  useEffect(() => {
    Challenges.initialUnlock();
    console.log(
      "%c" +
        "-------------------------------------------------------\n" +
        "|                                                     |\n" +
        "|              Tired of the background?               |\n" +
        "|               Try unlocking some! ;)                |\n" +
        "|                                                     |\n" +
        "-------------------------------------------------------",
      "background: #222; color: #bada55"
    );
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get("view");

  const [showPortfolio, setShowPortfolio] = useState(!!view ? 1 : 0);

  const getBgId = (): number => {
    const id: number = Number(localStorage.getItem("bgId"));
    return Challenges.isUnlockedFromId(id) ? id : 0;
  };

  const changeBgId = (id: number) => {
    setBgId(id);
    window.localStorage.setItem("bgId", id.toString());
  };

  const [bgId, setBgId] = useState(getBgId());
  console.log(bgId);

  return (
    <div className="app">
      <Background bg={bgId} />
<<<<<<< HEAD
      <Menu bgId={bgId} unlock={(id: number) => setBgId(id)} />
      <Pitch unlocked={Challenges.getAllChallenges.length} locked={Challenges.getAllChallenges.length} />
      {/* {showPortfolio ? <Portfolio /> : <Pitch unlocked={Challenges.} locked={}/>} */}
=======
      <Menu bgId={bgId} unlock={(id: number) => changeBgId(id)} />
      {/* {showPortfolio ? <Portfolio /> : <Pitch/>} */}
>>>>>>> master
    </div>
  );
}

export default App;
