module.exports = app => {
    const labelOrder = require("../controllers/label_orders.controller");

    // Create a new label order
    app.post("/newOrder", labelOrder.create);

    // Retrieve all label orders
    app.get("/labelorders", labelOrder.findAll);

    // Retrieve a single label order with orderNum
    app.get("/labelorders/:orderNum", labelOrder.findOne);

    // Update a label order with orderNum
    app.put("/orderupdate/:orderNum", labelOrder.update);

    //Delete a label order with an ID
    app.delete('/deleteorder/:orderNum', labelOrder.delete);

}