const sql = require("./db.js");

const Boat = function(boat){
    this.boatID = boatID
    this.boatName = boatName
    this.phone = phone
    this.countryOfOrigin = countryOfOrigin
}

Boat.getAll = result => {
    sql.query("SELECT * FROM boats", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("boats: ", res);
      result(null, res);
    });
  };