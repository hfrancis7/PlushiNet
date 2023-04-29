import React from "react";
import PlushiDeets from "../components/PlushiDeets";
import CommentForm from "../components/CommentForm";
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_PROD } from "../utils/queries";

const PlushiDetails = (props) => {
  const params = useParams();
  const id = params._id;
  const { loading, error, data } = useQuery(QUERY_PROD, {
    variables: { productId: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { name, description, image } = data.getProduct;
  return (
    <div>
      <img src={image} ></img>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default PlushiDetails;