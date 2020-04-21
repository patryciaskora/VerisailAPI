const sql = require("./db.js");

const User = function(user){
    this.userID = user.userID
    this.username = user.username
    this.password = user.password
    this.typeID = user.typeID
    this.crossrefID = user.crossrefID
}

User.create = (newUser, result) => {
  sql.query("call add_user(?,?,?,?)", newUser.email, newUser.password, newUser.typeID, newUser.crossrefID, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("called add_user successfully.");
    result(null, { id: res.insertId, ...newUser});
  });
};

User.findById = (userID, result) => {
  sql.query(`SELECT * FROM users WHERE userID = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };

 User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE users SET username = ?, password = ?, typeID = ?, crossrefID = ? WHERE inspectionID = ?",
      [user.username, user.password, user.typeID, user.crossrefID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user});
        result(null, { id: id, ...user});
      }
    );
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE userID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };

  module.exports = User;