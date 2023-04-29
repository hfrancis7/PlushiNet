import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';

import { QUERY_PRODUCTS } from '../utils/queries';

import spinner from '../assets/spinner.gif';

function PlushieDetails() {
  const [state] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
  
   
    }
  , [products, data, loading, id]);

  
  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/AllProducts">← Back to Products</Link>

          <h2 className='productDetailTitle'>{currentProduct.name}</h2>

          <p className='productDetailDesc'> {currentProduct.description}</p>

          <img className='detailImage'
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      
    </>
  );
}

export default PlushieDetails;