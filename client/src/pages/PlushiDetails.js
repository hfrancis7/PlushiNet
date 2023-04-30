import React, { useState } from "react";
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROD, QUERY_PROD_POSTS } from "../utils/queries";
import { CREATE_POST, DELETE_POST } from '../utils/mutations';
import AuthService from '../utils/auth.js'
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../components/DeleteBtn"
import { Col, Divider, Row } from 'antd'

const PlushiDetails = (props) => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const id = params._id; //getting id from params
  const { loading: productLoading, error: productError, data: productData } = useQuery(QUERY_PROD, {
    variables: { productId: id },
  });
  const {loading: postLoading, error: postError, data: postData } = useQuery(QUERY_PROD_POSTS, {
    variables: {productId: id}
  });
  const [createPost, { loading: createLoading, error: createError }] = useMutation(CREATE_POST);
  const [deletePost, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_POST);
  if (productLoading || postLoading) return <p>Loading...</p>;
  if (productError || postError) return <p>Error</p>;


  const handleDeletePost = async(postId) => {
    console.log(postId);
    try{
      const mutationResponse = await deletePost({
        variables: {productId: id, postId: postId},
        headers: {Authorization: AuthService.getToken()}
      });
      if(mutationResponse){
          window.location.reload(false);
          navigate('/allplushies/' + id);
      }else{
        console.log("Mutationresponse failed");
      }
    }catch(err){
      console.log(err);
    }
  }
  const handleFormSubmit = async (event) => {
      try{
          const mutationResponse = await createPost({
              variables: {productId: id, body: content},
              headers: {authorization: AuthService.getToken()}
          });
          if(mutationResponse){
            window.location.reload(false);
            navigate('/allplushies/' + id);
          }
      }catch(err){
          console.log(err);
      }
      //setContent('');
  }

  const handleContentChange = (event) => setContent(event.target.value);

  const { name, description, image, posts } = productData.getProduct;

  return (
    <div>
      <h1 className="detailname" >{name}</h1>
      <img className="detailimg" src={image} ></img>
      <h2 className="detaildesc">{description}</h2>
      <div className="formdiv">
          <form className="detailform" onSubmit={handleFormSubmit}>
              <label>
                  <p className="comment">ADD A COMMENT:</p>
                  <textarea rows="4" cols="80" value={content} onChange={handleContentChange} />
              </label> <br></br>
              <button className="crtbtn" type="submit" disabled={createLoading}>
                  {createLoading ? 'Creating...' : '→'}
              </button>
              {createError && <p>Error creating post</p>}
          </form>
      </div>

      <ul className="commentsection">
          
            {postData.getProductPosts.map(({ _id, body, username, createdAt }) => (

              <>
                <Row gutter={6} className="eachcomment" justify="start" key={_id}>
                  <Col span={4} className="username">{username}</Col>
                  <Col span={16} className="commentbody">{body}</Col>
                  <button className="xbtn" onClick={() => handleDeletePost(_id)} disabled={deleteLoading}>
                    {deleteLoading ? 'Deleting...' : '✗'}
                  </button>
                </Row>
                <Row gutter={6}>
                <Col className="commentcreate" span={6}>{createdAt}</Col>
                </Row>
              </>
            ))}
      </ul>
    </div>
  );
};

export default PlushiDetails;