module.exports = app => {
    const manufacturer = require("../controllers/manufacturer.controller");

    // Create a new Manufacturer
    app.post("/newmanufacturer", manufacturer.create);

    // Retrieve all Manufacturer
    app.get("/manufacturers", manufacturer.findAll);

    // Retrieve a single Manufacturer with manufacturerID
    app.get("/manufacturers_id/:manufacturerID", manufacturer.findOne);

    // Retrieve a single Manufacturer with manuName
    app.get("/manufacturers_name/:manuName", manufacturer.findOneByName);

    // Update a Manufacturer with manufacturerID
    app.put("/manufacturerupdate/:manufacturerID", manufacturer.update);

    //Delete a Manufacturer with an ID
    app.delete('/deletemanufacturer/:manufacturerID', manufacturer.delete);
}