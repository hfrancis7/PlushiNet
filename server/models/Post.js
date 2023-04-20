const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
var validate = require('mongoose-validator');

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

var descriptionValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 500],
      message: 'Post should be between 1 and 500 characters'
    }),
  ];

const postSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            validate: descriptionValidator,
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
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// virtual to get amount of "reactions"
postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Post = model('post', postSchema);



module.exports = Post;