const { Schema, model } = require('mongoose');
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
        body: {
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
        comments: [
            {
                body: String,
                username: String,
                createdAt: {
                    type: Date,
                    default: Date.now(),
                    get: (date) => new Date(date).toLocaleString()
                },
            },
        ],
        likes: [
            {
                username: String,
                createdAt: String
            }
        ],
        user: {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            username: String
        } 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// virtual to get amount of "likes"
postSchema.virtual('likeCount').get(function () {
    return this.likes.length;
  });

//get comments length
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
  });

const Post = model('post', postSchema);



module.exports = Post;