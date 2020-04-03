const sql = require("./db.js");

const eventRegistration = function(registration){
    this.registrationID = registration.registrationID
    this.hasBeenInsp = registration.hasBeenInsp
    this.eventID = registration.eventID
    this.boatID = registration.boatID
    this.regDate = registration.regDate
    this.regTime = registration.regTime
}

eventRegistration.create = (newRegistration, result) => {
  sql.query("INSERT INTO event_registrations SET ?", newRegistration, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created registration: ", { id: res.insertId, ...newRegistration});
    result(null, { id: res.insertId, ...newRegistration});
  });
};

eventRegistration.findById = (registrationID, result) => {
  sql.query(`SELECT * FROM event_registrations WHERE registrationID = ${registrationID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found registration: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found registration with the id
    result({ kind: "not_found" }, null);
  });
};

eventRegistration.getAll = result => {
    sql.query("SELECT * FROM event_registrations", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("registrations: ", res);
      result(null, res);
    });
  };

 eventRegistration.updateById = (id, registration, result) => {
    sql.query(
      "UPDATE event_registrations SET regDate = ?, regTime = ?, boatID = ?, hasBeenInsp = ?, eventID = ? WHERE registrationID = ?",
      [registration.regDate, registration.regTime, registration.boatID, registration.hasBeenInsp, registration.eventID, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Registration with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated event registration: ", { id: id, ...registration });
        result(null, { id: id, ...registration});
      }
    );
  };
  
  eventRegistration.remove = (id, result) => {
    sql.query("DELETE FROM event_registrations WHERE registrationID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Registration with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted registration with id: ", id);
      result(null, res);
    });
  };

  module.exports = eventRegistration;