const Part = require("../models/parts.models");

exports.findAll = (req, res) => {
    Part.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving retailers."
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
  
  // Create a Retailer
  const part = new Part({
    partType: req.body.partType,
    partPrefix: req.body.partPrefix,
    manufacturerID: req.body.manufacturerID
  });
  
  // Save Part in the database
  Part.create(part, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Part."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Part.findById(req.params.partID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Part with id ${req.params.partID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Part with id " + req.params.partID
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
  
  Part.updateById(
    req.params.partID,
    new Part(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Part with id ${req.params.partID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating part with id " + req.params.partID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Part.remove(req.params.partID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Part with id ${req.params.partID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Part with id " + req.params.partID
        });
      }
    } else res.send({ message: `Part was deleted successfully!` });
  });
};
