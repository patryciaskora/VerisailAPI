
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(function(req,res, next) {
  var allowedOrigins = ['http://localhost:4200', 'http://ec2-3-89-226-21.compute-1.amazonaws.com','http://verisail.csse-projects.monmouth.edu/'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
})

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Verisail application." });
});

require("./app/routes/boat.route")(app);
require("./app/routes/event.route")(app);
require("./app/routes/manufacturer.route")(app);
require("./app/routes/boatowner.route")(app);
require("./app/routes/distributor.route")(app);
require("./app/routes/event_registration.route")(app);
require("./app/routes/retailer.route")(app);
require("./app/routes/event_inspection.route")(app);
require("./app/routes/label.route")(app);
require("./app/routes/users.route")(app);
require("./app/routes/event_insp_details.route")(app);
require("./app/routes/parts.route")(app);
require("./app/routes/label_history.route")(app);
require("./app/routes/label_orders.route")(app);


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

