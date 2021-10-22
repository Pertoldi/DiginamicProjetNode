const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const path = require('path')

const frontRoutes = require('./front/routes/routes')
const userRoutes = require('./back/routes/user')
const animalRoutes = require('./back/routes/animal')


//Note: As long as it not an http server I will store my token on a class. Because I cannot store it on localStorage, then on the Authorisation: Bearer <token>
const UserToken = require('./session/token')

// Init app
const app = express()
// revoie un port valide sous forme de numéro ou chaine
const normalizePort = val => {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}
const port = normalizePort(process.env.PORT || '3000')

// Security
app.use(helmet())

// Ressources statics
app.use(express.static(path.join(__dirname, 'front/public'))) //path.join will normalize the path separator character and will return correct path value. Like this it work for windaub and Unix distribution
app.use('/images', express.static(path.join(__dirname, 'images/')))

// ejs
app.set('views', './front/views')
app.set('view engine', 'ejs')

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connexion a mongoDB
mongoose.connect(`mongodb://localhost:27017/LaPetiteNiche?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`, { useNewUrlParser: true })
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'))


app.use('/', frontRoutes)
app.use('/api/user', userRoutes)
app.use('/api/animal', animalRoutes)


app.get('*', function (req, res) {
	res.redirect('/')
})



app.listen(port, () => {
	console.log(`App Express listening on http://localhost:${port}`)
})
