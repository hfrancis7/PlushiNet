const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Post = require("./Post")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profile_img: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => new Date(date).toLocaleString()
    },
    posts: [
      {
        type: Schema.Types.ObjectId, ref: "Post",
      }
    ],
    friends: [
      {
        user:{
          type: Schema.Types.ObjectId, ref: "User",
        }, 
        username:{
          type: String,
        }
      },
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//get friends length
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});



const User = model('User', userSchema);

module.exports = User;
