const sql = require("../middleware/db.middleware");

// constructor
const User = function(user) {
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.email = user.email;
  this.password = user.password;
  this.username = user.username;
  this.portrait = user.portrait;
};

User.signUpUser = (userData, result) => {

  if (userData) {

    let sql_query = "INSERT INTO users SET ?";
    sql.query(sql_query, userData, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
  
      result(null, { id: res.insertId, ...userData });
    });

  }

};

User.findOne = (credential, result) => {
  sql.query('SELECT * FROM users WHERE email = ?', [credential.email], (err, res) => {

    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);

  });
};

User.getAll = (result) => {

  sql.query('SELECT uid, username, biographie, nom, prenom, roles, status, created, portrait FROM users', (err, res) => {

    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);

  });

};

User.getOne = (username, result) => {
  sql.query('SELECT uid, username, biographie, nom, prenom, roles, status, portrait, created FROM users WHERE username = ?', [username], (err, res) => {

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

User.updateOne = (credential, result) => {};

User.desactivateOne = (credential, result) => {};

module.exports = User;