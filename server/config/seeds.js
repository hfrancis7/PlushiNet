const bcrypt = require('bcrypt');

const db = require('./connection');
const { User, Post, Comment, Product } = require('../models');

db.once('open', async () => {
  await User.deleteMany();
  const saltRounds = 10;
  const users = await User.insertMany([
    {
      username: "HaileyF",
      email: 'hfran7@yahoo.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: '',
      posts: [],
      friends: [],
    },
    {
      username: "Devin",
      email: 'devinhfran@gmail.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: '',
      posts: [],
      friends: [],
    },
    {
      username: "Clark",
      email: 'Clark@gmail.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: '',
      posts: [],
      friends: [],
    }
  ]);

  console.log('users seeded');

   //seed products

   await Product.deleteMany();

   const products = await Product.insertMany([
    {
      name: 'Wyatt',
      description:
        'Green laughing frog. Brand: Squishmallows. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/squishmallow-frog-wyatt.jpg',
      posts:[]
    },
    {
      name: 'Davie',
      description:
        'Plush Shark Toy. This ultra-squeezable, 12-inch, medium-sized plush stuffed toy is made with high-quality and ultrasoft materials. Brand: Squishmallows. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/squishmallow-shark-davie.jpg',
      posts:[]
    },
    {
      name: 'Arelux',
      description:
        'Funny design-The cute design is more convenient to embrace,with a lovely 3D small eyes and a mouth. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/stuffed-duck-Arelux.jpg',
      posts:[]
    },
    {
      name: 'Octo',
      description:
        'Super Cute Chunky Octopus Plushie. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/stuffed-octupus-Octo.jpg',
      posts:[]
    },
    {
      name: 'Jett',
      description:
        'Lambs & Ivy Jungle Safari Gray Plush Elephant Stuffed Animal Toy Plushie - Jett. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/stuffed-elephant.jpg',
      posts:[]
    },
    {
      name: 'Kitty',
      description:
        'Stuffed Animal Cat Plush Toy Anime Cute Kitten Kawaii Plushie Kitty. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/kawaii-cat.jpg',
      posts:[]
    },
    {
      name: 'Shiba Inu',
      description:
        'Auspicious beginning Stuffed Animal Shiba Inu Plush Toy Anime Corgi Kawaii Plush Dog. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/kawaii-shiba.jpg',
      posts:[]
    },
    {
      name: 'Spotted Seal',
      description:
        'Fluffy Banana Pose Spotted Seal Plush Pillow. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/pillow-walrus.jpg',
      posts:[]
    },
    {
      name: 'Kabosen',
      description: 'Kabosen My Melody Plush Keychain,5in/13Cm Plush Toy Plush Doll. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/keychain-kabosen.jpg',
      posts:[]
    },
    {
      name: 'Timothy',
      description:
        'A new collection of merch from "Team Timothy" is coming to the lifestyle brand GoodSmile Moment! Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/keychain-timothy.jpg',
      posts:[]
    },
    {
      name: 'Fuecoco',
      description:
        'Fuecoco Plush Key Chain. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/keychain-Fuecoco.jpg',
      posts:[]
    },
    {
      name: 'Curococo',
      description:
        'Corocoro Coronya Yellow Cat Plush Keychain. Condition: Like New',
      image: 'https://raw.githubusercontent.com/hfrancis7/PlushiNet/detailpage/client/public/images/keychain-Curococo.jpg',
      posts:[]
    }
   ]);
 
   console.log("products seeded");

  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      body: "I like it!",
      username: users[0].username,
      comments: [],
      likes: [],
      user: users[0]._id,
    },
    {
      body: "So cute!",
      username: users[0].username,
      comments: [],
      likes: [],
      user: users[0]._id,
    },
    {
      body: "This is awesome!",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "I need it!",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "I have that one!",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "I wish I had one...",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "Cool!",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "I like the color!",
      username: users[2].username,
      comments: [],
      likes: [],
      user: users[2]._id,
    },
    {
      body: "WOW!!!",
      username: users[2].username,
      comments: [],
      likes: [],
      user: users[2]._id,
    },
  ]);

  console.log("posts seeded");

  //add posts to user
  for (let i = 0; i < posts.length; i++) {
    await User.findByIdAndUpdate(posts[i].user._id, { $push: { posts: posts[i]._id } });
  }

  console.log("post relationship added to user");

  //add posts to product
  for(let i = 0; i < posts.length; i++){
    const randomProductIndex = Math.floor((Math.random() * products.length));
    await Product.findByIdAndUpdate(products[randomProductIndex]._id, { $push: { posts: posts[i]._id } });
  }

  console.log("post ids added to product array");



  await Comment.deleteMany();
  // const comments = await Comment.insertMany([
  //   {
  //     body: "That's so cool!",
  //     user: users[2],
  //     username: users[2].username,
  //     post: posts[0],
  //   },
  //   {
  //     body: "I like your plush!",
  //     user: users[1],
  //     username: users[1].username,
  //     post: posts[0],
  //   },
  //   {
  //     body: "Yay!",
  //     user: users[1],
  //     username: users[1].username,
  //     post: posts[1],
  //   },
  //   {
  //     body: "It's so cute!",
  //     user: users[2],
  //     username: users[2].username,
  //     post: posts[1],
  //   },
  //   {
  //     body: "You have good taste!",
  //     user: users[0],
  //     username: users[0].username,
  //     post: posts[2],
  //   },
  //   {
  //     body: "Aweee!!!",
  //     user: users[2],
  //     username: users[2].username,
  //     post: posts[2],
  //   }
  // ]);

  // for (let i = 0; i < comments.length; i++) {
  //   await Post.findByIdAndUpdate(comments[i].post._id, { $push: { comments: comments[i]._id } });
  // }

  //console.log("comments seeded");

 

  process.exit();
});
