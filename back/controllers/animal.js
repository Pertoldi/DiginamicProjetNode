const Animal = require('../models/animal')
const fs = require('fs')

exports.create = async (req, res) => {
	let birthday
	if (req.body.birthday == "") birthday = "inconu"
	const animal = new Animal({
		name: req.body.name,
		sex: req.body.sex,
		type: req.body.name,
		content: req.body.content,
		sterilized: req.body.sterilized,
		puceNumber: req.body.puceNumber,
		birthday: birthday,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	})

	// Check unicity of the puceNumber
	const doExist = await Animal.findOne({ puceNumber: req.body.puceNumber })
	console.log('doExist is :', doExist)
	if (doExist == null) {// Mean it do not exist yet
		animal.save()
	} else {
		console.log('puceNumber already used !');//TODO un moyen de prévenir le front
	}
	res.redirect('/admin/animaux')
}

exports.delete = async (req, res) => {
	const id = req.params.id
	// We are looking for the imageUrl to delete it from the server
	const animal = await Animal.findById(id)
	const filename = animal.imageUrl.split('/images/')[1]
	fs.unlink(`images/${filename}`, () => {
		console.log('Image unlinked !');
	})
	// Now we can delete the animal from the server
	Animal.deleteOne({ _id: id })
		.then(() => { res.redirect('/admin/modifier-supprimer-animaux') })
		.catch((error) => { 
			console.error('An error occur during the suppression of the animal !');
			res.json({error})
		})
}

exports.update =  async (req, res) => {
	
}