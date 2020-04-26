module.exports = app => {
    const retailer = require("../controllers/retailer.controller");

    // Create a new Retailer
    app.post("/newretailer", retailer.create);

    // Retrieve all Retailer
    app.get("/retailers", retailer.findAll);

    // Retrieve a single Retailer with retailID
    app.get("/retailers/:retailID", retailer.findOne);

    // Update a Retailer with retailID
    app.put("/retailerupdate/:retailID", retailer.update);

    //Delete a Retailer with an ID
    app.delete('/deleteretailer/:retailID', retailer.delete);
}