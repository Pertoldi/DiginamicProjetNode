const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const animalSchema = mongoose.Schema({
	name: { type: String, require: true },
	sex: { type: String, require: true },
	type: { type: String, require: true },
	castrated: { type: Boolean, require: true },
	puceNumber: { type: String, require: true, unique: true },
	birthday: { type: String }
})

animalSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Animal', animalSchema)
