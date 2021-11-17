const multer = require('multer');
const slugify = require('../utils/slugify.utils');
//constante dictionnaire de type MIME pour résoudre l'extension de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};
//nous créons une constante storage , à passer à multer comme configuration,
// qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants. 
const storage = multer.diskStorage({
  // la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images. 
  destination: (req, file, cb) => {
    if (file.fieldname === "billets_img") cb (null, "./images/billets/");
    else if (file.fieldname === "portraits") cb (null, "./images/portraits/");
  },
  //la fonction filename indique à multer d'utiliser le nom d'origine, 
  //de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.
  // Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
  filename: (req, file, callback) => {
    // callback(null, Date.now() + path.extname(file.originalname));
    const name = file.originalname.split('.');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, slugify(name[0]) + '-'+ Date.now() + '.' + extension);
  },
});

const download = multer({storage: storage});
//nous exportons ensuite l'élément multer entièrement configuré,
// lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
module.exports = download
