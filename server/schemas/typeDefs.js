const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Comment {
    _id: ID
    description: String
    createdAt: Date
    post: Post
  }

  type Post{
    _id: ID
    description: String!
    image: String!
    createdAt: Date
    reactions: [Reaction]
    comments: [Comment]
  }

  type User {
    _id: ID
    username: String!
    profile_img: String
    email: String!
    posts: [Post]
    friends: [User]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
