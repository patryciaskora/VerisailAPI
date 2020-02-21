module.exports = app => {
    const event = require("../controllers/event.controller.js");

    // Create a new Event
    app.post("/newevent", event.create);

    // Retrieve all Events
    app.get("/events", event.findAll);

    // Retrieve a single Event with eventID
    app.get("/events/:eventID", event.findOne);

    // Update a Event with eventId
    app.put("/eventsupdate/:eventID", event.update);

    //Delete a Event with an ID
    app.delete('/deleteevent/:eventID', event.delete);
}