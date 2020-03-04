const sql = require("./db.js");

const Event = function(event){
    this.eventName = event.eventName
    this.city = event.city
    this.state = event.state
    this.event_time = event.event_time
    this.event_date = event.event_date
    this.GPS_lat = event.GPS_lat
    this.GPS_long = event.GPS_long
    this.eventID = event.eventID
}

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO ILCAevents SET ?", newEvent, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created event: ", { id: res.insertId, ...newEvent});
    result(null, { id: res.insertId, ...newEvent});
  });
};

Event.findById = (eventID, result) => {
  sql.query(`SELECT * FROM ILCAevents WHERE eventID = ${eventID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Event with the id
    result({ kind: "not_found" }, null);
  });
};

Event.getAll = result => {
    sql.query("SELECT * FROM ILCAevents", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("events: ", res);
      result(null, res);
    });
  };

 Event.updateById = (id, event, result) => {
    sql.query(
      "UPDATE ILCAevents SET GPS_long = ?, GPS_lat = ?, eventName = ?, event_date = ?, event_time = ?, city = ?, state = ? WHERE eventID = ?",
      [event.GPS_long, event.GPS_lat, event.eventName, event.event_date, event.event_time, event.city, event.state, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Event with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated event: ", { id: id, ...event });
        result(null, { id: id, ...event});
      }
    );
  };
  
  Event.remove = (id, result) => {
    sql.query("DELETE FROM ILCAevents WHERE eventID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Event with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Event with id: ", id);
      result(null, res);
    });
  };

  module.exports = Event;