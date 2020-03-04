const Event = require("../models/events.model.js");

exports.findAll = (req, res) => {
    Event.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
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
  
  // Create a Event
  const event = new Event({
    eventID: req.body.eventID,
    eventName: req.body.eventName,
    event_date: req.body.event_date,
    event_time: req.body.event_time,
    city: req.body.city,
    state: req.body.state,
    GPS_lat: req.body.GPS_lat,
    GPS_long: req.body.GPS_long

  });
  
  // Save Event in the database
  Event.create(event, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Event.findById(req.params.eventID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.eventID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Event with id " + req.params.Event
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
  
  Event.updateById(
    req.params.eventID,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.eventID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating event with id " + req.params.eventID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Event.remove(req.params.eventID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Event with id ${req.params.eventID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete event with id " + req.params.eventID
        });
      }
    } else res.send({ message: `Event was deleted successfully!` });
  });
};
