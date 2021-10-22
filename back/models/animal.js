const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const animalSchema = mongoose.Schema({
	name: { type: String, require: true },
	sex: { type: String, require: true },
	type: { type: String, require: true },
	content: { type: String, require: true },
	sterilized: { type: Boolean, require: true },
	puceNumber: { type: String, require: true, unique: true },
	birthday: { type: String },
	imageUrl: { type: String, require: true }
})

animalSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Animal', animalSchema)
//TODO refactor: replace models'sdirectory at the racine to be more logic with front routes
