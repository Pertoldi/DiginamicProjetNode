const multer = require('multer');       //multer permet de gérer les fichiers entrants // multer ajoute une propriété req.file
const fs = require('fs')

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpeg",
	"image/png": "png"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
		let dir = 'images'
		if (!fs.existsSync(dir)) {fs.mkdir(dir)} //cette ligne ne marche pas. piste: need to be ("/" + dir) //TODO if I got time
		callback(null, dir)
    },
    filename: (req, file, callback) => {
		 
        const name = file.originalname.split('.')[0].split(' ').join('_'); 
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extention);     //le nouveau filename avec le nom sans espace + un timestamp(pour sassurer que le nom est unique à la miliseconde près) + . et l'extention
    }
});

module.exports = multer({ storage }).single('file'); //ajoute la propriété file à l'obj req;Le nom doit être le même que celui de l'input de l'image; .single -> que pour une image sinon .multiple -> buffer d'image