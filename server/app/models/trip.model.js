const sql = require("./db.js");
// const Day = require("./day.model.js");

// constructor
const Trip = function(trip) {
  // let days = [];
  // trip.segments.forEach((day)=>{
  //   days.push(new Day({
  //     trip: trip.id,
  //     trails: day.trails,
  //     campsite: day.campsite
  //   }));
  // });

  this.user = trip.user;
  this.id = trip.id;
  this.segments = trip.segments;
  this.review = trip.review;
  this.isPublished = trip.isPublished;
  this.popularity = trip.popularity;
};

Trip.create = (newTrip, result) => {
  sql.query("INSERT INTO Trips SET ?", newTrip, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created trip: ", { id: res.insertId, ...newTrip });
    result(null, { id: res.insertId, ...newTrip });
  });
};

Trip.findById = (tripId, result) => {
  sql.query(`SELECT * FROM Trips WHERE TripID = ${tripId}`, (err, res) => {
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
  sql.query("SELECT * FROM Trips", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("trips: ", res);
    result(null, res);
  });
};

Trip.updateById = (id, user, result) => {
  sql.query(
    "UPDATE Trips SET Name = ? WHERE TripID = ?",
    [user.name, id],
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

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
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

    console.log("deleted user with id: ", id);
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

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Trip;