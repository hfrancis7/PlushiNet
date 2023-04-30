import { gql } from '@apollo/client';

//Login
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//Sign in (register)
export const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

//CREATE A POST using the body gotten from user input and image gotten from image URL (string)
//image URL should be created by cloudinary upon upload... probably gonna be tricky
export const CREATE_POST = gql`
mutation createPost($body: String!, $productId: ID!) {
  createPost(body: $body, productId: $productId) {
    _id
    body
    createdAt
    user {
      _id
    }
    username
  }
}
`;

//THIS IS A TOGGLE FUNCTION: when you make the command and the user is already added as a "friend", it will remove them as a friend
//May rename "friend" to "follower" semantically, but should be fine to change front-end side without touching backend
export const ADD_FRIEND = gql`
mutation AddFriend($userId: ID!) {
  addFriend(userId: $userId) {
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

//ADDS A COMMENT TO A POST, need the post's id, which should either be saved in the route or some info about the post
//the function returns a post, so once the comment is created, the view post page would need to be reloaded/refreshed
export const ADD_COMMENT = gql`
mutation CreateComment($postId: ID!, $body: String!) {
  createComment(postId: $postId, body: $body) {
    _id
    body
    comments {
      _id
    }
    image
    createdAt
    likeCount
    likes {
      _id
      createdAt
      username
    }
    username
  }
}`;

//DELETES A POST need to pass through the id of the post being deleted
//server does check that the post belongs to user and doesn't delete if so
//checks based on username bc i made an error in the typedefs thats going to take longer to fix
//than just ensuring users don't have the same username... I hope.
export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}`;

//DELETE COMMENT FROM POST
//Need BOTH the postId and the commentId
export const DELETE_COMMENT = gql`
mutation DeleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(postId: $postId, commentId: $commentId) {
    _id
    body
    comments {
      _id
    }
    createdAt
    image
    likeCount
    likes {
      _id
      createdAt
      username
    }
    username
  }
}
`;

//LIKE_POST
//This is a toggle. If you make this command and the user already liked the post, it will remove the like
export const LIKE_POST = gql`
mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    _id
    body
    comments {
      _id
    }
    createdAt
    image
    likeCount
    likes {
      _id
      createdAt
      username
    }
    username
  }
}
`;



