const sql = require("./db.js");

//FINISH LAT AND LONG FOR CONTROLLERS 
const Inspection = function(inspection){
    this.inspectionID = inspection.inspectionID
    this.insp_time = inspection.insp_time
    this.insp_date = inspection.insp_date
    this.verifiedStatus = inspection.verifiedStatus
    this.eventID = inspection.eventID
    this.boatID = inspection.boatID
    this.GPS_lat = inspection.GPS_lat
    this.GPS_long = inspection.GPS_long
}

Inspection.create = (newInspection, result) => {
  sql.query("INSERT INTO event_inspections SET ?", newInspection, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created inspection: ", { id: res.insertId, ...newInspection});
    result(null, { id: res.insertId, ...newInspection});
  });
};

Inspection.findById = (inspectionID, result) => {
  sql.query(`SELECT * FROM event_inspections WHERE inspectionID = ${inspectionID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found inspection: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Inspection with the id
    result({ kind: "not_found" }, null);
  });
};

Inspection.getAll = result => {
    sql.query("SELECT * FROM event_inspections", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("inspections: ", res);
      result(null, res);
    });
  };

 Inspection.updateById = (id, inspection, result) => {
    sql.query(
      "UPDATE event_inspections SET GPS_long = ?, GPS_lat = ?, insp_time = ?, insp_date = ?, eventID = ?, verifiedStatus = ? WHERE inspectionID = ?",
      [inspection.GPS_long, inspection.GPS_lat, inspection.insp_time, inspection.insp_date, inspection.eventID, inspection.verifiedStatus, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Inspection with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated inspection: ", { id: id, ...inspection});
        result(null, { id: id, ...inspection});
      }
    );
  };
  
  Inspection.remove = (id, result) => {
    sql.query("DELETE FROM event_inspections WHERE inspectionID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Inspection with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted inspection with id: ", id);
      result(null, res);
    });
  };

  module.exports = Inspection;