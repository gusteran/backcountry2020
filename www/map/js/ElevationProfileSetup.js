// var union = false;
// var currentGeometry = null;

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
  "esri/dijit/ElevationProfile",
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
  geometryEngine,
  union,
  currentGeometry
) {
  return declare("application.ElevationProfileSetup", [Evented], {
    constructor: function (parameters) {
      var defaults = {
        elevProfileChartNode: "elevProfileChart",
        map: null,
        profileTaskUrl: null,
        scalebarUnits: null
      };
      lang.mixin(this, defaults, parameters);
      union = false;
      currentGeometry = null;
    },

    /* Public Methods */
    setupProfile: function () {
      var profileParams = {
        map: this.map,
        profileTaskUrl: this.profileTaskUrl,
        scalebarUnits: this.scalebarUnits,
        chartOptions: this.chartParams
      };

      this.profileWidget = new ElevationProfile(profileParams, this.elevProfileChartNode);
      this.profileWidget.startup();


      this.selGraphicsLayer = new GraphicsLayer();
      this.map.addLayer(this.selGraphicsLayer);


      // Setup click handlers for all polyline layers
      var layerIds = this.map.graphicsLayerIds;
      array.forEach(layerIds, lang.hitch(this, function (id) {
        var l = this.map.getLayer(id);
        if (l && l.geometryType && l.geometryType === "esriGeometryPolyline") {
          l.on("click", lang.hitch(this, function (e) {
            if (e && e.graphic && e.graphic.geometry) {
              this.generateProfile(e.graphic.geometry);
            }
          }));
        }
      }));

      // also show elev profile when popup for polyline layers is clicked
      on(this.map.infoWindow, "selection-change", lang.hitch(this, function () {
        var sel = this.map.infoWindow.getSelectedFeature();
        if (sel && sel.geometry && sel.geometry.type === "polyline") {
          console.log(sel);
          this.generateProfile(sel.geometry);
        } else {
          this.clearProfileChart();
        }
      }));
    },
    generateProfileNoUnion: function (geometry){
      let temp = this.union;
      this.union = false;
      this.generateProfile(geometry);
      this.union = temp;
    },
    generateProfile: function (geometry) {
      console.log("Union"+ union);
      console.log(geometry);
      if(union && currentGeometry){
        geometry = geometryEngine.union(geometry, currentGeometry);
      }
      currentGeometry = geometry;
      this.geometry = geometry;
      var profileLine = geometry;
      if (profileLine) {
        try {
          this.profileWidget.set("profileGeometry", profileLine);
        } catch (error) {
          console.error(error);
          var message = "Unable to generate elevation profile. Service may be invalid or down.";
          alert(message);
        }

        // Add selected graphic to the map so we get a highlight symbol
        this.selGraphicsLayer.add(new Graphic(geometry, this.map.infoWindow.lineSymbol));
        this.emit("profile-generated");
      } else {
        console.log("Unable to generate profile");
      }

    },

    generateElevationInfo: function () {
      // generate elevation info
      var gainLossDetails = null;
      if (this.profileWidget && this.profileWidget._profileChart && this.profileWidget._profileChart._profileResults && this.profileWidget._profileChart._profileResults.elevations) {
        
        var elevations = this.profileWidget._profileChart._profileResults.elevations;
        var dataStats = this.profileWidget._profileChart._dataRangeStats || {};
        var yMaxSource = dataStats.yMax - (dataStats.yRange * 0.05);
        var yMinSource = dataStats.yMin + (dataStats.yRange * 0.05);
        var detailFormat = {
          places: 0
        };
        var elevFirst = elevations[0].y;
        var elevLast = elevations[elevations.length - 1].y;
        var gain = 0;
        var loss = 0;
        for(i = 1; i < elevations.length; i++){
          var diff = elevations[i].y - elevations[i-1].y;
          if(diff > 0) gain += diff;
          else if (diff < 0) loss += -diff;
        }

        gainLossDetails = {
          min: Number.format(yMinSource, detailFormat),
          max: Number.format(yMaxSource, detailFormat),
          start: Number.format(elevFirst, detailFormat),
          end: Number.format(elevLast, detailFormat),
          gainLoss: Number.format((elevLast - elevFirst), detailFormat),
          gain: Number.format(gain, detailFormat),
          loss: Number.format(loss, detailFormat)
        };
        return gainLossDetails;
      }
    },
    /* Private Methods */
    clearProfileChart: function () {
      //remove sel graphic from map
      this.profileWidget.clearProfile();
      // Clear any selected graphics
      this.selGraphicsLayer.clear();
    },

    toggleUnion: function () {
      union = !union;
      console.log("Union is "+union);
      this.emit("toggle-union");
      if(union){
        console.log(this.map.infoWindow);
      }
    }
  });
});