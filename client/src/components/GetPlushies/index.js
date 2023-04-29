import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODS } from "../../utils/queries";
import { Link } from 'react-router-dom';


function GetPlushies() {
    const { loading, error, data } = useQuery(QUERY_PRODS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <ul>
            {data.getProducts.map(({ _id, name, image }) => (
                <li key={_id}>
                    <img src={image} ></img>
                    <Link to={`/products/${_id}`}>{name}</Link>
                </li>
            ))}
        </ul>
    );
}

export default GetPlushies;