import { gql } from '@apollo/client';

//get ALL POSTS that exist in the db
export const QUERY_POSTS = gql`
query getPosts {
  getPosts {
    _id
    body
    createdAt
    image
    likes {
      _id
      createdAt
      username
    }
    username
  }
}
`;

//get the COMMENTS related to a SINGLE POST
//(meant to be used for the "view post" page where comments can be shown and made);
export const QUERY_POST_COMMENTS = gql`
query GetComments($postId: ID!) {
  getComments(postId: $postId) {
    _id
    body
    username
    createdAt
    post {
      _id
    }
    user {
      _id
    }
  }
}
`;

//meant to get ALL POSTS from a specific user (meant to be used for profile page)
export const QUERY_PROFILE_POSTS = gql`
query GetProfilePosts($userId: ID!) {
  getProfilePosts(userId: $userId) {
    _id
    body
    username
    comments {
      _id
    }
    createdAt
    image
    likes {
      _id
      createdAt
      username
    }
    likeCount
  }
}
`;

//might not be relevant, used to get a singular comment based on a comment's ID
export const QUERY_COMMENT = gql`
query GetComment($commentId: ID!) {
  getComment(commentId: $commentId) {
    _id
    body
    createdAt
    post {
      _id
    }
    user {
      _id
    }
    username
  }
}
`;

//gets all data about a singular post (meant to be used for the query post page)
//includes likeCount
export const QUERY_POST = gql`
query Query($postId: ID!) {
  getPost(postId: $postId) {
    _id
    body
    comments {
      _id
    }
    createdAt
    image
    likes {
      _id
      createdAt
      username
    }
    username
    likeCount
  }
}
`;

//get info about a user based on their ID
export const QUERY_USER = gql`
query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    _id
    createdAt
    email
    friends {
      _id
    }
    posts {
      _id
    }
    profile_img
    username
  }
}
`;

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      description
      image
    }
  }
`;
export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
    }
  }
`;