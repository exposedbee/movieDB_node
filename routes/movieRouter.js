const jwt_decode = require('jwt-decode');

const express = require('express');
const Router = express.Router();

const movieModel = require('../models/movieModel');


//get latest movies (10)
Router.get('/latest', (req, res) => {
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('user')) {

        movieModel.find({},null,{limit:10, sort:{'releaseDate': -1}})
            .then(
                newMovie => {
                    res.status(200).json(newMovie);
                }
            )
            .catch(error => console.log(error));
    } else
        res.status(400).json({'message': 'not created'});

});

//get 10 random movies
Router.get('/random',(req,res)=>{
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('user')) {

        movieModel.aggregate([{$sample:{size:10}}])
            .then(result=>
                res.status(200).json(result)
            )
    } else
        res.status(400).json({'message': 'not created'});
});


//Create a new Movie
Router.get('/create', (req, res) => {
    var decoded = jwt_decode(req.headers.token);
    if (decoded.aud.includes('admin')) {
        try {
            data = req.body
            const newMovie = new movieModel(data);
            console.log(newMovie);
            newMovie.save()
                .then(
                    newMovie => {
                        res.status(200).json(newMovie);
                    }
                )
                .catch(error => res.status(400).json(error));
            console.log(newMovie);
        } catch (error) {
            res.status(400).json({'message': 'data error'});
        }
    } else
        res.status(400).json({'message': 'Admin access restriction'});

});


module.exports = Router;