const eventRegistration = require("../models/event_registration.model");

exports.findAll = (req, res) => {
    eventRegistration.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving event registrations."
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
  
  // Create an Event Registration
  const registration = new eventRegistration({
    dateTime: req.body.dateTime,
    hasBeenInsp: req.body.hasBeenInsp,
    eventID: req.body.eventID,
    boatID: req.body.boatID
  });
  
  // Save Event Registration in the database
  eventRegistration.create(registration, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event registration."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  eventRegistration.findById(req.params.registrationID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found event registration with id ${req.params.registrationID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving registration with id " + req.params.registrationID
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
  
  eventRegistration.updateById(
    req.params.registrationID,
    new eventRegistration(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found registration with id ${req.params.registrationID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating registration with id " + req.params.registrationID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  eventRegistration.remove(req.params.registrationID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found event registration with id ${req.params.registrationID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete event registration with id " + req.params.registrationID
        });
      }
    } else res.send({ message: `Registration was deleted successfully!` });
  });
};
