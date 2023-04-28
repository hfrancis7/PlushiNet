import React from 'react';
import { Col, Row, Image, Card } from 'antd';

const Friends = () => {

    return (
        <div>
            <h1 style={{
                marginBottom: 20,
                marginTop: 20
            }}>Friends List</h1>
            <Row style={{ marginTop: 10 }}>
                <Col span={8}
                    style={{
                        backgroundColor: '#b6d8f2',
                        padding: 10
                    }}>
                    <Image
                        className="fol-img"
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Col>
                <Col span={16}
                    style={{
                        backgroundColor: '#9ac8eb',
                    }}>
                    <Card className="fol-card" size="small" title="Friend Info" bordered={false}
                        style={{
                            width: 300,
                            margin: 'auto',
                            marginTop: 20,
                        }}>
                        <p>Username</p>
                        <p><a href='#'>Link</a></p>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Col span={8}
                    style={{
                        backgroundColor: '#b6d8f2',
                        padding: 10
                    }}>
                    <Image
                        className="fol-img"
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Col>
                <Col span={16}
                    style={{
                        backgroundColor: '#9ac8eb',
                    }}>
                    <Card className="fol-card" size="small" title="Friend Info" bordered={false}
                        style={{
                            width: 300,
                            margin: 'auto',
                            marginTop: 20,
                        }}>
                        <p>Username</p>
                        <p><a href='#'>Link</a></p>
                    </Card>
                </Col>
            </Row>
        </div>
    );

};

export default Friends;
