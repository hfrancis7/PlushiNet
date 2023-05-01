import React from 'react'
import MainImage from '../components/MainImage';
import Carousel from '../components/Carousel';

function Home() {
  return (
    <div>
      <MainImage />
      <h2>plushi [plush-ee] <br></br>noun: a toy that is covered in plush fabric and filled with soft material. <br></br>Also called: plush, plushy, plushie </h2>
      <h3 className="directions">Been here before? Sign In! <br></br>Are you new here? Sign Up to get Started! <br></br>Click the “All Plushies” tab and Happy Posting!</h3>
      <Carousel/>
    </div>
  )
}

export default Home;
