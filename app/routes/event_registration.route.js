module.exports = app => {
    const registration = require("../controllers/event_registration.controller");

    // Create a new registration
    app.post("/newregistration", distributor.create);

    // Retrieve all Distributors
    app.get("/distributors", distributor.findAll);

    // Retrieve a single Distributor with distributorID
    app.get("/distributors/:distributorID", distributor.findOne);

    // Update a Distributor with distributorID
    app.put("/distributorupdate/:distributorID", distributor.update);

    //Delete a Distributor with an ID
    app.delete('/deletedistributor/:distributorID', distributor.delete);
}