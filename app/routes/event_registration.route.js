module.exports = app => {
    const registration = require("../controllers/event_registration.controller");

    // Create a new registration
    app.post("/newregistration", registration.create);

    // Retrieve all Registrations
    app.get("/registrations", registration.findAll);

    // Retrieve a single Registration with registrationID
    app.get("/registrations/:registrationID", registration.findOne);

    // Update a Regristration with registrationID
    app.put("/registrationupdate/:registrationID", registration.update);

    //Delete a Registration with an ID
    app.delete('/deleteregistration/:registrationID', registration.delete);
}