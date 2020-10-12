const sql = require("./db.js");
const zlib = require('zlib')
// const Day = require("./day.model.js");

// constructor
const Trip = function(trip) {
  this.TripID = trip.tripId,
  this.UserID = trip.author,
  this.TrailList = trip.trails,
  this.Geometry = JSON.stringify(trip.geometry),
  // zlib.deflate(JSON.stringify(trip.geometry), (err, buffer) => {
  //   if (err) {
  //     console.log('u-oh')
  //   }
  
  //   // Send buffer as string to client using my imaginary io object
  //   io.send(buffer.toString('base64'))
  // }),
  this.IsPublished = trip.isPublished,
  this.Popularity = trip.popularity
};

Trip.create = (newTrip, result) => {
  console.log(newTrip);
  sql.query("REPLACE INTO Trips SET ? ", newTrip, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created trip: ", { id: res.insertId, ...newTrip });
    result(null, { id: res.insertId, ...newTrip });
  });
};

Trip.findById = (tripId, userId, result) => {
  sql.query(`SELECT * FROM Trips WHERE TripID = ${tripId} AND UserID = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found trip: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Trip with the id
    result({ kind: "not_found" }, null);
  });
};

Trip.getAll = result => {
  sql.query("SELECT * FROM Trips WHERE IsPublished", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("trips: ", res);
    result(null, res);
  });
};

Trip.updateById = (id, trip, result) => {
  console.log(trip);
  sql.query(
    "UPDATE Trips SET UserID = ?, TrailList = ?, Geometry = ?, IsPublished = ?, Popularity = ? WHERE TripID = ?",
    [trip.UserID, trip.TrailList, trip.Geometry, trip.IsPublished, trip.Popularity, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Trip with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated trip: ", { id: id, ...trip });
      result(null, { id: id, ...trip });
    }
  );
};

Trip.remove = (id, result) => {
  sql.query("DELETE FROM Trips WHERE TripID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Trip with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted trip with id: ", id);
    result(null, res);
  });
};

Trip.removeAll = result => {
  sql.query("DELETE FROM Trips", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} trips`);
    result(null, res);
  });
};

module.exports = Trip;