//just a schema
const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        readtionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: date => new Date(date).toLocaleString(),
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;