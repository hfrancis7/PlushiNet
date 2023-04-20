const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
var validate = require('mongoose-validator');

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
        image: {
            type: String,
            required: true,
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
        reactions: [reactionSchema],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
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

//get comments length
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
  });

const Post = model('post', postSchema);



module.exports = Post;