import React, {useState} from 'react';
import './App.css';
import Background from './index.ts';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');

  const [portfolio, showPortfolio] = useState(!!parseInt(view))
  return (
    <div className="app">
      <Background />
      {/* {portfolio ? <Portfolio /> : <Pitch/>} */}
    </div>
  );
}

export default App;
