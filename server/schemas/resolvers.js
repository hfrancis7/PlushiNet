const { AuthenticationError } = require('apollo-server-express');
const { User, Post, reactionSchema, Comment} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    async getPosts(){
      try{
        const posts = await Post.find();
        return posts;
      }catch(err){
        throw new Error(err);
      }
    }
  },
  Mutation: {
    //register = adding user
    register: async (_, {registerInput: username, email, password}, context, info) => {
      //validate user Data
      //make sure User data doesn't already exist
      //hash password (should be hashed in models)
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toString(),
      });
      const token = new signToken(newUser);

      return { token, newUser };
    },
  }
};

module.exports = resolvers;
