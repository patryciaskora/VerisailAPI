const Inspection = require("../models/event_inspection.model");

exports.findAll = (req, res) => {
    Inspection.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving inspections."
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
  
  // Create an Inspection
  const inspection = new Inspection({
    inspectionID: req.body.inspectionID,
    GPS_lat: req.body.GPS_lat,
    GPS_long: req.body.GPS_long,
    eventID: req.body.eventID,
    verifiedStatus: req.body.verifiedStatus,
    dateTime: req.body.dateTime
  });
  
  // Save Inspection in the database
  Inspection.create(inspection, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inspection."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Inspection.findById(req.params.retailID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inspection with id ${req.params.retailID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inspection with id " + req.params.retailID
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
  
  Inspection.updateById(
    req.params.retailID,
    new Inspection(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inspection with id ${req.params.retailID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating inspection with id " + req.params.retailID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Inspection.remove(req.params.retailID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inspection with id ${req.params.retailID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Inspection with id " + req.params.retailID
        });
      }
    } else res.send({ message: `Inspection was deleted successfully!` });
  });
};
