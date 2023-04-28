const db = require('./connection');
const { User, Product } = require('../models');

db.once('open', async () => {

  await Product.deleteMany();

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

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    products: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
