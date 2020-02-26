const Retailer = require("../models/retailer.model");

exports.findAll = (req, res) => {
    Retailer.getAll((err, data) => {
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
  const retailer = new Retailer({
    retailID: req.body.retailID,
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  });
  
  // Save Retailer in the database
  Retailer.create(retailer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Retailer."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Retailer.findById(req.params.retailID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Retailer with id ${req.params.retailID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Retailer with id " + req.params.retailID
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
  
  Retailer.updateById(
    req.params.retailID,
    new Retailer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Retailer with id ${req.params.retailID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating retailer with id " + req.params.retailID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Retailer.remove(req.params.retailID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Retailer with id ${req.params.retailID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Retailer with id " + req.params.retailID
        });
      }
    } else res.send({ message: `Retailer was deleted successfully!` });
  });
};
