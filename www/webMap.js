var view;
require(["esri/WebMap","esri/views/MapView","esri/widgets/Legend","esri/widgets/ScaleBar"], function(WebMap, MapView, Legend, ScaleBar) {
 
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

      var legend = new Legend({
        view: view
      });

      var scalebar = new ScaleBar({
        view: view
      });

      view.when(function() {
        view.ui.add(legend, "top-right");
        view.ui.add(scalebar, "bottom-left");
      });
});