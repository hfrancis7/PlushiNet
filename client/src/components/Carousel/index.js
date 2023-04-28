import React from 'react';
import { Carousel } from 'antd';
import { Col, Row } from 'antd';
import './style.css';
import plushiexample from '../../assets/plushiexample.jpg';
import plushiexample2 from '../../assets/plushiexample2.jpg';
import plushiexample3 from '../../assets/plushiexample3.jpg';
import plushiexample4 from '../../assets/plushiexample4.jpg';
import likegif from '../../assets/likegif.gif'
import newgif from '../../assets/newgif.gif'

function Carousels() { 
  
  
  return (
    <div className='containerbox'>
    <Row justify="space-evenly">
      <Col className='carousel' span={10}>
        <h2 className='newplushi'> New Plushies:
          <img className="gif" src={newgif} alt="likegif..." />
        </h2>     
        <Carousel autoplay>
          <div>
            <img className='carouselimg' src={plushiexample} alt="plushiexample..." />
            <h4>Toast</h4>
            <h5>From the PlushiNet of:</h5>
          </div>
          <div>
            <img className='carouselimg' src={plushiexample2} alt="plushiexample..." />
            <h4>Octopus</h4>
            <h5>From the PlushiNet of:</h5>
          </div>
        </Carousel>
      </Col>
      <Col className='carousel' span={10}>
        <h2 className='mostlikedplushi'> Most Liked Plushies:
          <img className="gif" src={likegif} alt="likegif..." />
        </h2>
              
        <Carousel autoplay>
          <div>
            <img className='carouselimg' src={plushiexample3} alt="plushiexample..." />
            <h4>Avacado</h4>
            <h5>From the PlushiNet of:</h5>
          </div>
          <div>
            <img className='carouselimg' src={plushiexample4} alt="plushiexample..." />
            <h4>Groot</h4>
            <h5>From the PlushiNet of:</h5>
          </div>
        </Carousel>
      </Col>    
    </Row>    
    </div>
  );
  
};
export default Carousels;