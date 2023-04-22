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
    register: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;
