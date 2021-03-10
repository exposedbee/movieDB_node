const jwt_decode = require('jwt-decode');

const express = require('express');
const Router = express.Router();
const movieModel = require('../models/movieModel');

const userWatchModel = require('../models/userWatchModel');

Router.post('/add', (req, res) => {
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('user')) {
        userWatchModel.findOne({"movie_id": req.body.movie_id, "user_id": decoded.jti}, null, {})
            .then(
                newMovie => {
                    if (newMovie) {
                        userWatchModel.remove({_id: newMovie._id})
                            .exec();
                    }
                    const newWatch = new userWatchModel({
                        movie_id: req.body.movie_id,
                        user_id: decoded.jti
                    })
                    // console.log(newWatch);

                    newWatch.save()
                        .then(
                            newWatch => {
                                res.status(200).json(newWatch);
                            }
                        )
                        .catch(error => res.status(400).json(error));


                }
            )
            .catch(error => res.status(200).json(decoded));
    } else
        res.status(400).json({'message': 'User cannot access this feature'});

});


Router.get('/latestWatch', (req, res) => {
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('admin')) {
        var resultIDs = [];
        userWatchModel.find({'user_id': decoded.jti}, null, {limit: 10, sort: {'createdAt': -1}})
            .then(
                newMovie => {
                    newMovie.forEach(element => {
                        resultIDs.push(element.movie_id);
                    })
                    console.log(resultIDs);
                    movieModel.find({
                        "_id": {
                            "$in":
                            resultIDs
                        }
                    },null,{sort: {'watchTime': -1}})
                        .then(data => res.status(200).json(data))
                        .catch(error => res.status(200).json({'message': 'resultIDs'})
                        )
                }
            )
            .catch(error => console.log(error));

    } else
        res.status(400).json({'message': 'Admin access restriction'});

});

module.exports = Router;