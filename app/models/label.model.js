const sql = require("./db.js");

const Label = function(label){
    this.QRcode= label.QRcode
    this.partID = label.partID
    this.statusID = label.statusID
    this.current_owner_id = label.current_owner_id
    this.ownership_date = label.ownership_date
    this.boatID = label.boatID
}

Label.create = (newLabel, result) => {
  sql.query("INSERT INTO labels SET ?", newLabel, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created label: ", { id: res.insertId, ...newLabel});
    result(null, { id: res.insertId, ...newLabel});
  });
};

Label.findById = (QRcode, result) => {
  sql.query(`SELECT * FROM labels WHERE QRcode = ${QRcode}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found label: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Label with the id
    result({ kind: "not_found" }, null);
  });
};

Label.getAll = result => {
    sql.query("SELECT * FROM labels", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("labels: ", res);
      result(null, res);
    });
  };

 Label.updateById = (id, label, result) => {
    sql.query(
      "UPDATE labels boatID = ?, current_owner_id = ?, statusID = ?, ownership_date = ?, partID = ? WHERE QRcode = ?",
      [label.boatID, label.current_owner_id, label.statusID, label.ownership_date, label.partID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Label with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated label: ", { id: id, ...label});
        result(null, { id: id, ...label});
      }
    );
  };
  
  Label.remove = (id, result) => {
    sql.query("DELETE FROM labels WHERE QRcode = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Label with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted label with id: ", id);
      result(null, res);
    });
  };

  module.exports = Label;