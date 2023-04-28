import React from 'react';
import logoname from '../../assets/plushigif.gif'
import './style.css';

function MainImage() {
  return (
    <div>
      <img className="logoname" src={logoname} alt="logo..." />      
    </div>
  );
}

export default MainImage;
