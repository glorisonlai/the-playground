import React, {useState, useEffect} from 'react';
import Bubbles from './components/backgrounds/bubbs/bubbles';

const Background = () => {
  
  useEffect(() => {
    console.log(
    '-------------------------------------------------------\n' +
    '|                                                     |\n' +
    '|              Bored of the background?               |\n' +
    '|               Try unlocking some! ;)                |\n' +
    '|                                                     |\n' +
    '-------------------------------------------------------'
    );
  }, []);
  
  return Bubbles();
}

export default Background;