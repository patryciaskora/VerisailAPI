module.exports = app => {
    const user = require("../controllers/users.controller");

    // Create a new User
    app.post("/newuser", user.create);

    // Retrieve all Users
    app.get("/users", user.findAll);

    // Retrieve a single User with userID
    app.get("/users/:userID", user.findOne);

    // Update a User with userID
    app.put("/userupdate/:userID", user.update);

    // Check for username in database
    app.get("/user_authentication/:username", user.userAuthentication);

    //Delete a User with an ID
    app.delete('/deleteuser/:userID', user.delete);
}