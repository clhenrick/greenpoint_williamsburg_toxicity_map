var app = app || {};

app.map = (function(w, d, $, _) {

    function initMap() {
            // map paramaters to pass to Leaflet
            var southWest = L.latLng(40.703, -73.971),
                northEast = L.latLng(40.737, -73.931),
                bounds = L.latLngBounds(southWest, northEast);
            var params = {
                center: [40.7237442, -73.9532883], //Greenpoint
                zoomControl: false,
                zoom: 14,
                maxZoom: 19,
                minZoom: 12,
                maxBounds: bounds,
                legends: true,
                cartodb_logo: false,
                infoControl: false,
                attributionControl: true
            };
            /***  multiple popup at once 
            http://jsfiddle.net/paulovieira/yVLJf/
            ***/

            L.Map = L.Map.extend({

                openPopup: function(popup) {
                    //        this.closePopup();  // just comment this
                    this._popup = popup;

                    return this.addLayer(popup).fire('popupopen', {
                        popup: this._popup
                    });
                }
            });
            //mapbox basemap
            var map_object = new L.Map('map', params);
            var accessToken = 'pk.eyJ1IjoiYm93b25jIiwiYSI6InFDV2RBNjAifQ._F8zZ-AkgNHp0_h2XKk9Pw';
            var mapid = 'bowonc.me27271c';
            //geocoding
            //map_object.addControl(L.mapbox.geocoderControl('mapbox.places'));

            var basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.png?access_token=' + accessToken)
                        .addTo(map_object);
            //changing position of zoom control 
            // Add our zoom control manually where we want to
            var zoomControl = L.control.zoom({
                position: 'topright'
            });
            // zoom control to attach to it
            map_object.addControl(zoomControl);
            //It's not working. Why? 
  
            // Put layer data into a JS object
            var layerSource = {
                user_name: 'nag-brooklyn',
                type: 'cartodb',
                sublayers: [{
                    sql: "SELECT * FROM waste_transfer_stations", 
                    cartocss: "#waste_transfer_stations{marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0.5;marker-line-opacity: 0.5;marker-placement: point;marker-type: ellipse;marker-width: 5;marker-fill: #a00002;marker-allow-overlap: true;}"
                }, {
                    sql: "SELECT * FROM polluted_points",
                    cartocss: "#polluted_points {marker-fill-opacity: 0.9;marker-line-color: #FFFFFF;marker-line-width: .5;marker-line-opacity: .7;marker-placement: point;marker-type: ellipse;marker-width: 5;marker-allow-overlap: false;}#polluted_points[nag_id=10] {marker-fill: #7b0006;}#polluted_points[nag_id=7] {marker-fill: #fba782;}#polluted_points[nag_id=8] {marker-fill: #aa04ee;}#polluted_points[nag_id=9] {marker-fill: #e171fb;}"
                }, {
                    sql: "SELECT * FROM table_2020_projected_flood_risk", 
                    cartocss: "#table_2020_projected_flood_risk{polygon-fill: #2E5387;polygon-opacity: 0.3;polygon-comp-op: multiply;line-color: #bfd1ff;line-width: 0.3;line-opacity: 0;}"
                }, {
                    sql: "SELECT * FROM polluted_polygons_w_remediated_1",
                    cartocss: "#polluted_polygons_w_remediated_1 {polygon-opacity: 0.7;line-color: #FFF;line-width: 0.5;line-opacity: 0;}#polluted_polygons_w_remediated_1[nag_id=1] {polygon-fill:#feb9f0;}#polluted_polygons_w_remediated_1[nag_id=2] {polygon-fill: #feff83;}#polluted_polygons_w_remediated_1[nag_id=3] {polygon-fill: #f3cc81;}"
                }, {
                    sql: "SELECT * FROM acs_5yr_2013",
                    cartocss: "#acs_5yr_2013{polygon-fill: #b6edf0;polygon-opacity: 0.8;polygon-comp-op: multiply;line-color: #f5f5f5;line-width: 0.1;line-opacity: .5;}#acs_5yr_2013 [roundedcpop >75001]{polygon-fill: #090991;}#acs_5yr_2013 [roundedcpop >55001][ roundedcpop <= 75000] {polygon-fill: #1d44b8;}#acs_5yr_2013 [roundedcpop > 40001][ roundedcpop <= 55000] {polygon-fill: #1f83e0;}#acs_5yr_2013 [roundedcpop > 25001][ roundedcpop <= 40000] {polygon-fill: #74b4e8;}#acs_5yr_2013 [roundedcpop >24508][ roundedcpop <= 25000] {polygon-fill: #b6edf0;}"
                }, {
                    sql: "SELECT * FROM acs_5yr_2013",
                    cartocss: "#acs_5yr_2013{polygon-fill: #ECF0F6;polygon-opacity: 0.8;polygon-comp-op: multiply;line-color: #000000;line-width: 0.5;line-opacity: 0.1;}#acs_5yr_2013 [rounded_mhhi > 75001]{polygon-fill: #216437;}#acs_5yr_2013 [rounded_mhhi > 65001][rounded_mhhi <= 75000]{polygon-fill: #4f8759;}#acs_5yr_2013 [rounded_mhhi > 50001][rounded_mhhi <= 65000]{polygon-fill: #75ab7e;}#acs_5yr_2013 [rounded_mhhi > 25001][rounded_mhhi <= 50000]{polygon-fill: #a5d0b4;}#acs_5yr_2013 [rounded_mhhi > 0 ][rounded_mhhi <= 25000] {polygon-fill: #dcf5e8;}"
                }, {
                    sql: "SELECT * FROM asthma_2012_ct",//population density
                    cartocss: "#asthma_2012_ct{polygon-fill: #FFFFFF;polygon-opacity: 1;line-color: #666666;line-width: 0.5;line-opacity: .5;comp-op:multiply;}#asthma_2012_ct [ asthma >= 21 ][ asthma <= 35 ] {polygon-fill: #5a3072;}#asthma_2012_ct [ asthma <= 10][ asthma <= 20 ] {polygon-fill: #7a518b;}#asthma_2012_ct [ asthma <= 6][ asthma <= 9] {polygon-fill: #9c7aac;}#asthma_2012_ct [ asthma <= 1][ asthma <= 5] {polygon-fill: #bfa4cd;}#asthma_2012_ct [ asthma = 0] {polygon-fill: #FFFFFF;}"
                }]
            };
            // For storing the sublayers
            var sublayers = [];

            var fld_url ="https://nag-brooklyn.cartodb.com/api/v2/viz/eebfa096-d35b-11e4-97b2-0e018d66dc29/viz.json";
            // Add data layer to your map
//for all layers
//cartodb.createLayer(map_object, layerSource, { 
cartodb.createLayer(map_object, fld_url)
    .addTo(map_object)
    .done(function(layer) {
 
        for (var i = 0; i < layer.getSubLayerCount(); i++) {
            sublayers[i] = layer.getSubLayer(i);
            sublayers[i].infowindow.set('template', $('#infowindow_template').html());
            sublayers[i].hide();
            //alert("Congrats, you added sublayer #" + i + "!");
        }
        $('#sublayer1').click(function() {
            $('.btn').removeClass('selected');
            sublayers[0].show(); //baselayer
            sublayers[1].show();
            sublayers[2].show();
            basemap.bringToBack();
        });
    })
    .error(function(err) {
        console.log("error: " + err);
    });


 /*
    $('.btn').click(function() {
        $('.btn').removeClass('selected');
        $(this).addClass('selected');
        var ids= $(this).attr('id');
        //Layers[ids]();
        console.log(ids);
    });
*/

    function load_geojson(ids,url) {
        var styles = {
            color: '#f5ebf3',
            opacity: 1,
            weight: 2,
            fillOpacity: 0,
            lineCap: 'ellipse'
        };
        $.getJSON(url, function(json, textStatus) {
            polys = L.mapbox.featureLayer(json);
            polys.addTo(map_object);
            //polys.setStyle(styles);
            polys.eachLayer(function(layer) {
                var color = "#B8B8B8";
                var weight = "1";
                if (ids === 'zip_url') {
                    color = "#aeaeae"; //c2bcbc
                    weight = 1;
                    opacity = 0.8;
                    fillOpacity= 0;
                } else if (ids === 'local_truck') {
                    color = "#f8d8e6";
                    weight = 2;
                    opacity = 0.5;
                    fillOpacity = 0;
                } else if (ids === 'ttruck_url') {
                    color = "#deacd3";
                    weight = 3;
                    opacity = 0.4;
                    fillOpacity = 0;
                } else if (ids === 'nycd_url') {
                    color = "#788ab0";
                    weight = 6;
                    opacity = 1;
                    fillOpacity = 0;
                }
                polys.setStyle({
                    color: color,
                    fillOpacity: fillOpacity,
                    lineCap: 'ellipse',
                    opacity: opacity,
                    weight : weight
                });
            }); //ef_eachlayer 
        }); //eo_getjson
    } // eof  

    var c_id = "nag-brooklyn";
    var c_geojson = "format=geojson&q=";
    var c_k1 = "3f9ce315e";
    var c_k2 = "95db0a5eb7";
    var c_k3 = "c44f38bd534dad54850";
    var c_key = "&api_key=" + c_k1 +"a"+ c_k2 +c_k3+"d";//just a minimum security for now
    var c_url = "https://"+c_id+".cartodb.com/api/v2/sql?"+c_geojson;


    //load geojson of nycd
    function initStaticlayers() {
        /*static layers : should be coded */
        var queries = {
            queries: [{
                id: 'ttruck_url',
                query: c_url+"SELECT * FROM through_truck_dissolve"+c_key
            },{
                id: 'local_truck',
                query: c_url+"SELECT the_geom FROM local_truck_route_cd1"+c_key
            },{
                id: 'nycd_url',
                query: c_url+"SELECT the_geom FROM nycd_2015 where borocd = 301"+c_key
            },{
                id: 'zip_url',
                query: c_url+"SELECT the_geom FROM nyc_zip_code_tabulation_areas_polygons ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint( -73.945812,40.717283),4326) ASC LIMIT 30"+c_key
            }] //keep this order to make the ttruck route placed at the under the other layers.
        };
      for (var i=0; i < 4; i++) {
            var urls = queries.queries[i].query;
            var ids = queries.queries[i].id;
            load_geojson(ids,urls);
            console.log(ids);
        }
    }
    //initStaticlayers();

// for estimated traffic issue at Cartodb Server, let's off initStaticlayers() for a while.
/*
     var Layers = { 
        sublayer1: sub1, //call polluted sites 
        sublayer2: sub2,
        sublayer3: sub3,
        sublayer4: sub4,
        sublayer5: sub5,
        sublayer6: sub6,
        sublayer7: sub7
    };//end of Layeractions


*/
    //button interaction 

    }//end of initmap 

function searchAddress(){   
    console.log("searchbox");
}
    var init = function() {
        initMap();
        searchAddress();
        //initZoomButtons();
        //app.intro.init();    
    };

    // only return init() and the stuff in the el object
    return {
        init: init
        //nag : nag 
    };
})(window, document, jQuery, _);

window.addEventListener('DOMContentLoaded', function() {
    app.map.init();
});