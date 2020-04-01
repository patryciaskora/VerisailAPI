module.exports = app => {
    const detail = require("../controllers/event_insp_details.controller");

    // Create a new Inspection Detail
    app.post("/newinspdetail", detail.create);

    // Retrieve all details
    app.get("/details", detail.findAll);

    // Retrieve a single Distributor with distributorID
    app.get("/details/:inspectionID", detail.findOne);

    // Update a Distributor with distributorID
    app.put("/detailupdate/:inspectionID", detail.update);

    //Delete a Distributor with an ID
    app.delete('/deletedetail/:inspectionID', detail.delete);
}