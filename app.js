const express = require('express')
const mongoose = require('mongoose');
const helmet = require('helmet');

const frontRoutes = require('./front/routes/routes')

// Init app
const app = express();
// revoie un port valide sous forme de numéro ou chaine
const normalizePort = val => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
const port = normalizePort(process.env.PORT || '3000');

// Security
app.use(helmet())

// Ressources statics
app.use(express.static('front/public'))

// ejs
app.set('views', './front/views')
app.set('view engine', 'ejs')

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connexion a mongoDB
mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`, { useNewUrlParser: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use('/' , frontRoutes)


app.listen(port, () => {
	console.log(`App Express listening on http://localhost:${port}`);
})
