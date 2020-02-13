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