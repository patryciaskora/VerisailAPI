const sql = require("./db.js");

const label_history = function(history){
    this.ID = history.ID
    this.partID = history.partID
    this.QRcode = history.QRcode
    this.label_status_id = history.label_status_id
    this.current_owner_id = history.current_owner_id
    this.ownership_date = history.ownership_date
}

label_history.create = (newHistory, result) => {
  sql.query("INSERT INTO label_orders SET ?", newHistory, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created order: ", { id: res.insertId, ...newHistory});
    result(null, { id: res.insertId, ...newHistory});
  });
};

label_history.findById = (ID, result) => {
  sql.query(`SELECT * FROM label_history WHERE ID = ${ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found history: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the id
    result({ kind: "not_found" }, null);
  });
};

label_history.getAll = result => {
    sql.query("SELECT * FROM label_history", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("history: ", res);
      result(null, res);
    });
  };

 label_history.updateById = (id, history, result) => {
    sql.query(
      "UPDATE label_history SET partID = ?, QRCode = ?, label_status_id = ?, current_own  WHERE ID = ?",
      [order.QR_begin, order.QR_end, order.email, order.label_quantity, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Order with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated order: ", { id: id, ...order});
        result(null, { id: id, ...order});
      }
    );
  };
  
  label_history.remove = (id, result) => {
    sql.query("DELETE FROM label_history WHERE ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted label history with id: ", id);
      result(null, res);
    });
  };

  module.exports = label_history;