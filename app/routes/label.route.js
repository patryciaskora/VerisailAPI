module.exports = app => {
    const label = require("../controllers/label.controller");

    // Create a new Event
    app.post("/newlabel", label.create);

    // Retrieve all label
    app.get("/labels", label.findAll);

    // Retrieve a single Label with eventID
    app.get("/labels/:qrcode", label.findOne);

    // Update a Label with qrcode
    app.put("/labelsupdate/:qrcode", label.update);

    //Delete a Label with an ID
    app.delete('/deletelabel/:qrcode', label.delete);
}