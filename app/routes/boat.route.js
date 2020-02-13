module.exports = app => {
    const boats = require("../controllers/boat.controller.js");

  // Retrieve all Boats
  app.get("/boats", boats.findAll);
};