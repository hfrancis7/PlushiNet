const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # type Comment {
  #   _id: ID
  #   description: String
  #   createdAt: String
  #   post: Post
  # }

  type Post{
    _id: ID
    body: String!
    image: String!
    createdAt: String
    username: String!
  }

  type User {
    _id: ID
    username: String
    profile_img: String
    email: String
    createdAt: String
    posts: [Post]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post

  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
    createPost(body: String!, image: String!): Post!
    deletePost(postId: ID!): String
  }
`;

module.exports = typeDefs;
