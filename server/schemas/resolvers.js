const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Post, Comment} = require('../models');
const { signToken } = require('../utils/auth');
const { countDocuments } = require('../models/Post');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    //get all Posts
    async getPosts(){
      try{
        const posts = await Post.find().sort({createdAt: -1});
        return posts;
      }catch(err){
        throw new Error(err);
      }
    },
    //get singular post
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
    },
    //get all comments from one post
    async getComments(_, {postId}){
      try{
        const post = await Post.findById(postId);
        if(post){
          const comments = await Comment.find();
          return comments;
        }else{
          throw new Error("Post not found!");
        }
      }catch(err){
        throw new Error(err);
      }
    },
    //get singular comment
    async getComment(_, {commentId}){
      try{
        const comment = await Comment.findById(commentId);
        if(comment){
          return comment;
        }else{
          throw new Error("Comment not found!");
        }
      }catch(err){
        throw new Error(err);
      }
    },
    //get all posts posted by one user
    async getProfilePosts(_, {userId}){
      try{
        const user = await User.findById(userId);
        if(user){
          const postIds = user.posts;
          const posts = [];
          for(let i = 0; i < postIds.length; i++){
            let post = await Post.findById(postIds[i].toString());
            posts.push(post);
          }
          return posts;
        }else{
          throw new UserInputError("User does not exist");
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
          //console.log(post._id);

          await Post.create(post);
          await User.findByIdAndUpdate(context.user._id, { $push: { posts: post._id } }, {new: true});

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
            await User.findByIdAndUpdate(
              {_id: context.user._id}, 
              { $pull: { posts: post._id  } }, 
              { new: true},
              );
            for(let i = 0; i < post.comments.length; i++){
              let comment_toDelete_fromPost = post.comments[i];
              //console.log(comment_toDelete_fromPost);
              let comment_toDelete = await Comment.findById(comment_toDelete_fromPost._id);
              await Comment.deleteOne(comment_toDelete);
            }
            await Post.deleteOne(post);
            return 'Post sucessfully deleted!';
          }else{
            throw new AuthenticationError("Action not allowed.");
          }
        }
      }catch(err){
        throw new Error(err);
      }
    },
    //createComment
    createComment: async(parent, {postId, body}, context) =>{
      try{
        if (context.user) {
          const userForName = await User.findById(context.user._id);
          //console.log(userForName.username);
          const post = await Post.findById(postId);

          if(post){
            const newComment = new Comment({
              body,
              username: userForName.username,
              user: context.user._id,
              post: post._id,
            })
            const comment = await newComment.save();
            await Comment.create(comment);
            await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id} }, {new: true});
            return await Post.findById(postId); //return post updated with comment
          }else{
            throw new UserInputError('Post does not exist');
          }
        }
        throw new AuthenticationError('Not logged in');
      }catch(err){
        throw new Error(err);
      }
    },
    //deleteComment
    deleteComment: async(_, {postId, commentId}, context) => {
      try{
        if(context.user){
          const comment = await Comment.findById(commentId);
          const userForName = await User.findById(context.user._id);
          const post = await Post.findById(postId);
          // console.log(comment.user.toString());
          // console.log(userForName._id.toString());

          if(post){
            if(comment){
              if(comment.user.toString() == userForName._id.toString()){
                await Post.findByIdAndUpdate(postId, { $pull: { comments: comment._id } }, {new: true})
                await Comment.deleteOne(comment);
                return await Post.findById(postId);
              }else{
                throw new AuthenticationError("Action not allowed.");
              }
            }else{
              throw new UserInputError("Comment does not exist!");
            }
          }else{
            throw new UserInputError("Post does not exist!");
          }
        }
      }catch(err){
        throw new Error(err);
      }
    },
    //will like/unlike post toggle
    likePost: async(_, {postId}, context) => {
      try{
        if(context.user){
          const userForName = await User.findById(context.user._id); //context only has userid and email
          const username = userForName.username;
          const post = await Post.findById(postId);
          if(post){
            if(post.likes.find(like => like.username === username)){
              //Post already liked, unlike it
              post.likes = post.likes.filter(like => like.username !== username);
            }else{
              //Not liked, like post
              let date = new Date();
              //console.log(date.toLocaleString());
              post.likes.push({createdAt: date.toLocaleString(), username: username});
            }
            await post.save();
            return post;
          }else{
            throw new UserInputError('Post does not exist!');
          }
        }else{
          throw new AuthenticationError('Not logged in!')
        }

      }catch(err){
        throw new Error(err);
      }
    },
    addFriend: async(_, {userId}, context) => {
      try{
        if(context.user){
          const user = await User.findById(context.user._id); //context only has userid and email
          const newfriend = await User.findById(userId);
          if(newfriend){
            if(user.friends.find(existingfriend => existingfriend.username == newfriend.username)){
              //already have friend, remove friend
              //console.log("HERE TO REMOVE");
              user.friends = user.friends.filter(existingfriend => existingfriend.username !== newfriend.username);
            }else{
              //console.log("HERE");
              //friend not on list, add friend
              user.friends.push({
                username: newfriend.username
              });
            }
            await user.save();
            return user;
          }else{
            throw new UserInputError('User does not exist!');
          }
        }else{
          throw new AuthenticationError("Not logged in.");
        }
      }catch(err){
        throw new Error(err);
      }
    }
  }
};

module.exports = resolvers;
