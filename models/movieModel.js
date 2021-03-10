const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        category: [
            {type: String}
        ],
        releaseDate: {
            type: Date,
            format : "DD-MM-YYYY",
            default: Date.now
        },
        movieDirector: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: {
            createdAt: 'createdAt'
        }
    }
    )
;

module.exports = mongoose.model('movies', movieSchema);