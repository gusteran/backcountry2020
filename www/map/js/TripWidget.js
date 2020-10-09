const DATABASE_LINK = 'http://localhost:3000/users';

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/_base/lang",

  "dojo/Evented",
  "dojo/on",
  "dojo/dom",
  "dojo/number",

  "esri/graphic",
  "esri/layers/GraphicsLayer",
  "esri/geometry/geometryEngine"
], function (
  declare,
  array,
  lang,
  Evented,
  on,
  dom,
  Number,
  Graphic,
  GraphicsLayer,
  ElevationProfile,
  geometryEngine
) {
  return declare("application.TripWidget", [Evented], {
    constructor: function (parameters) {
      var defaults = {
        tripNode: "tripContainer"
      };
      lang.mixin(this, defaults, parameters);
      this.union = false;
      this.currentGeometry = null;
      this.trips = [];
      this.trips.push({
        name: "Northern Circle",
        author: 0,
        id: 0,
        segments: "",
        review: null,
        isPublished: false,
        popularity: 0
      });
      this.user = {
        id: 0,
        name: "Default"
      }
      this.tripElements = [];
      this.tripElements.push(dom.byId("model-trip"));

      on(dom.byId("model-trip"), "click", lang.hitch(this, function (){
        console.log("Northern Circle, ya clicked it");
      }));
    },

    /* Public Methods */
    setup: function () {
      var profileParams = {
        map: this.map,
        profileTaskUrl: this.profileTaskUrl,
        scalebarUnits: this.scalebarUnits,
        chartOptions: this.chartParams
      };

      var createTripBtn = dom.byId("createTripBtn");
      on(createTripBtn, "click", lang.hitch(this, function () {
        this._createTrip();
      }));

      console.log("Setup Trip Widget");

      require(["dojo/store/JsonRest"], lang.hitch(this, function (JsonRest){
        this.testJsonRest(JsonRest);
      }));


      this.selGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this.selGraphicsLayer);


      on(this.map.infoWindow, "selection-change", lang.hitch(this, function () {
        var sel = this.map.infoWindow.getSelectedFeature();
        if(sel && sel.attributes){
          console.log("Selection is");
          console.log(sel);
          console.log(this.map._layers["2019_GLAC_Trails_4829"]);
          console.log(this.map.infoWindow);

        }
      }));


    },
    toggleUnion: function () {
      this.union = !this.union;
      console.log(this.union);
    },
    testJsonRest: function (JsonRest) {
      this.store = new JsonRest({target: DATABASE_LINK});
      this.store.put({
        name: "TestName",
        likedTrips: "Test",
        trips: "Test"
      });
      // fetch(DATABASE_LINK)
      // .then(data => console.log(data));
    },
    _createTrip: function () {
      let newTrip = {
        author: this.user.id,
        id: this.trips.length,
      };

      console.log("Create a trip of id:"+newTrip.id);

      this.trips.push(newTrip);
      this.tripElements.push(dom.byId(""+newTrip.id));

      let tripElement = this.tripElements[newTrip.id];
      dom.byId("trip-"+newTrip.id).classList.remove("hide");
      on(tripElement, "click", lang.hitch(this, function (){
        console.log("Click on trip of id: "+newTrip.id);
      }));

      console.log(this.trips);

      if(this.trips.length > 5){
        dom.byId("createTripBtn").classList.add("hide");
        console.log("Hide create trip");
      }

    }
  });
});