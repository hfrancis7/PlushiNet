import React, { useState } from "react";
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROD, QUERY_PROD_POSTS } from "../utils/queries";
import { CREATE_POST } from '../utils/mutations';
import AuthService from '../utils/auth.js'
//import { useNavigate } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn"

const PlushiDetails = (props) => {
  const [content, setContent] = useState('');
  //const navigate = useNavigate();
  const params = useParams();
  const id = params._id; //getting id from params
  const { loading: productLoading, error: productError, data: productData } = useQuery(QUERY_PROD, {
    variables: { productId: id },
  });
  const {loading: postLoading, error: postError, data: postData } = useQuery(QUERY_PROD_POSTS, {
    variables: {productId: id}
  });
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  if (productLoading || postLoading) return <p>Loading...</p>;
  if (productError || postError) return <p>Error</p>;
  // if(postLoading) return <p>Loading...</p>
  // if(postError) return <p>Error</p>

  //const [title, setTitle] = useState('');
  const handleFormSubmit = async (event) => {
      try{
          const mutationResponse = await createPost({
              variables: {productId: id, body: content},
              headers: {authorization: AuthService.getToken()}
          });
          if(mutationResponse){
            window.location.reload(false);
            //navigate('/products/' + id);
          }
      }catch(err){
          console.log(err);
      }
      //setContent('');
  }

  //const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const { name, description, image, posts } = productData.getProduct;

  return (
    <div>
      <img src={image} ></img>
      <h1>{name}</h1>
      <p>{description}</p>
      <div>
          <form onSubmit={handleFormSubmit}>
              <label>
                  Content:
                  <textarea value={content} onChange={handleContentChange} />
              </label>
              <button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
              </button>
              {error && <p>Error creating post</p>}
          </form>
      </div>

      <ul>
            {postData.getProductPosts.map(({ _id, body, username, createdAt }) => (
                <li key={_id}>
                  <h3>{username}</h3>
                  <p>{body}</p><button>✗</button>
                  <p>{createdAt}</p>
                </li>
            ))}
        </ul>

    </div>
  );
};

export default PlushiDetails;