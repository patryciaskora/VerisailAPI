module.exports = app => {
    const event = require("../controllers/event.controller.js");
    app.post("/newevent", event.create);
    app.get("/events", event.findAll);
    app.get("/events/:eventID", event.findOne);
    app.put("/eventsupdate/:eventID", event.update);
    app.delete('/deleteevent/:eventID', event.delete);
}