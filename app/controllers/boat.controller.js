const Boat = require("../models/boats.model.js");

exports.findAll = (req, res) => {
    Boat.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
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
  const boat = new Boat({
    boatID: req.body.boatID,
    boatName: req.body.boatName,
    phone: req.body.phone,
    countryOfOrigin: req.body.countryOfOrigin
  });
  
  // Save Boat in the database
  Boat.create(boat, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Boat."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Boat.findById(req.params.boatID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Boat with id ${req.params.boatID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Boat with id " + req.params.Boat
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
  
  Boat.updateById(
    req.params.boatID,
    new Boat(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Boat with id ${req.params.boatID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Boat with id " + req.params.boatID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Boat.remove(req.params.boatID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Boat with id ${req.params.boatID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Boat with id " + req.params.boatID
        });
      }
    } else res.send({ message: `Boat was deleted successfully!` });
  });
};
