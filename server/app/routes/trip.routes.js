module.exports = app => {
    const trips = require("../controllers/trip.controller.js");
  
    // Create a new Customer
    app.post("/trips", trips.create);
  
    // Retrieve all Customers
    app.get("/trips", trips.findAll);
  
    // Retrieve a single Customer with userId
    app.get("/trips/:tripId/:userId", trips.findOne);
  
    // Update a Customer with userId
    app.put("/trips/:tripId", trips.update);
  
    // Delete a Customer with userId
    app.delete("/trips/:tripId", trips.delete);
  
    // Create a new Customer
    // app.delete("/trips", trips.deleteAll);
  };