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
    insp_time: req.body.insp_time,
    insp_date: req.body.insp_date
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
  Inspection.findById(req.params.inspectionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inspection with id ${req.params.inspectionID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Inspection with id " + req.params.inspectionID
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
    req.params.inspectionID,
    new Inspection(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inspection with id ${req.params.inspectionID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating inspection with id " + req.params.inspectionID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Inspection.remove(req.params.inspectionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inspection with id ${req.params.inspectionID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Inspection with id " + req.params.inspectionID
        });
      }
    } else res.send({ message: `Inspection was deleted successfully!` });
  });
};
