module.exports = app => {
    const boats = require("../controllers/boat.controller.js");

    // Create a new Boat
    app.post("/newboat", boats.create);

    // Retrieve all Boats
    app.get("/boats", boats.findAll);

    // Retrieve a single Boat with boatID
    app.get("/boats/:boatID", boats.findOne);

    // Update a Boat with customerId
    app.put("/boatsupdate/:boatID", boats.update);

    //Delete a Boat with an ID
    app.delete('/deleteboat/:boatID', boats.delete);
}