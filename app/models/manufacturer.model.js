const sql = require("./db.js");

const Manufacturer = function(manufacturer){
    this.manufacturerID = manufacturer.manufacturerID
    this.manuName = manufacturer.manuName
    this.street = manufacturer.street
    this.city = manufacturer.city
    this.state = manufacturer.state
    this.zip = manufacturer.zip
    this.userID = manufacturer.userID
}

Manufacturer.create = (newManufacturer, result) => {
  sql.query("INSERT INTO manufacturers SET ?", newManufacturer, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created manufacturer: ", { id: res.insertId, ...newManufacturer});
    result(null, { id: res.insertId, ...newManufacturer});
  });
};

Manufacturer.findById = (manufacturerID, result) => {
  sql.query(`SELECT * FROM manufacturers WHERE manufacturerID = ${manufacturerID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found manufacturer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Manufacturer with the id
    result({ kind: "not_found" }, null);
  });
};

Manufacturer.findByName = (manuName, result) => {
  sql.query(`SELECT * FROM manufacturers WHERE manuName = "${manuName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found manufacturer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Manufacturer with the id
    result({ kind: "not_found" }, null);
  });
};

Manufacturer.getAll = result => {
    sql.query("SELECT * FROM manufacturers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("manufacturers: ", res);
      result(null, res);
    });
  };

 Manufacturer.updateById = (id, manufacturer, result) => {
    sql.query(
      "UPDATE manufacturers SET manuName = ?, street = ?, city = ?, state = ?, zip = ?, userID = ? WHERE manufacturerID = ?",
      [manufacturer.manuName, manufacturer.street, manufacturer.city, manufacturer.state, manufacturer.zip, manufacturer.userID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Manufacturer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated manufacturer: ", { id: id, ...manufacturer });
        result(null, { id: id, ...manufacturer});
      }
    );
  };
  
  Manufacturer.remove = (id, result) => {
    sql.query("DELETE FROM manufacturers WHERE manufacturerID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Manufacturer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Manufacturer with id: ", id);
      result(null, res);
    });
  };

  module.exports = Manufacturer;