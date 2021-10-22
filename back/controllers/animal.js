const Animal = require('../models/animal')
const fs = require('fs')

exports.create = async (req, res) => {
	let birthday = req.body.birthday
	if (birthday == "" || !!birthday == false) birthday = "inconnu"

	const name = req.body.name
	const sex = req.body.sex
	const type = req.body.type
	const content = req.body.content
	const sterilized = req.body.sterilized
	const puceNumber = req.body.puceNumber
	const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	try {
		// Simple control Form; Can be more effective with regex
		if (name && sex && type && content && sterilized && puceNumber && imageUrl) {
			const animal = new Animal({
				name,
				sex,
				type,
				content,
				sterilized,
				puceNumber,
				birthday,
				imageUrl
			})
			// Check unicity of the puceNumber
			const doExist = await Animal.findOne({ puceNumber: req.body.puceNumber })
			if (doExist == null) {// Mean it do not exist yet
				animal.save()
			} else {
				console.error('puceNumber already used !');//TODO un moyen de prévenir le front
			}
		} else {
			console.error('An error occur with the form !');
		}
	} catch (error) {
		console.error('An error occur !', error);
	}
	res.redirect('/animaux')

}

exports.delete = async (req, res) => {
	try {
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
				res.json({ error })
			})
	} catch (error) {
		console.error('An error occur !', error);
	}
}

exports.update = async (req, res) => {
	// Tow posibilities: update with an image or without
	const id = req.params.id
	const name = req.body.name
	const sex = req.body.sex
	const type = req.body.type
	const content = req.body.content
	const sterilized = req.body.sterilized
	const puceNumber = req.body.puceNumber
	const birthday = req.body.birthday

	try {
		// Simple control Form; Can be more effective with regex
		if (name && sex && type && content && sterilized && puceNumber) {
			if (!!req.file) {// First case: with an image we need to unlink the iamge before save the new one
				const oldAnimal = await Animal.findById(id)
				const oldImage = oldAnimal.imageUrl.split('/images/')[1]
				fs.unlink(`images/${oldImage}`, (error) => {
					if (error) throw error;
					console.log('Old image unlinked !');
				})
				const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
				const animal = {
					name,
					sex,
					type,
					content,
					sterilized,
					puceNumber,
					birthday,
					imageUrl
				}
				Animal.updateOne({ _id: id }, animal).then(() => { console.log('animal updated !'); })
			} else {//Second case: without an image
				// We cannot use new Animal. If we still do, the mongoose model will create a new _id; we still can crush it with "_id: id"
				const animal = {
					name,
					sex,
					type,
					content,
					sterilized,
					puceNumber,
					birthday
				}
				Animal.updateOne({ _id: id }, animal).then(() => { console.log('animal updated !'); })
			}
		}

	} catch (error) {
		console.error('An error occur !', error);
	}
	res.redirect('/admin/modifier-supprimer-animaux')
}