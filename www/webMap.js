var view;
require([
    "esri/WebMap",
    "esri/views/MapView"
  ], function(WebMap, MapView) {
 
    var bcMap = new WebMap({
        portalItem: {
          id: "c03b4e93624f4ae6a775a3ff78128dd5"
        }
      });
      
      view = new MapView({
        container: "viewDiv",
        //*** UPDATE ***//
        map: bcMap,
        center: [-113.76854,48.63929],
        zoom: 9
      });

});