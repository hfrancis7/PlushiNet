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
    description: String!
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
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
