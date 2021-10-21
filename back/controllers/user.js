const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserToken = require('../../session/token');


const User = require('../models/user');

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
		isGoodPassword = await bcrypt.compare(req.body.password, user.password)
		//User not find or wrong password
		if (!user || !isGoodPassword) res.redirect('/connect')
		else {
			let userToken = jwt.sign(
				{ userId: user._id, isAdmin: user.isAdmin },
				`${process.env.TOKEN_SECRET}`,
				{ expiresIn: '6h' })
				UserToken.setToken(userToken)
			console.log(UserToken.getToken());
				res.redirect('/')
		}
	}
}

exports.disconnect = (req, res) => {
	UserToken.setToken("")
	res.redirect('/')
}