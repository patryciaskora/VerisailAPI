const sql = require("./db.js");

const Distributor = function(distributor){
    this.distributorID = distributorID
    this.name = distributor.name
    this.street = distributor.street
    this.city = distributor.city
    this.state = distributor.state
    this.zip = distributor.zip
}

Distributor.create = (newDistributor, result) => {
  sql.query("INSERT INTO distributors SET ?", newDistributor, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created distributor: ", { id: res.insertId, ...newDistributor});
    result(null, { id: res.insertId, ...newDistributor});
  });
};

Distributor.findById = (distributorID, result) => {
  sql.query(`SELECT * FROM distributors WHERE distributorID = ${distributorID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found distributor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Distributor with the id
    result({ kind: "not_found" }, null);
  });
};

Distributor.getAll = result => {
    sql.query("SELECT * FROM distributors", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("distributors: ", res);
      result(null, res);
    });
  };

 Distributor.updateById = (id, distributor, result) => {
    sql.query(
      "UPDATE distributors SET name = ?, street = ?, street = ?, city = ?, state = ?, zip = ? WHERE manufacturerID = ?",
      [distributor.name, distributor.street, distributor.city, distributor.state, distributor.zip, id],
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
  
        console.log("updated distributor: ", { id: id, ...distributor });
        result(null, { id: id, ...distributor});
      }
    );
  };
  
  Distributor.remove = (id, result) => {
    sql.query("DELETE FROM distributors WHERE distributorID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Distributor with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted distributor with id: ", id);
      result(null, res);
    });
  };

  module.exports = Distributor;