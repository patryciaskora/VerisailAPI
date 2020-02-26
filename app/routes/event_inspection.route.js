module.exports = app => {
    const inspection = require("../controllers/event_inspection.controller");

    // Create a new Inspection
    app.post("/newinspection", inspection.create);

    // Retrieve all Inspection
    app.get("/inspections", inspection.findAll);

    // Retrieve a single Inspection with inspectionID
    app.get("/inspections/:inspectionID", inspection.findOne);

    // Update a Inspection with inspectionID
    app.put("/inspectionupdate/:inspectionID", inspection.update);

    //Delete a Inspection with an ID
    app.delete('/deleteinspection/:inspectionID', inspection.delete);
}