var mongoose = require('mongoose');
var express = require('express');
var Note = mongoose.model('Note');
var router = express.Router();

/* Mongoose GET functin */
router.get('/', function(req, res){
	Note.find( function (error, notes, count) {
		res.render('notes', {notes: notes });
	});
});

/* GET a specific Note */
router.get('/:id', function (req, res) {
	Note.findById(req.params.id, function(err, note){
		res.render('note', { note: note});
	});
});

/* Edit a note in mongoose */
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


/* Mongoose POST function */
router.post('/', function(req, res){
	new Note({
		title: req.body.title ,
		description: req.body.description ,
		upated_at: Date.now()
	}).save( function(err, note){
		res.redirect('/notes');
	});
});

/* DELETE a note with mongoose */
router.post('/:id', function(req, res){
	Note.findById(req.params.id, function(err, note){
		note.remove(function(err, note){
			res.redirect('/notes');
		});
	});
});

// ===== Scroll to Top ==== 
// $ (window).scroll(function() {
//     if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
//         $('#return-to-top').fadeIn(200);    // Fade in the arrow
//     } else {
//         $('#return-to-top').fadeOut(200);   // Else fade out the arrow
//     }
// });
// $('#return-to-top').click(function() {      // When arrow is clicked
//     $('body,html').animate({
//         scrollTop : 0                       // Scroll to top of body
//     }, 500);
// });


















































module.exports = router;
