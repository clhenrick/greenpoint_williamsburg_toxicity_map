var app = app || {};

app.map = (function(w, d, $, _) {

    function initMap() {
            // map paramaters to pass to Leaflet
            var southWest = L.latLng(40.703, -73.971),
                northEast = L.latLng(40.737, -73.931),
                bounds = L.latLngBounds(southWest, northEast);
            var params = {
                center: [40.7237442, -73.9532883], //Greenpoint
                zoom: 14,
                maxZoom: 19,
                minZoom: 12,
                maxBounds: bounds,
                legends: true,
                zoomControl: false,
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
            var map_object = new L.Map('map', params);
            var accessToken = 'pk.eyJ1IjoiYm93b25jIiwiYSI6InFDV2RBNjAifQ._F8zZ-AkgNHp0_h2XKk9Pw';
            var mapid = 'bowonc.me27271c';
            var basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.png?access_token=' + accessToken).addTo(map_object);
            //changing position of zoom control 
            // Add our zoom control manually where we want to
            var zoomControl = L.control.zoom({
                position: 'topright'
            });
            // zoom control to attach to it
            map_object.addControl(zoomControl);




            // Put layer data into a JS object
            var layerSource = {
                user_name: 'nag-brooklyn',
                type: 'cartodb',
                sublayers: [{
                    sql: "SELECT * FROM table_2020_projected_flood_risk",
                    cartocss: '#table_2020_projected_flood_risk{polygon-fill: #41b6c4;polygon-opacity: 0.6;polygon-comp-op: darken;line-color: #FFF;line-width: 0.5;line-opacity: 0;}'
                }, {
                    sql: "SELECT * FROM local_truck_route_cd1",
                    cartocss: '#local_truck_route_cd1{line-color: #9c9c9c;line-width: 2;line-opacity: 0.7;}'
                }, {
                    sql: "SELECT * FROM polluted_polygons_w_remediated",
                    cartocss: '#polluted_polygons_w_remediated {polygon-opacity: 0.7;line-color: #FFF;line-width: 0;line-opacity: 0.6;}#polluted_polygons_w_remediated[nag_id=1] {polygon-fill: #456666;}#polluted_polygons_w_remediated[nag_id=2] {polygon-fill: #338787;}#polluted_polygons_w_remediated[nag_id=3] {polygon-fill: #229A00;}'
                }, {
                    sql: "SELECT * FROM acs_5yr_2013",
                    cartocss: '#acs_5yr_2013{ polygon-fill: #ECF0F6;polygon-opacity: 0.4;polygon-comp-op: overlay;line-color: #FFF;line-width: 0;line-opacity: 0.4;}#acs_5yr_2013 [ mhhi <= 100089] {polygon-fill: #43618F;}#acs_5yr_2013 [ mhhi <= 73171] {polygon-fill: #4E71A6;}#acs_5yr_2013 [ mhhi <= 68646] {polygon-fill: #6182B5;}#acs_5yr_2013 [ mhhi <= 62986] {polygon-fill: #849EC5;}#acs_5yr_2013 [ mhhi <= 49405] {polygon-fill: #9BB0D0;}#acs_5yr_2013 [ mhhi <= 30637] {polygon-fill: #B2C2DB;}#acs_5yr_2013 [ mhhi <= 23415] {polygon-fill: #ECF0F6;}'
                }, {
                    sql: "SELECT * FROM polluted_points where nag_id= 7",
                    cartocss: '#polluted_points{marker-width: 12;marker-fill: #5CA2D1;marker-line-width: 1.5;marker-fill-opacity: 1;marker-line-opacity: 1;marker-line-color: #fff;marker-allow-overlap: true;}'
                }, {
                    sql: "SELECT * FROM polluted_points where nag_id= 8",
                    cartocss: '#polluted_points{marker-width: 12;marker-fill: #00A2D1;marker-line-width: 1.5;marker-fill-opacity: 1;marker-line-opacity: 1;marker-line-color: #fff;marker-allow-overlap: true;}'
                }, {
                    sql: "SELECT * FROM polluted_points where nag_id= 9",
                    cartocss: '#polluted_points{marker-width: 12;marker-fill: #5C00D1;marker-line-width: 1.5;marker-fill-opacity: 1;marker-line-opacity: 1;marker-line-color: #fff;marker-allow-overlap: true;}'
                }, {
                    sql: "SELECT * FROM polluted_points where nag_id= 10",
                    cartocss: '#polluted_points{marker-width: 12;marker-fill: #5CA200;marker-line-width: 1.5;marker-fill-opacity: 1;marker-line-opacity: 1;marker-line-color: #fff;marker-allow-overlap: true;}'
                }]
            };
            // For storing the sublayers
            //mapbox basemap
            var sublayers = [];

            // Add data layer to your map
            cartodb.createLayer(map_object, layerSource)
                .addTo(map_object)
                .done(function(layer) {
                    //console.log(layer.getSubLayerCount());
                    for (var i = 0; i < layer.getSubLayerCount(); i++) {
                        sublayers[i] = layer.getSubLayer(i);
                        sublayers[i].infowindow.set('template', $('#infowindow_template').html());
                        sublayers[i].hide();
                    }
                })
                .error(function(err) {
                    console.log("error: " + err);
                });
 


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
                    if (ids === 'nycd_url') {
                        color = "#002673";
                        weight = 6;
                    } else if (ids === 'local_truck') {
                        color = "#ffecf8";
                        weight = 1;
                    } else if (ids === 'ttruck_url') {
                        color = "#deacd3";
                        weight = 2;
                    } else if (ids === 'zip_url') {
                        color = "#c2bcbc";
                        weight = 2;
                    }
                    polys.setStyle({
                        color: color,
                        fillOpacity: 0,
                        lineCap: 'ellipse',
                        opacity: .3,
                        weight : weight
                    });
                }); //ef_eachlayer 
            }); //eo_getjson
    } // eof  

    function initButton(){
          $('.button').click(function() {
    $('.button').removeClass('selected');
    $(this).addClass('selected');
    //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
    LayerActions[$(this).attr('id')]();
  });
    }

    //load geojson of nycd
    function initStaticlayers() {
        /*static layers */
        var queries = {
            queries: [{
                id: 'nycd_url',
                query: "https://nag-brooklyn.cartodb.com/api/v2/sql?format=geojson&q=SELECT * FROM nycd_2015 where borocd = 301&api_key=e0ff9a25a3dbac01f2bb2eb8b30e8af922282856"
            }, {
                id: 'local_truck',
                query: "https://nag-brooklyn.cartodb.com/api/v2/sql?format=geojson&q=SELECT * FROM local_truck_route_cd1&api_key=e0ff9a25a3dbac01f2bb2eb8b30e8af922282856"
            }, {
                id: 'ttruck_url',
                query: "https://nag-brooklyn.cartodb.com/api/v2/sql?format=geojson&q=SELECT * FROM through_truck_routes_nyc_september_2009 ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint( -73.945812,40.717283),4326) ASC LIMIT 4000&api_key=e0ff9a25a3dbac01f2bb2eb8b30e8af922282856"
            }, {
                id: 'zip_url',
                query: "https://nag-brooklyn.cartodb.com/api/v2/sql?format=geojson&q=SELECT*FROM nyc_zip_code_tabulation_areas_polygons ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint( -73.945812,40.717283),4326) ASC LIMIT 30&api_key=e0ff9a25a3dbac01f2bb2eb8b30e8af922282856"
            }]
        };
        for (var i=0; i < 4; i++) {
            var urls = queries.queries[i].query;
            var ids = queries.queries[i].id;
            load_geojson(ids,urls);
        }
    }
// for estimated traffic issue at Cartodb Server, let's off initStaticlayers() for a while.
    //initStaticlayers();
    } //end of initmap 

    var init = function() {
        initMap();

        //initButtons();
        //initCheckboxes();
        //searchAddress();
        //initZoomButtons();
        //app.intro.init();    
    };

    // only return init() and the stuff in the el object
    return {
        init: init
            //el : el
    };
})(window, document, jQuery, _);

window.addEventListener('DOMContentLoaded', function() {
    app.map.init();
});