const Label = require("../models/boats.model.js");

exports.findAll = (req, res) => {
    Label.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving labels."
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
  
  // Create a Boat
  const label = new Label({
    QRcode: req.body.QRcode,
    partID: req.body.partID,
    current_owner: req.body.current_owner,
    boatID: req.body.boatID,
    ownership_date: req.body.ownership_date,
    statusID: req.body.statusID
  });
  
  // Save Label in the database
  Label.create(label, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Label."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Label.findById(req.params.QRcode, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Label with id ${req.params.QRcode}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Label with id " + req.params.QRcode
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
  
  Label.updateById(
    req.params.QRcode,
    new Label(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Label with id ${req.params.QRcode}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Label with id " + req.params.QRcode
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Label.remove(req.params.QRcode, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Label with id ${req.params.QRcode}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Label with id " + req.params.QRcode
        });
      }
    } else res.send({ message: `Label was deleted successfully!` });
  });
};
