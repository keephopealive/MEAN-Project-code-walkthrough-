const path = require('path');

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// ============ Static Routes ============ 
app.use(express.static(path.join(__dirname, "angular-app-movie-exam/dist/angular-app-movie-exam")));

// ============ Mongoose ============ 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/movies_db")

const RatingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: [2, "Title must exist."],
        required: [true, "Title must exist."]
    },
    star: { 
        type: Number, 
        required: [true, "Star must exist."]
    },
    review: { 
        type: String, 
        minlength: [3, "Title must exist."],
        required: [true, "Title must exist."]
    }
}, { timestamps: true });

const MovieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minlength: [3, "Title must be at least 3 characters long."],
        required: [true, "Title must exist."]
    },
    reviews: [RatingSchema]
}, { timestamps: true });

const Movie = mongoose.model('Movie', MovieSchema);
const Rating = mongoose.model('Rating', RatingSchema);


// ============ Routes ============ 
app.post('/api/movies', function (req, res) {
    console.log("SERVER > POST /api/movies, req.body", req.body);
    Movie.create({title: req.body.title}, function(err, newMovie){
        if(err){
            console.log("@@@@@@@@ ERROR FAILED - 1")
            res.json({
                status: false,
                err: err
            })
        } else {
            Rating.create({ name: req.body.name, star: req.body.star, review: req.body.review}, function(err, newRating){
                if (err){ 
                    console.log("@@@@@@@@ ERROR FAILED - 2")
                    res.json({
                        status: false,
                        err: err
                    })
                } else {
                    newMovie.reviews.push(newRating);
                    newMovie.save(function(err){
                        if(err){
                            console.log("@@@@@@@@ ERROR FAILED - 3")
                        } else {
                            res.json({
                                status: true
                            })
                        }
                    })
                }
            })
        }
    })
})

app.get("/api/movies", function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            res.json({
                status: false,
                err: err
            })
        } else {
            res.json({
                status: true,
                movies: movies
            })
        }
    })
})

app.get("/api/movies/:id", function(req, res){
    Movie.findOne({_id: req.params.id}, function(err, movie){
        console.log(movie);
        console.log(movie.reviews);
        res.json({
            status: true,
            ratings: movie.reviews
        })
    })
})

app.post("/api/ratings/:id", function(req, res){
    req.params.id
    req.body
    console.log("req.params.id", req.params.id)
    console.log("req.body", req.body)
    Movie.findOne({_id: req.params.id}, function(err, movie){
        Rating.create(req.body, function(err, rating){
            if(err){
                res.json({
                    status: false,
                    err: err
                })
            } else {
                movie.reviews.push(rating);
                movie.save(function(err){
                    res.json({
                        status: true
                    })
                })
            }
        })
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-app-movie-exam/dist/angular-app-movie-exam/index.html"))
});

// ============ Server ============ 
app.listen(8001);