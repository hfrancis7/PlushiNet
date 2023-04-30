import React from 'react';
import { Carousel } from 'antd';
import { Col, Row } from 'antd';
import './style.css';
import plushiexample from '../../assets/squishmallow-shark-davie.jpg';
import plushiexample2 from '../../assets/plushiexample2.jpg';
import plushiexample3 from '../../assets/plushiexample3.jpg';
import plushiexample4 from '../../assets/plushiexample4.jpg';
import Arelux from '../../assets/stuffed-duck-Arelux.jpg';
import likegif from '../../assets/likegif.gif'
import newgif from '../../assets/newgif.gif'
import walrus from '../../assets/pillow-walrus.jpg';


function Carousels() { 
  
  
  return (
    <div className='containerbox'>
    <Row justify="space-evenly">
      <Col className='carousel' span={10}>

        
        <h2 className='newplushi'> NEW PLUSHIES
          <img className="gif" src={newgif} alt="likegif..." />
        </h2>     
        <Carousel autoplay>
          <div>
            <h4>Davie</h4>
            <img className='carouselimg' src={plushiexample} alt="plushiexample..." />
          </div>
          <div>
            <h4>Octo</h4>
            <img className='carouselimg' src={plushiexample2} alt="plushiexample..." />
          </div>
          <div>
            <h4>Seal</h4>
            <img className='carouselimg' src={walrus} alt="plushiexample..." />
          </div>
        </Carousel>
      
        <h2 className='mostlikedplushi'> MOST VIEWED PLUSHIES
          <img className="gif" src={likegif} alt="likegif..." />
        </h2>
              
        <Carousel autoplay>
          <div>
            <h4 class='mlplushiename' >Arelux</h4>
            <img className='carouselimg' src={Arelux} alt="plushiexample..." />
          </div>
          <div>
            <h4 class='mlplushiename' >Avacado</h4>
            <img className='carouselimg' src={plushiexample3} alt="plushiexample..." />
          </div>
          <div>
            <h4 class='mlplushiename' >Baby Groot</h4>
            <img className='carouselimg' src={plushiexample4} alt="plushiexample..." />
          </div>
        </Carousel>
      </Col>    
    </Row>    
    </div>
  );
  
};
export default Carousels;