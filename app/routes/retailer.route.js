module.exports = app => {
    const retailer = require("../controllers/retailer.controller");

    // Create a new Retailer
    app.post("/newretailer", retailer.create);

    // Retrieve all Retailer
    app.get("/retailers", retailer.findAll);

    // Retrieve a single Retailer with retailID
    app.get("/retailers/:retailerID", retailer.findOne);

    // Update a Retailer with retailID
    app.put("/retailerupdate/:retailerID", retailer.update);

    //Delete a Retailer with an ID
    app.delete('/deleteretailer/:retailerID', retailer.delete);
}