// LIB
const express = require("express");
const router = express.Router();
// IMAGE
const download = require("../middleware/multer.middleware");
// Controleur
const billetCtrl = require("../controllers/billetRevue.controller");
// CONTROLE PERMISSION UTILISATEUR
const auth = require("../middleware/auth.middleware");
// ROUTE
// GET ALL BILLETS
router.get("/", auth, billetCtrl.findAll);
// GET ONE BILLET
router.get('/:bid', auth, billetCtrl.findOne);
// Crée un BILLET
router.post("/", auth, download.single("billets_img"), billetCtrl.createOneBillet);
// Met à jour un BILLET
router.put("/:bid", auth, download.single("billets_img"), billetCtrl.updateOneBillet)
// Supprimer un BILLET
router.delete("/:bid", auth, billetCtrl.deleteOneBillet)
// -------------
router.get('/categorie/:name', auth, billetCtrl.findCategorie);
// EXPORT ROUTE
module.exports = router;