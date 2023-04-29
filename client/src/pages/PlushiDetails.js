import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

function PlushieDetails() {
  const { loading, error, data } = useQuery (QUERY_PRODUCTS);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  return (
    <div>
      {data.products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img>{product.image}</img>
        </div>
      ))}
    </div>
 
       
        // <div className="container my-1">
    

        //   <h2 className='productDetailTitle'>{products.name}</h2>

        //   <p className='productDetailDesc'> {products.description}</p>

        //   <img className='detailImage'
        //     src={`/images/${products.image}`}
        //     alt={products.name}
        //   />
        // </div> 
  );
}

export default PlushieDetails;