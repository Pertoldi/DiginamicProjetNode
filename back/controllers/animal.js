const Animal = require('../models/animal')

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