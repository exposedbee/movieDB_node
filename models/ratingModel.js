const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
        rating: {
            type: String,
            required: true
        },
        commentTitle: {
            type: String
        },
        commentContent: {
            type: String
        },
        movie_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: {
            createdAt: 'createdAt'
        }
    }
    )
;

module.exports = mongoose.model('ratings', ratingSchema);