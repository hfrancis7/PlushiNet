const bcrypt = require('bcrypt');

const db = require('./connection');
const { User, Post,  Comment, Product} = require('../models');

db.once('open', async () => {


  const products = await Product.insertMany([
    {
      name: 'Wyatt',
      description:
        'Green laughing frog. Brand: Squishmallows. Condition: Like New',
      image: 'squishmallow-frog-wyatt.jpg'
    },
    {
      name: 'Davie',
      description:
        'Plush Shark Toy. This ultra-squeezable, 12-inch, medium-sized plush stuffed toy is made with high-quality and ultrasoft materials. Brand: Squishmallows. Condition: Like New',
      image: 'squishmallow-shark-davie.jpg'
    },
    {
      name: 'Arelux',
      description:
        'Funny design-The cute design is more convenient to embrace,with a lovely 3D small eyes and a mouth. Condition: Like New',
      image: 'stuffed-duck-Arelux.jpg'
    },
    {
      name: 'Octo',
      description:
        'Super Cute Chunky Octopus Plushie. Condition: Like New',
      image: 'stuffed-octupus-Octo.jpg'
    },
    {
      name: 'Jett',
      description:
        'Lambs & Ivy Jungle Safari Gray Plush Elephant Stuffed Animal Toy Plushie - Jett. Condition: Like New',
      image: 'stuffed-elephant.jpg'
    },
    {
      name: 'Kitty',
      description:
        'Stuffed Animal Cat Plush Toy Anime Cute Kitten Kawaii Plushie Kitty. Condition: Like New',
      image: 'kawaii-cat.jpg'
    },
    {
      name: 'Shiba Inu',
      description:
        'Auspicious beginning Stuffed Animal Shiba Inu Plush Toy Anime Corgi Kawaii Plush Dog. Condition: Like New',
      image: 'kawaii-shiba.jpg'
    },
    {
      name: 'Spotted Seal',
      description:
        'Fluffy Banana Pose Spotted Seal Plush Pillow. Condition: Like New',
      image: 'pillow-walrus.jpg'
    },
    {
      name: 'Kabosen',
      description: 'Kabosen My Melody Plush Keychain,5in/13Cm Plush Toy Plush Doll. Condition: Like New',
      image: 'keychain-kabosen.jpg'
    },
    {
      name: 'Timothy',
      description:
        'A new collection of merch from "Team Timothy" is coming to the lifestyle brand GoodSmile Moment! Condition: Like New',
      image: 'keychain-timothy.jpg'
    },
    {
      name: 'Fuecoco',
      description:
        'Fuecoco Plush Key Chain. Condition: Like New',
      image: 'keychain-Fuecoco.jpg'
    },
    {
      name: 'Curococo',
      description:
        'Corocoro Coronya Yellow Cat Plush Keychain. Condition: Like New',
      image: 'keychain-Curococo.jpg'
    }
  ]);

  console.log('products seeded');


  await User.deleteMany();
  const saltRounds = 10;
  const users = await User.insertMany([
    {
      username: "HaileyF",
      email: 'hfran7@yahoo.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: 'https://res.cloudinary.com/dnatq7ekl/image/upload/v1682625316/zspyhlpvubnljzzfbat4.jpg',
      posts: [],
      friends: [],
    },
    {
      username: "Devin",
      email: 'devinhfran@gmail.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: 'https://res.cloudinary.com/dnatq7ekl/image/upload/v1681945403/cld-sample.jpg',
      posts: [],
      friends: [],
    },
    {
      username: "Clark",
      email: 'Clark@gmail.com',
      password: await bcrypt.hash("password17", saltRounds),
      profile_img: 'https://res.cloudinary.com/dnatq7ekl/image/upload/v1682627598/g6kmqbttporqbjylfpmw.jpg',
      posts: [],
      friends: [],
    }
  ]);

  console.log('users seeded');

  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      body: "Mr. Avocado",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682699646/plushiexample3_ks7pmx.jpg",
      username: users[0].username,
      comments: [],
      likes: [],
      user: users[0]._id,
    },
    {
      body: "Stumpy",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682699647/plushiexample4_qcfxkd.jpg",
      username: users[0].username,
      comments: [],
      likes: [],
      user: users[0]._id,
    },
    {
      body: "Ploosh",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682698361/plushiexample2_f1e6nt.jpg",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "Appletun",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700435/P7340_701-08890_01_akjups.jpg",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "White Kitty",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700435/51vsUSUP3EL._AC_UF894_1000_QL80__ekjffp.jpg",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "White Kitty",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700435/51vsUSUP3EL._AC_UF894_1000_QL80__ekjffp.jpg",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "Altaria",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700434/P9103_701-96785_01_bmh80z.jpg",
      username: users[1].username,
      comments: [],
      likes: [],
      user: users[1]._id,
    },
    {
      body: "Psyduck",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700434/P6684_701-06481_06_m11nox.jpg",
      username: users[2].username,
      comments: [],
      likes: [],
      user: users[2]._id,
    },
    {
      body: "Corgi Boi",
      image: "https://res.cloudinary.com/dnatq7ekl/image/upload/v1682700434/51Tahu98IiL_ffd5yu.jpg",
      username: users[2].username,
      comments: [],
      likes: [],
      user: users[2]._id,
    },
  ]);

  //add posts to user
  for(let i = 0; i < posts.length; i++){
    await User.findByIdAndUpdate(posts[i].user._id, {$push: {posts: posts[i]._id}});
  }
  
  console.log("posts seeded");

  const comments = await Comment.insertMany([
    {
      body: "That's so cool!",
      user: users[2],
      username: users[2].username,
      post: posts[0],
    },
    {
      body: "I like your plush!",
      user: users[1],
      username: users[1].username,
      post: posts[0],
    },
    {
      body: "Yay!",
      user: users[1],
      username: users[1].username,
      post: posts[1],
    },
    {
      body: "It's so cute!",
      user: users[2],
      username: users[2].username,
      post: posts[1],
    },
    {
      body: "You have good taste!",
      user: users[0],
      username: users[0].username,
      post: posts[2],
    },
    {
      body: "Aweee!!!",
      user: users[2],
      username: users[2].username,
      post: posts[2],
    }
  ])

  for(let i = 0; i < comments.length; i++){
    await Post.findByIdAndUpdate(comments[i].post._id, {$push: {comments: comments[i]._id}});
  }

  console.log("comments seeded");



  process.exit();
});
