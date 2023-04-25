const { Schema, model } = require('mongoose');
const User = require('./User');
const Post = require('./Post')

var validate = require('mongoose-validator');

var commentValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 500],
      message: 'Post should be between 1 and 500 characters'
    }),
  ];

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true,
            validate: commentValidator,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => new Date(date).toLocaleString()
        },
        username: {
            type: String,
            required: true,
        },
        // save user and friend as object references
        user: { type: Schema.Types.ObjectId, ref: "User"},
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);


const Comment = model('comment', commentSchema);

module.exports = Comment;