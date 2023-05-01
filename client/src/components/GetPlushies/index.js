import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODS } from "../../utils/queries";
import { Link } from 'react-router-dom';
import './style.css';
import { Col, Divider, Row } from 'antd';

function GetPlushies() {
    const { loading, error, data } = useQuery(QUERY_PRODS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            <Row className="plushiborder" justify="start">
            {data.getProducts.map(({ _id, name, image }) => (
                <Col className="plushicard" 
                xs={{ span: 20 }}
                sm={{ span: 12 }}
                md={{ span: 7 }}
                lg={{ span: 5 }}
                xl={{ span: 7 }}
                key={_id}>
                    <Link className="plushiname" to={`/allplushies/${_id}`}>{name}</Link>
                    <img className="plushiallimg" src={image} ></img>
                </Col>
            ))}
            </Row>
        </div>
    );
}

export default GetPlushies;