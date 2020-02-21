module.exports = app => {
    const boatOwner = require("../controllers/boatowner.controller");

    // Create a new Boat Owner
    app.post("/newboatowner", boatOwner.create);

    // Retrieve all Boat Owners
    app.get("/boatowners", boatOwner.findAll);

    // Retrieve a single Boat Owner with ownerID
    app.get("/boatowners/:ownerID", boatOwner.findOne);

    // Update a Boat Owner with ownerId
    app.put("/ownersupdate/:ownerID", boatOwner.update);

    //Delete a Boat Owner with an ID
    app.delete('/deleteowner/:ownerID', boatOwner.delete);
}