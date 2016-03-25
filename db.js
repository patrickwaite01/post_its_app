var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema ({
	title : {type: String, required: true},
	description : {type: String, required: true},
	updated_at : Date
});

//REGEX FOR VALIDATING USER INPUTS
// var User = new Schema(
// 	{phone:
// 		{ type: String,
// 			validate: {
// 					validator: function(v) {
// 						return /\d{3}-\d{3}-\d{4}/.test(v);
// 					},
// 					message: '{VALUE} is not a vaild phone number';
// 				}			
// 			}
// 		}
// );

mongoose.model('Note', Note);
mongoose.connect('mongodb://localhost/post_it_app');
