const mongoose = require('mongoose');

const userWatchSchema = new mongoose.Schema({
        movie_id: {
            type: String,
            required: true
        },
        user_id:
            {type: String,
            required: true},
        watchTime: {
            type: Date,
            format : "DD-MM-YYYY",
            default: Date.now
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

module.exports = mongoose.model('watchList', userWatchSchema);