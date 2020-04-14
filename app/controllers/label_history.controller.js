const label_history = require("../models/label_history.model.js");

exports.findAll = (req, res) => {
    label_history.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving label history."
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
  const history = new label_history({
    partID: req.body.partID,
    QRCode: req.body.QRCode,
    label_status_id: req.body.label_status_id,
    current_owner_id: req.body.current_owner_id,
    ownership_date: req.ownership_date
  });
  
  // Save label history in the database
  label_history.create(history, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the label history."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  label_history.findById(req.params.ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found label history with id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving label history with id " + req.params.ID
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
  
  label_history.updateById(
    req.params.ID,
    new label_history(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found label history with id ${req.params.ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating label history with id " + req.params.ID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  label_history.remove(req.params.ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found label order with id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete label history with id " + req.params.ID
        });
      }
    } else res.send({ message: `label history was deleted successfully!` });
  });
};
