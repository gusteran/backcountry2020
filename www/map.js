  var view;
  //Modified code from ArcGIS API for Developers Website: https://developers.arcgis.com/javascript/latest/guide/create-a-starter-app/
  require(["esri/Map", "esri/views/MapView","esri/layers/FeatureLayer"], function (Map, MapView, FeatureLayer) {
    var boundaryLayer = new FeatureLayer({
      url:
      "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/GLAC_Boundary2017/FeatureServer"
      //renderer: boundaryLayerRenderer 
    });
    
    var trailLayer = new FeatureLayer({
      url:
      "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/2019_GLAC_Trails/FeatureServer"
    });
    
    var map = new Map({
      basemap: "topo-vector",
      layers: [trailLayer,boundaryLayer]
    });

    view = new MapView({ //
      container: "viewDiv",
      map: map,
      center: [-113.795, 48.648], // Glacier National Park longitude and latitude
      zoom: 9
    });

    // Need to ask Richard for URL 
    /*var campLayer = new FeatureLayer({
      url:
      ""
    });*/
    view.when(function() {
      map.layers.addMany([trailLayer,boundaryLayer/*,campLayer8*/]);
    });
  });