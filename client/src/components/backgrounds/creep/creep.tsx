import React from 'react';
import './creep.css';

const Eyes = () => {
  const Eye = ( {className} : {className: string}) => {
    const styles = {
      margin: '0 auto',
      width: '300px',
      height: '300px',
      borderRadius: '100$ 0px',
      transform: '45',
      color: 'white',
      zIndex: 99
    };

    return(
      <div className={className} style={styles}/>
      );
  }

  return (
    <div className="bg">
      <Eye className={"med"} />
      {/* <Eye />
      <Eye />
      <Eye />
      <Eye />
      <Eye />
      <Eye />
      <Eye />
      <Eye /> */}
    </div>
  );
};

export default Eyes;