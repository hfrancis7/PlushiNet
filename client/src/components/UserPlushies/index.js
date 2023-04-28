import React from 'react';
import './style.css';
import plushiexample2 from '../../assets/plushiexample2.jpg'
import { Card, Col, Row } from 'antd';
import { Button, Space } from 'antd';
import { HeartFilled, UserAddOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function UserPlushies() {
   

  return (
    <div className="my-2">
      <h2 className='productTitle'>My PlushiNet:</h2>
      <div className="productImages">
          <Row gutter={16}>

            <Col span={8}>
              <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<Link to="/PlushiDetails"><img className="plushiimg" src={plushiexample2} alt="plushiexample..." /></Link>}> 
                  <Button className='likebtn'><HeartFilled twoToneColor="#5784ba" /></Button>
                  <h2 className='plushinametag'>Name</h2>
                  <h4 className='username'><Link to="/UserProfile">username</Link></h4>
                  <Button className='addbtn'>Follow<UserAddOutlined twoToneColor="#5784ba" /></Button>
              </Card>
            </Col>

            
          </Row>
      </div>
    </div>
  );
}

export default UserPlushies;
