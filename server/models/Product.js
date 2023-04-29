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
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Post"}]
    });

const Product = model('product', productSchema);

module.exports = Product;
