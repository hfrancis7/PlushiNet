const { AuthenticationError } = require('apollo-server-express');
const { User, Post, reactionSchema, Comment} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    async getPosts(){
      try{
        const posts = await Post.find().sort({createdAt: -1});
        return posts;
      }catch(err){
        throw new Error(err);
      }
    },
    async getPost(_, {postId}){
      try{
        const post = await Post.findById(postId);
        if(post){
          return post;
        }else{
          throw new Error("Post not found!");
        }
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
    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    //createPost
    createPost: async(parent, { body, image}, context) =>{
      try{
        if (context.user) {
          const userForName = await User.findById(context.user._id);
          //console.log(userForName.username);
          const newPost = new Post({
            body,
            user: context.user._id,
            username: userForName.username,
            image,
          })

          const post = await newPost.save();

          await Post.create(post);
          await User.findByIdAndUpdate(context.user._id, { $push: { posts: post } }, {new: true});

          return post;
        }
        throw new AuthenticationError('Not logged in');
      }catch(err){
        throw new Error(err);
      }
    },
    //deletePost
    deletePost: async(parent, {postId}, context) => {
      try{
        if(context.user){
          const post = await Post.findById(postId);
          if(context.user._id == post.user._id){
            await User.findByIdAndUpdate(context.user._id, { $pull: { posts: post } })
            await Post.deleteOne(post);
            return 'Post sucessfully deleted!';
          }else{
            throw new AuthenticationError("Action not allowed.");
          }
        }
      }catch(err){
        throw new Error(err);
      }
    }
  }
};

module.exports = resolvers;
