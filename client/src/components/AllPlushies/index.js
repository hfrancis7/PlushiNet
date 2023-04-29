import React, { useEffect } from 'react';
import './style.css';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function AllPlushies() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);



  return (

    <div className="my-2">
      <h2 className='productTitle'>All Plushies:</h2>
      {state.products.length ? (
        <div className="productImages flex-row">
          {data.products.map((product) => (
            <ProductItem
              _id={product._id}
              image={product.image}
              name={product.name}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>

    
    // <div className="my-2">
    //   <h2 className='productTitle'>My PlushiNet:</h2>
    //   <div className="productImages">
    //       <Row gutter={16}>

    //         <Col span={8}>
    //           <Card
    //               hoverable
    //               style={{ width: 240 }}
    //               cover={<Link to="/product/:id"><img className="plushiimg" src={plushiexample2} alt="plushiexample..." /></Link>}> 
    //               <Button className='likebtn'><HeartFilled twoToneColor="#5784ba" /></Button>
    //               <h2 className='plushinametag'>Name</h2>
    //               <h4 className='username'><Link to="/UserProfile">username</Link></h4>
    //               <Button className='addbtn'>Follow<UserAddOutlined twoToneColor="#5784ba" /></Button>
    //           </Card>
    //         </Col>
           
    //       </Row>
    //   </div>
    // </div>
  );
}

export default AllPlushies;
