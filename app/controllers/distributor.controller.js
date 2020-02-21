const Distributor = require("../models/distributor.model");

exports.findAll = (req, res) => {
    Distributor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving distributors."
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
  
  // Create a Distributor
  const distributor = new Distributor({
    distributorID: req.body.distributorID,
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.boat.state,
    zip: req.body.zip
  });
  
  // Save Distributor in the database
  Distributor.create(distributor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Distributor."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Distributor.findById(req.params.distributorID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Distributor with id ${req.params.distrubtorID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Distributor with id " + req.params.Distributor
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
  
  Distributor.updateById(
    req.params.distributorID,
    new Distributor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Distributor with id ${req.params.distributorID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Distributor with id " + req.params.distributorID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Distributor.remove(req.params.distributorID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Distributor with id ${req.params.distributorID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete distributor with id " + req.params.distributorID
        });
      }
    } else res.send({ message: `Distributor was deleted successfully!` });
  });
};
