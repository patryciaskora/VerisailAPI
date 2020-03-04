const sql = require("./db.js");

const labelOrder = function(order){
    this.orderNum = order.orderNum
    this.QR_begin = order.QR_begin
    this.QR_end = order.QR_end
    this.email = order.email
    this.label_quantity = order.label_quantity
}

labelOrder.create = (newOrder, result) => {
  sql.query("INSERT INTO label_orders SET ?", newOrder, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created order: ", { id: res.insertId, ...newOrder});
    result(null, { id: res.insertId, ...newOrder});
  });
};

labelOrder.findById = (orderNum, result) => {
  sql.query(`SELECT * FROM label_orders WHERE orderNum = ${orderNum}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the id
    result({ kind: "not_found" }, null);
  });
};

labelOrder.getAll = result => {
    sql.query("SELECT * FROM label_orders", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("orders: ", res);
      result(null, res);
    });
  };

 labelOrder.updateById = (id, order, result) => {
    sql.query(
      "UPDATE label_orders SET QR_begin = ?, QR_end = ?, email = ?, label_quantity = ? WHERE orderNum = ?",
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
  
  labelOrder.remove = (id, result) => {
    sql.query("DELETE FROM label_orders WHERE orderNum = ?", id, (err, res) => {
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
  
      console.log("deleted order with id: ", id);
      result(null, res);
    });
  };

  module.exports = labelOrder;