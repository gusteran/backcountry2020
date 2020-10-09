const sql = require("./db.js");

const Day = function(day){
    this.trip = day.trip,
    this.trails = day.trails,
    this.campsite = day.campsite
}