const sql = require("./db.js");

const Boat = function(boat){
    this.boatID = boat.boatID
    this.boatName = boat.boatName
    this.phone = boat.phone
    this.countryOfOrigin = boat.countryOfOrigin
    this.ownerID = boat.ownerID
}

Boat.create = (newBoat, result) => {
  sql.query("INSERT INTO boats SET ?", newBoat, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created boat: ", { id: res.insertId, ...newBoat});
    result(null, { id: res.insertId, ...newBoat});
  });
};

Boat.findById = (boatID, result) => {
  sql.query(`SELECT * FROM boats WHERE boatID = ${boatID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found boat: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Boat with the id
    result({ kind: "not_found" }, null);
  });
};

Boat.getAll = result => {
    sql.query("SELECT * FROM boats", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("boats: ", res);
      result(null, res);
    });
  };

 Boat.updateById = (id, boat, result) => {
    sql.query(
      "UPDATE boats SET countryOfOrigin = ?, boatName = ?, phone = ?, ownerID = ? WHERE boatID = ?",
      [boat.countryOfOrigin, boat.boatName, boat.phone, boat.ownerID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Boat with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated boat: ", { id: id, ...boat });
        result(null, { id: id, ...boat});
      }
    );
  };
  
  Boat.remove = (id, result) => {
    sql.query("DELETE FROM boats WHERE boatID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Boat with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted boat with id: ", id);
      result(null, res);
    });
  };

  module.exports = Boat;