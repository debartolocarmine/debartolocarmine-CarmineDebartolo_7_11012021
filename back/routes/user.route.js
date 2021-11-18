// LIB
const express = require("express");
const router = express.Router()
// Controleur
const userCtrl = require("../controllers/user.controller");
// Controle permission des utilisateurs
const auth = require("../middleware/auth.middleware");
// validator
const password_validator = require("../middleware/validator.password.middelware");
const email_validator = require("../middleware/validator.email.middelware");
// ROUTE
// Enregistre un UTILISATEUR
router.post("/sign-up", password_validator, email_validator, userCtrl.signup);
// Connecte un UTILISATEUR
router.post("/login", userCtrl.login);
// Deconnecte un UTILISATEUR
router.get("/profile/:username", userCtrl.profile);
// Mettre à jour un UTILISATEUR
router.post("/profile/:username/edition", userCtrl.updateOneUser);
// Deconnecte un UTILISATEUR
router.get("/deconnexion", userCtrl.logout);
// requete tous les UTILISATEURS
router.get("/all-users", userCtrl.loadAllUser);
// Mettre à jour un UTILISATEUR
// router.post("/update-user", userCtrl.updateOneUser);
// Supprimer un UTILISATEUR
router.post("/desactive", userCtrl.desactiveOneUser);
module.exports = router;

