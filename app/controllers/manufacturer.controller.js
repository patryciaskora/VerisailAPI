const Manufacturer = require("../models/manufacturer.model");

exports.findAll = (req, res) => {
    Manufacturer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving manufacturers."
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
  
  // Create a Manufacturer
  const manufacturer = new Manufacturer({
    manufacturerID: req.body.manufacturerID,
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  
  // Save Manufacturer in the database
  Manufacturer.create(manufacturer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manufacturer."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Manufacturer.findById(req.params.manufacturerID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Manufacturer with id ${req.params.manufacturerID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Manufacturer with id " + req.params.Manufacturer
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
  
  Manufacturer.updateById(
    req.params.manufacturerID,
    new Manufacturer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Manufacturer with id ${req.params.manufacturerID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating manufacturer with id " + req.params.manufacturerID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Manufacturer.remove(req.params.manufacturerID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Manufacturer with id ${req.params.manufacturerID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete manufacturer with id " + req.params.manufacturerID
        });
      }
    } else res.send({ message: `Manufacturer was deleted successfully!` });
  });
};
