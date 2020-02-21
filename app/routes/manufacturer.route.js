module.exports = app => {
    const manufacturer = require("../controllers/manufacturer.controller");

    // Create a new Manufacturer
    app.post("/newmanufacturer", manufacturer.create);

    // Retrieve all Manufacturer
    app.get("/manufacturers", manufacturer.findAll);

    // Retrieve a single Manufacturer with manufacturerID
    app.get("/manufacturers/:manufacturerID", manufacturer.findOne);

    // Update a Manufacturer with manufacturerID
    app.put("/manufacturerupdate/:manufacturerID", manufacturer.update);

    //Delete a Manufacturer with an ID
    app.delete('/deletemanufacturer/:manufacturerID', manufacturer.delete);
}