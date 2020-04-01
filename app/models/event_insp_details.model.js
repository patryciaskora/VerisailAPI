const sql = require("./db.js");

const inspectionDetails = function(details){
    this.inspectionID = details.inspectionID
    this.eventID = details.eventID
    this.boatID = details.boatID
    this.insp_date = details.insp_date
    this.insp_time = details.insp_time
    this.partStatus = details.partStatus
    this.qrDesc = details.qrDesc
    this.insp_by = details.insp_by
    this.photoName = details.photoName
    this.GPS_lat = details.GPS_lat
    this.GPS_long = details.GPS_long
}

inspectionDetails.create = (newDetails, result) => {
  sql.query("INSERT INTO event_insp_details SET ?", newDetails, (err,res)=> {
    if(err){
      console.log("error: ", err);
      result(err,null);
      return;
    }
    console.log("created details: ", { id: res.insertId, ...newDetails});
    result(null, { id: res.insertId, ...newDetails});
  });
};

inspectionDetails.findById = (inspectionID, result) => {
  sql.query(`SELECT * FROM event_insp_details WHERE inspectionID = ${inspectionID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found details: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found details with the id
    result({ kind: "not_found" }, null);
  });
};

inspectionDetails.getAll = result => {
    sql.query("SELECT * FROM event_insp_details", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("all details: ", res);
      result(null, res);
    });
  };

 inspectionDetails.updateById = (id, detail, result) => {
    sql.query(
      "UPDATE event_insp_details SET boatID = ?, eventID = ?, partStatus = ?, insp_by = ?, photoName = ?, GPS_lat = ?, GPS_long = ?, insp_date = ?, insp_time = ?, qrDesc = ? WHERE inspectionID = ?",
      [detail.boatID, detail.eventID, detail.partStatus,detail.insp_by, detail.photoName, detail.GPS_lat, detail.GPS_long, detail.insp_date, detail.insp_time, detail.qrDesc, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Details with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated inspection details: ", { id: id, ...detail });
        result(null, { id: id, ...detail});
      }
    );
  };
  
  inspectionDetails.remove = (id, result) => {
    sql.query("DELETE FROM event_insp_details WHERE inspectionID = ?", id, (err, res) => {
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
  
      console.log("deleted inspection detail with id: ", id);
      result(null, res);
    });
  };

  module.exports = inspectionDetails;