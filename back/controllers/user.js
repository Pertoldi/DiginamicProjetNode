const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.connect = (req, res) => {

}

exports.create = async (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const email = req.body.email
	const password = req.body.password

	//simple form control
	if (firstName && lastName && email && password) {
		//Check email pattern
		if (email.split('@').length == 2 && email.split('@')[1].split('.').length == 2) {
			// Check password confirmation
			if (password[0] === password[1]) {

				const user = new User({
					firstName,
					lastName,
					email,
					password: await bcrypt.hash(password[0], 10),
					isAdmin: false
				})
				console.log(user);
				user.save()
				res.redirect('/')

			}
		}
	} else {
		res.redirect('/connect')
	}
}

exports.connect = async (req, res) => {
	const email = req.body.email
	const password = req.body.password
	//simple form control
	if (email && password) {
		const user = await User.findOne({ email: req.body.email })
		if (!user) return console.log('User not find !');//Utilisateur non trouvé
		isGoodPassword = await bcrypt.compare(req.body.password, user.password)
		if (!isGoodPassword) return console.log('Password incorect !');
		res.status(200).json({
			userId: user._id,
			token: jwt.sign(
				{ userId: user._id },
				`${process.env.TOKEN_SECRET}`,
				{ expiresIn: '6h' }
			)
		});
	}
}