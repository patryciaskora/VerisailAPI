const sql = require("./db.js");

const Part = function(part){
    this.partType = part.partType
    this.manufacturerID = part.manufacturerID
    this.partPrefix = part.partPrefix
    this.partID = part.partID
}

Part.create = (newPart, result) => {
  sql.query("INSERT INTO parts SET ?", newPart, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created part: ", { id: res.insertId, ...newPart});
    result(null, { id: res.insertId, ...newPart});
  });
};

Part.findById = (partID, result) => {
  sql.query(`SELECT * FROM parts WHERE partID = ${partID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found part: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Part.getAll = result => {
    sql.query("SELECT * FROM parts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("parts: ", res);
      result(null, res);
    });
  };

 Part.updateById = (id, part, result) => {
    sql.query(
      "UPDATE parts SET partType = ?, partPrefix = ?, manufacturerID = ? WHERE partID = ?",
      [part.partType, part.partPrefix, part.manufacturerID, id],
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
  
        console.log("updated part: ", { id: id, ...part});
        result(null, { id: id, ...user});
      }
    );
  };
  
  Part.remove = (id, result) => {
    sql.query("DELETE FROM parts WHERE partID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Part with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted part with id: ", id);
      result(null, res);
    });
  };

  module.exports = Part;