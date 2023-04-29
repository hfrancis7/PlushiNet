import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_PROD } from "../../utils/queries";

function PlushiDeets(props) {
    const { loading, error, data } = useQuery(QUERY_PROD, {
        variables: { _id: props.match.params.id },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const { name, description, image } = data.product;

    return (
        <div>
            <img src={image} ></img>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}

export default PlushiDeets;