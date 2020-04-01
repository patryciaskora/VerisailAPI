const inspectionDetails = require("../models/event_insp_details.model");

exports.findAll = (req, res) => {
    inspectionDetails.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving inspection details."
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
  const inspectionDetail = new inspectionDetails({
    inspectionID: req.body.inspectionID,
    eventID: req.body.eventID,
    boatID: req.body.boatID,
    insp_date: req.body.insp_date,
    insp_time: req.body.insp_time,
    partStatus: req.body.partStatue,
    qrDesc: req.body.qrDesc,
    insp_by: req.body.insp_by,
    photoName: req.body.photoName,
    GPS_lat: req.body.GPS_lat,
    GPS_long: req.body.GPS_long
  });
  
  // Save Event Registration in the database
  inspectionDetails.create(inspectionDetail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the inspection detail."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  inspectionDetails.findById(req.params.inspectionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found inspection details with id ${req.params.inspectionID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving details with id " + req.params.inspectionID
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
  
  inspectionDetails.updateById(
    req.params.inspectionID,
    new eventRegistration(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found inspection details with id ${req.params.inspectionID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating inspection details with id " + req.params.inspectionID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  inspectionDetails.remove(req.params.inspectionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found inspection details with id ${req.params.inspectionID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete inspection details with id " + req.params.inspectionID
        });
      }
    } else res.send({ message: `Registration was deleted successfully!` });
  });
};
