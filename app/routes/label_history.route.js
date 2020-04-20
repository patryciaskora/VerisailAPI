module.exports = app => {
    const history = require("../controllers/label_history.controller");

    // Create a new history
    app.post("/newlabelhistory", history.create);

    // Retrieve all history
    app.get("/labelhistory", history.findAll);

    // Retrieve a single history with qrcode
    app.get("/labelhistory/:ID", history.findOne);

    // Update a history with qrcode
    app.put("/labelsupdate/:ID", history.update);

    //Delete a history with an qrcode
    app.delete('/deletehistory/:ID', history.delete);
}