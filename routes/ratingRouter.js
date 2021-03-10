const jwt_decode = require('jwt-decode');

const express = require('express');
const Router = express.Router();

const ratingModel = require('../models/ratingModel');


//Rate a movie (adding a new rating)
Router.post('/add', (req, res) => {
    //token decoding
    var decoded = jwt_decode(req.headers.token);

//user validation
    if (decoded.aud.includes('user')) {

        const data = req.body;
        ratingModel.findOne({"movie_id": data.movie_id, "user_id": decoded.jti}, null, {})
            .then(
                rating => {
                    if (rating) {
                        ratingModel.remove({_id: rating._id})
                            .exec();
                    }
                    //data transfering from req.body
                    const newRating = new ratingModel({
                        rating: data.rating,
                        commentTitle: decoded.sub,
                        commentContent: data.commentContent,
                        movie_id: data.movie_id,
                        user_id: decoded.jti,
                    })

                    //creating a new rating for
                    newRating.save()
                        .then(result =>
                            res.status(200).json(result))
                        .catch(error => res.status(200).json({'message': 'not created'})
                        )

                }
            )
            .catch(error => res.status(200).json(error));
    } else
        res.status(400).json({'message': 'not created'});
})

Router.post('/getOneByMovie', (req, res) => {
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('user')) {
        const data = req.body;
        console.log(data);


        //creating a new rating for
        ratingModel.findOne({movie_id: data.movie_id, user_id: decoded.jti})
            .then(result =>
                res.status(200).json(result))
            .catch(error => res.status(200).json({'message': 'not created'})
            )

    } else
        res.status(400).json({'message': 'not created'});
});

module.exports = Router;