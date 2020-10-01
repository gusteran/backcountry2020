const DATABASE_LINK = 'http://localhost:3000/db';

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
    },

    /* Public Methods */
    setup: function () {
      var profileParams = {
        map: this.map,
        profileTaskUrl: this.profileTaskUrl,
        scalebarUnits: this.scalebarUnits,
        chartOptions: this.chartParams
      };

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
          console.log(sel.attributes.TRLNAME);
        }
      }));

    },
    toggleUnion: function () {
      this.union = !this.union;
      console.log(this.union);
    },
    testJsonRest: function (JsonRest) {
      this.store = new JsonRest({target: DATABASE_LINK});
      this.store.get();
      // fetch(DATABASE_LINK)
      // .then(data => console.log(data));
    }
  });
});