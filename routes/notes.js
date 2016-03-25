var mongoose = require('mongoose');
var express = require('express');
var Note = mongoose.model('Note');
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
	Note.find( function (error, notes, count) {
		res.render('notes', {notes: notes });
	});
});

/* GET a specific Movie */
router.get('/:id', function (req, res) {
	Note.findById(req.params.id, function(err, note){
		res.render('note', { note: note});
	});
});

/* Edit a movie in mongoose */
router.post('/edit/:id', function(req, res){
	Note.findById( req.params.id, function(err, note){
		note.title = req.body.title; 
		note.description = req.body.description;
		note.upated_at = Date.now();
		note.save(function(error, note){
			res.redirect('/notes');
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
	new Notes({
		title: req.body.title ,
		description: req.body.description ,
		upated_at: Date.now()
	}).save( function(err, note){
		res.redirect('/notes');
	});
});

/* DELETE a movie */
// router.get('/delete/:name', function(req, res, next) {
//   redisClient.srem("movies", req.params.name);
//   res.redirect('/movies');
// });

/* DELETE a movie with mongoose */
router.post('/:id', function(req, res){
	Note.findById(req.params.id, function(err, note){
		note.remove(function(err, note){
			res.redirect('/notes');
		});
	});
});



















































module.exports = router;
