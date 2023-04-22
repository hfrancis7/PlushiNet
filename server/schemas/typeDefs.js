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

  input RegisterInput{
    username: String!
    password: String!
    email: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    profile_img: String
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
    register(registerInput: RegisterInput): Auth
  }
`;

module.exports = typeDefs;
