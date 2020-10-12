const USER_DATABASE_LINK = 'http://localhost:3000/users';
const TRIP_DATABASE_LINK = 'http://localhost:3000/trips';

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
        map: this.map,
        tripNode: "tripContainer",
        elevationWidget: this.elevationWidget
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
      this.newTripStack = [5, 4, 3, 2,1];

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
        // this.testJsonRest(JsonRest);
        this.JsonRest = JsonRest
        this.setupUser(JsonRest);
        this.setupTripStore(JsonRest);
      }));
      



      // this.selGraphicsLayer = new GraphicsLayer();
      // this.map.addLayer(this.selGraphicsLayer);


      // on(this.map.infoWindow, "selection-change", lang.hitch(this, function () {
      //   var sel = this.map.infoWindow.getSelectedFeature();
      //   if(sel && sel.attributes){
      //     console.log("Selection is");
      //     console.log(sel);
      //     console.log(this.map._layers["2019_GLAC_Trails_4829"]);
      //     console.log(this.map.infoWindow);
      //     this.sel = sel;
      //     this.map.infoWindow.setSelectedFeature(this.sel);
      //   }
      // }));


    },
    toggleUnion: function () {
      this.union = !this.union;
      console.log(this.union);
    },
    setupUser: function (JsonRest) {
      this.userStore = new JsonRest({target: USER_DATABASE_LINK});
      if(localStorage.getItem("userId") != null && localStorage.getItem("userId") != "null" ){
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log("User: "+this.userId);
        this.userStore.get(this.userId).then((res) => {
          this.userName = res.Name;
        }).catch((err) => {
          _createUser();
        });
      } else {
        _createUser();
      }
      this.loadTrips();
    },
    _createUser :function () {
      this.userStore.put({
        name: ""
      }).then((data) => {
        console.log(data);
        this.userId = data.id;
        localStorage.setItem("userId", JSON.stringify(this.userId));
      });
    },
    setupTripStore: function (JsonRest) {
      this.tripStore = new JsonRest({target: TRIP_DATABASE_LINK});
    },
    loadTrips: function (){
        for(tripId = 1; tripId < 6; tripId++){
          console.log("Query: "+TRIP_DATABASE_LINK+"/"+tripId+"/"+this.userId);
          fetch(TRIP_DATABASE_LINK+"/"+tripId+"/"+this.userId)
          .then(response => response.json()).then((res)=>{
            console.log(res);
            let newTrip = {
              author: res.UserID,
              tripId: res.TripID,
              geometry: esri.geometry.fromJson(JSON.parse(res.Geometry)),
              trails: res.TrailList,
              isPublished: res.IsPublished,
              popularity: res.Popularity
            };

            console.log("Create a trip of id:"+newTrip.tripId);
            this.newTripStack.splice(this.newTripStack.indexOf(newTrip.tripId),1);

            // this.newTripStack.remove(newTrip.tripId);
            console.log(this.newTripStack);

            this.trips[newTrip.tripId] = newTrip;
            // this.tripElements.push(dom.byId(""+newTrip.id));
      
            let tripElement = dom.byId(""+newTrip.tripId);
            dom.byId("trip-"+newTrip.tripId).classList.remove("hide");
            on(tripElement, "click", lang.hitch(this, function (){
              console.log("Click on trip of id: "+newTrip.tripId);
              this.elevationWidget.clearProfileChart();
              this.elevationWidget.generateProfileNoUnion(newTrip.geometry);
            }));
      
            let deleteBtn = dom.byId("delete-"+newTrip.tripId);
            on(deleteBtn, "click", lang.hitch(this, function (){
              if(this.newTripStack.length < 1){
                dom.byId("createTripBtn").classList.remove("hide");
              }
      
              dom.byId("trip-"+newTrip.tripId).classList.add("hide");
              this.newTripStack.push(newTrip.tripId);
      
              this.tripStore.remove(newTrip.tripId).then((res) =>{
                console.log("Delete trip "+newTrip.tripId);
              })
            }));
            
      
            console.log(this.trips);
      
            if(this.trips.length > 5 && this.newTripStack.length < 1){
              dom.byId("createTripBtn").classList.add("hide");
              console.log("Hide create trip");
            }
      
            console.log(newTrip);

          }).catch((err)=>{

          });
        }
        console.log(this.trips);
    },
    _createTrip: function () {
      let newTrip = {
        author: this.userId,
        tripId: this.newTripStack.pop(),
        geometry: this.elevationWidget.geometry,
        trails: "",
        isPublished: false,
        popularity: 0
      };

      console.log("Create a trip of id:"+newTrip.tripId);

      this.trips[newTrip.tripId] = newTrip;
      // this.tripElements.push(dom.byId(""+newTrip.id));

      let tripElement = dom.byId(""+newTrip.tripId);
      dom.byId("trip-"+newTrip.tripId).classList.remove("hide");
      on(tripElement, "click", lang.hitch(this, function (){
        console.log("Click on trip of id: "+newTrip.tripId);
        this.elevationWidget.clearProfileChart();
        this.elevationWidget.generateProfileNoUnion(newTrip.geometry);
      }));

      let deleteBtn = dom.byId("delete-"+newTrip.tripId);
      on(deleteBtn, "click", lang.hitch(this, function (){
        if(this.newTripStack.length < 1){
          dom.byId("createTripBtn").classList.remove("hide");
        }

        dom.byId("trip-"+newTrip.tripId).classList.add("hide");
        this.newTripStack.push(newTrip.tripId);

        this.tripStore.remove(newTrip.tripId).then((res) =>{
          console.log("Delete trip "+newTrip.tripId);
        })
      }));
      

      console.log(this.trips);
      console.log(this.elevationWidget.geometry);

      if(this.trips.length > 5 && this.newTripStack.length < 1){
        dom.byId("createTripBtn").classList.add("hide");
        console.log("Hide create trip");
      }

      console.log(newTrip);

      this.tripStore.put(newTrip).then((res) => {
        console.log(res);
      });

    }
  });
});