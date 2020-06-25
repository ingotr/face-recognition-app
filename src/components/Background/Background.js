import React from 'react';
import Particles from 'react-particles-js';
import * as Constants from '../../utils/const';

const { PARTICLES_NUMBER, PARTICLES_DENSITY_AREA, } = Constants;

const particlesOptions = {
  particles: {
    number: {
      value: PARTICLES_NUMBER,
      density: {
        enable: true,
        value_area: PARTICLES_DENSITY_AREA
      }
    }
  }
}

const Background = () => {
  return (
    <Particles
      params={particlesOptions}
      className='particles' />
  )
}

export default Background;
