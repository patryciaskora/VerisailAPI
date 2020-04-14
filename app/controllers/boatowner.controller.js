const BoatOwner = require("../models/boatowner.model");

exports.findAll = (req, res) => {
    BoatOwner.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving boat owners."
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
  
  // Create a Boat Owner
  const boatOwner = new BoatOwner({
    fName: req.body.fName,
    lName: req.body.lName,
    phone: req.body.phone,
    email: req.body.email,
    userID: req.body.userID
  });
  
  // Save Event in the database
  BoatOwner.create(boatOwner, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Boat Owner."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  BoatOwner.findById(req.params.ownerID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Boat Owner with id ${req.params.ownerID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Boat Owner with id " + req.params.ownerID
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
  
  BoatOwner.updateById(
    req.params.ownerID,
    new BoatOwner(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Boat Owner with id ${req.params.ownerID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Boat Owner with id " + req.params.ownerID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  BoatOwner.remove(req.params.ownerID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Boat Owner with id ${req.params.ownerID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Boat Owner with id " + req.params.ownerID
        });
      }
    } else res.send({ message: `Boat Owner was deleted successfully!` });
  });
};
