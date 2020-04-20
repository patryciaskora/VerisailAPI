const label_orders = require("../models/label_orders.model.js");

exports.findAll = (req, res) => {
    label_orders.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving label orders."
        });
      else res.send(data);
    });
  };

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a label order
  const labelOrder = new label_orders({
    email = req.body.email,
    QR_begin = req.body.QR_begin,
    QR_end = req.body.QR_end,
    label_quantity = req.body.label_quantity
  });
  
  // Save label order in the database
  labelOrder.create(labelOrder, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the label order."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  labelOrder.findById(req.params.orderNum, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found label order with id ${req.params.orderNum}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving label order with id " + req.params.orderNum
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  labelOrder.updateById(
    req.params.orderNum,
    new label_orders(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found label order with id ${req.params.orderNum}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating label order with id " + req.params.orderNum
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  labelOrder.remove(req.params.orderNum, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found label order with id ${req.params.orderNum}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete label order with id " + req.params.orderNum
        });
      }
    } else res.send({ message: `label order was deleted successfully!` });
  });
};
