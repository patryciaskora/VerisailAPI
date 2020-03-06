const sql = require("./db.js");

const BoatOwner = function(boatOwner){
    this.ownerID = boatOwner.ownerID
    this.fName = boatOwner.fName
    this.lName = boatOwner.lName
    this.phone = boatOwner.phone
    this.email = boatOwner.email
    this.userID = boatOwner.userID
}

BoatOwner.create = (newBoatOwner, result) => {
  sql.query("INSERT INTO boat_owners SET ?", newBoatOwner, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created boat owner: ", { id: res.insertId, ...newBoatOwner});
    result(null, { id: res.insertId, ...newBoatOwner});
  });
};

BoatOwner.findById = (ownerID, result) => {
  sql.query(`SELECT * FROM boat_owners WHERE ownerID = ${ownerID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found boat owner: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Boat with the id
    result({ kind: "not_found" }, null);
  });
};

BoatOwner.getAll = result => {
    sql.query("SELECT * FROM boat_owners", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("boat owners: ", res);
      result(null, res);
    });
  };

 BoatOwner.updateById = (id, boatOwner, result) => {
    sql.query(
      "UPDATE boat_owners SET fName = ?, lName = ?, phone = ?, email = ?, userID = ? WHERE ownerID = ?",
      [boatOwner.fName, boatOwner.lName, boatOwner.phone, boatOwner.email, boatOwner.userID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Boat Owner with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated boat: ", { id: id, ...boatOwner });
        result(null, { id: id, ...boatOwner});
      }
    );
  };
  
  BoatOwner.remove = (id, result) => {
    sql.query("DELETE FROM boat_owners WHERE ownerID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Boat Owner with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted boat owner with id: ", id);
      result(null, res);
    });
  };

  module.exports = BoatOwner;