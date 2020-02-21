module.exports = app => {
    const distributor = require("../controllers/distributor.controller");

    // Create a new Distributor
    app.post("/newdistributor", distributor.create);

    // Retrieve all Distributors
    app.get("/distributors", distributor.findAll);

    // Retrieve a single Distributor with distributorID
    app.get("/distributors/:distributorID", distributor.findOne);

    // Update a Distributor with distributorID
    app.put("/distributorupdate/:distributorID", distributor.update);

    //Delete a Distributor with an ID
    app.delete('/deletedistributor/:distributorID', distributor.delete);
}