import React from 'react';
require('./whoami.css')

const WhoAmI = () => {
  const header = () => {
    return (
      <header className="start">
        <div className="whoami">
          <h1>Hi, my name's Glorison</h1>
          <h1>I'm a <span className="carousel"/></h1>
        </div>
      </header>
    )
  }

  return (
    header()
  )
}

export default WhoAmI