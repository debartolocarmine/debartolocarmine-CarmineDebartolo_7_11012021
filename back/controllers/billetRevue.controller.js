const Billet = require("../request/billetRevue.request");
const db = require("../middleware/db.middleware");
// TOOLS
const slugify = require('../utils/slugify.utils');
const uuid = require('../utils/uid.utils');
// findAll
exports.findAll = (req, res) => {

  // getAllBillets
  Billet.getAllBillets((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving article."
      });
    else {
      res.send(data);
    }
  });

};

// findOne
exports.findOne = (req, res) => {

  // getOneBilletById
  Billet.getOneBilletById(req.params.bid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found article with id ${req.params.bid}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving article with id ${req.params.bid}.`
        });
      }
    } else res.send(data);
  });

};

// createOne
exports.createOneBillet = (req, res) => {

  let billet = {
    artwork: req.file ? req.file.filename : null,
    uid: uuid(req.headers),
    path: slugify(req.body.titre).substring(0, 100),
    video: req.body.video ? req.body.video : null,
    titre: req.body.titre,
  }

  // let categories_new = req.body.categories_new ? JSON.parse(req.body.categories_new) : null;
  // let categories_current = req.body.categories_current ? JSON.parse(req.body.categories_current) : null;
  // let post = { one : billet, categories_new, categories_current };

  // createOneBillet
  Billet.createOneBillet(billet, (err, data) => {

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found article with id ${req.body.titre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving article with id ${req.body.titre}.`
        });
      }
    } else {
      res.send(data);
    }
    
  });

};

// updateOne
exports.updateOneBillet = (req, res) => {

  const { bid } = req.params;

  let billetToUpdate = {
    one: {
      ...req.body,
      artwork: req.file ? req.file.filename : (req.body.artwork ? req.body.artwork : null),
      path: slugify(req.body.titre),
    },
    bid
  }
  // updateOneBillet
  Billet.updateOneBillet(billetToUpdate, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found article with id ${req.body.titre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving article with id ${req.body.titre}.`
        });
      }
    } else res.send(data);
  });

};

// deleteOne
exports.deleteOneBillet = (req, res) => {

  const { billet } = req.body;

  if (billet) {
    console.log(billet)
    // updateOneBillet
    Billet.deleteOneBillet(billet, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found article with id ${billet.titre}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving article with id ${billet.titre}.`
          });
        }
      } else res.send({msg : `Le billet ${billet.titre} a été supprimé.`});
    });
  }
  

};

// likeOneBillet
exports.likeOneBillet = (req, res) => {};

// dislikeOneBillet
exports.dislikeOneBillet = (req, res) => {};

// findCategorie
exports.findCategorie = (req, res) => {

  const { name } = req.params;
  const tags_to_find = `SELECT nom, cid, icon FROM categories WHERE nom LIKE '%${name}%';`;

  db.query(tags_to_find, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });

};