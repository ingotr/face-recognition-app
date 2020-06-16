import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3"><img className="Tilt-logo" src={brain} alt="brain logo" height="100"/></div>
      </Tilt>
    </div>
  )
}

export default Logo;
