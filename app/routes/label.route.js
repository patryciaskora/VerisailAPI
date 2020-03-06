module.exports = app => {
    const label = require("../controllers/label.controller");

    // Create a new Label
    app.post("/newlabel", label.create);

    // Retrieve all label
    app.get("/labels", label.findAll);

    // Retrieve a single Label with qrcode
    app.get("/labels/:qrcode", label.findOne);

    // Update a Label with qrcode
    app.put("/labelsupdate/:qrcode", label.update);

    //Delete a Label with an qrcode
    app.delete('/deletelabel/:qrcode', label.delete);
}