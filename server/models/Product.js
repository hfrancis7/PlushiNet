const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        }
    });

const Product = model('product', productSchema);

module.exports = Product;
