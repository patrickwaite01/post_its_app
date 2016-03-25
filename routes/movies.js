var mongoose = require('mongoose');
var express = require('express');
var Movie = mongoose.model('Movie');
var router = express.Router();

/* GET movie listings. */
// router.get('/', function(req, res, next) {
//   redisClient.smembers("movies", function (err, movies) {
//     res.locals.movies = movies ? movies : [];
//     res.render('movies');
//   });
// });

/* Mongoose GET functin */
router.get('/', function(req, res){
	Movie.find( function (error, movies, count) {
		res.render('movies', {movies: movies });
	});
});

/* GET a specific Movie */
router.get('/:id', function (req, res) {
	Movie.findById(req.params.id, function(err, movie){
		res.render('movie', { movie: movie});
	});
});

/* Edit a movie in mongoose */
router.post('/edit/:id', function(req, res){
	Movie.findById( req.params.id, function(err, movie){
		movie.title = req.body.title; 
		movie.description = req.body.description;
		movie.upated_at = Date.now();
		movie.save(function(error, movie){
			res.redirect('/movies');
		});
	});
});

/* Easier way to updatea movie
Movie.update({ _id: req.params.id}, {$set {title: req.body }})

OR

Movie.findByIdAndUpdate(req.params.id, {set: { title: }} function(err, movie){
	res.render('/movie', movie);
}); */

/* POST add movie. */
// router.post('/', function(req, res, next) {
//   redisClient.sadd("movies", req.body.name);
//   res.redirect('/movies');
// });

/* Mongoose POST function */
router.post('/', function(req, res){
	new Movie({
		title: req.body.title ,
		description: req.body.description ,
		upated_at: Date.now()
	}).save( function(err, movie){
		res.redirect('/movies');
	});
});

/* DELETE a movie */
// router.get('/delete/:name', function(req, res, next) {
//   redisClient.srem("movies", req.params.name);
//   res.redirect('/movies');
// });

/* DELETE a movie with mongoose */
router.post('/:id', function(req, res){
	Movie.findById(req.params.id, function(err, movie){
		movie.remove(function(err, movie){
			res.redirect('/movies');
		});
	});
});



















































module.exports = router;
