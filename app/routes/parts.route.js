module.exports = app => {
    const part = require("../controllers/parts.controller");

    // Create a new Part
    app.post("/newpart", part.create);

    // Retrieve all Parts
    app.get("/parts", part.findAll);

    // Retrieve a single Part with partID
    app.get("/parts/:partID", part.findOne);

    // Update a Part with partID
    app.put("/partupdate/:partID", part.update);

    //Delete a Part with an partID
    app.delete('/deletepart/:partID', part.delete);
}