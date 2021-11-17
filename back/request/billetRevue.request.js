const sql = require("../middleware/db.middleware");
const fs = require('fs');

// constructor
const Billet = function(billet) {
  this.titre = billet.titre;
  // this.description = billet.description;
  this.uid = billet.uid;
  this.artwork = billet.artwork;
};

// getAllBillets()
Billet.getAllBillets = result => {
  // Query pour selectionner les billets
  let qur = "SELECT br.titre, br.bid, br.video, br.created, br.updated, br.artwork, br.uid, u.username, u.uid, u.nom, u.prenom FROM billet_de_revue br LEFT JOIN users u ON (br.uid = u.uid) ORDER BY br.bid DESC"
  // Opération
  sql.query(qur, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });

};

// getOneBilletById()
Billet.getOneBilletById = (bid, result) => {
  // Query pour selectionner un billet
  let one = `SELECT br.titre, br.bid, br.video, br.uid, br.path, br.artwork, u.username, u.uid, u.nom, u.prenom FROM billet_de_revue br LEFT JOIN users u ON (br.uid = u.uid) WHERE br.bid = ${bid}`
  // Opération
  sql.query(one, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });

};

// createOneBillet()
Billet.createOneBillet = (one, result) => {
  if (one) {
    // Query ppour ajouter un billet
    let sql_query = "INSERT INTO billet_de_revue SET ?";
    // Opération
    sql.query(sql_query, one, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log(res)
      result(null, { bid: res.insertId, ...one });
    });
  }
};

// updateOneBillet()
Billet.updateOneBillet = (data, result) => {
  if (data) {
    // Query pour mettre a jour le billet
    let sql_query = `UPDATE billet_de_revue SET ? WHERE bid =${data.bid}`;
    // Opération
    sql.query(sql_query, data.one, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log(res)
      result(null, { bid: data.bid, ...data.one });
    });
  }
};

// deleteOneBillet()
Billet.deleteOneBillet = (data, result) => {
  console.log(data.bid)
  if (data.bid) {
    // Query pour supprimer le billet
    let sql_query = `DELETE FROM billet_de_revue WHERE bid = ?`;
    // Query pour supprimer les reactions du billet
    let sql_query_reactions = `DELETE FROM reactions WHERE bid = ?`;
    // Opération
    sql.query(`${sql_query};${sql_query_reactions}`, [data.bid, data.bid], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { bid: data.bid });
    });

  }

};

module.exports = Billet;