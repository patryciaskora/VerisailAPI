const sql = require("./db.js");

const Retailer = function(retailer){
    this.retailID = retailer.retailID
    this.name = retailer.name
    this.street = retailer.street
    this.city = retailer.city
    this.state = retailer.state
    this.zip = retailer.zip
}

Retailer.create = (newRetailer, result) => {
  sql.query("INSERT INTO retailers SET ?", newRetailer, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created retailer: ", { id: res.insertId, ...newRetailer});
    result(null, { id: res.insertId, ...newRetailer});
  });
};

Retailer.findById = (retailID, result) => {
  sql.query(`SELECT * FROM retailers WHERE retailID = ${retailID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found retailer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Retailer with the id
    result({ kind: "not_found" }, null);
  });
};

Retailer.getAll = result => {
    sql.query("SELECT * FROM retailers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("retailers: ", res);
      result(null, res);
    });
  };

 Retailer.updateById = (id, retailer, result) => {
    sql.query(
      "UPDATE retailers SET name = ?, street = ?, city = ?, state = ?, zip = ? WHERE retailID = ?",
      [retailer.name, retailer.street, retailer.city, retailer.state, retailer.zip, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Retailer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated retailer: ", { id: id, ...retailer});
        result(null, { id: id, ...retailer});
      }
    );
  };
  
  Retailer.remove = (id, result) => {
    sql.query("DELETE FROM retailers WHERE retailID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Retailer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted retailer with id: ", id);
      result(null, res);
    });
  };

  module.exports = Retailer;