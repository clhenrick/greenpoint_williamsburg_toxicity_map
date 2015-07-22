var app = app || {};

app.map = (function(w, d, $, _) {    
    var sublayers = [], // For storing the cartodb sublayers
        sublayerActions = [], // for layer button interactions
        map_object;

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
        
        map_object = new L.Map('map', params);
        var accessToken = 'pk.eyJ1IjoiYm93b25jIiwiYSI6InFDV2RBNjAifQ._F8zZ-AkgNHp0_h2XKk9Pw';
        var mapid = 'bowonc.me27271c';
        //geocoding
        //map_object.addControl(L.mapbox.geocoderControl('mapbox.places'));

        //mapbox basemap
        var basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.png?access_token=' + accessToken)
                    .addTo(map_object);

        // attribute MapBox and OSM
        var attribution = new L.control.attribution({position: 'bottomright', prefix: false});
        attribution.addAttribution('<a href="https://www.mapbox.com/about/maps/">© Mapbox © OpenStreetMap</a>');
        attribution.addTo(map_object);
        
        //changing position of zoom control 
        // Add our zoom control manually where we want to
        var zoomControl = L.control.zoom({
            position: 'topright'
        });
        
        // zoom control to attach to it
        map_object.addControl(zoomControl);

        // layer meta-data for Layer Source Object to pass to cartodb.createLayer()
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
                sql: "SELECT * FROM asthma_2012_ct",
                cartocss: "#asthma_2012_ct{polygon-fill: #FFFFFF;polygon-opacity: 1;line-color: #666666;line-width: 0.5;line-opacity: .5;comp-op:multiply;}#asthma_2012_ct [ asthma >= 21 ][ asthma <= 35 ] {polygon-fill: #5a3072;}#asthma_2012_ct [ asthma <= 10][ asthma <= 20 ] {polygon-fill: #7a518b;}#asthma_2012_ct [ asthma <= 6][ asthma <= 9] {polygon-fill: #9c7aac;}#asthma_2012_ct [ asthma <= 1][ asthma <= 5] {polygon-fill: #bfa4cd;}#asthma_2012_ct [ asthma = 0] {polygon-fill: #FFFFFF;}"
            }]
        };

        var viz_json ="https://nag-brooklyn.cartodb.com/api/v2/viz/eebfa096-d35b-11e4-97b2-0e018d66dc29/viz.json";
        var cdb_options = {
                cartodb_logo: false, 
                legends: false,
                https: true 
              };

    cartodb.createLayer(map_object, layerSource, cdb_options)
        .addTo(map_object)
        .on('done', function(layer) {
            layer.setZIndex(5); // make sure the cartodb layer is on top.
            // console.log(layer);
            
            // get the number of sublayers
            var numSubLayers = layer.getSubLayerCount();
            for (var i = 0; i < numSubLayers; i++) {
                layer.getSubLayer(i).setInteraction(true);
                layer.getSubLayer(i).hide();
                sublayers.push(layer.getSubLayer(i));
            }

        }).on('error', function(error) {
            console.log('error with cartodb.createLayer: ', error);
        });

    // button interactions
    // call like: sublayerActions[i].layer_name();
    sublayerActions = {
        waste_transfer_stations : function() {
            hideShow('waste_transfer_stations', 0);
            return true;
        },
        polluted_points : function() {
            hideShow('polluted_points', 1);
            return true;
        },
        flood_risk : function() {
            hideShow('flood_risk', 2);
            return true;
        },
        polluted_polygons : function() {
            hideShow('polluted_polygons', 3);
            return true;
        },
        acs_pop : function() {
            hideShow('acs_pop', 4);
            return true;
        },
        acs_income : function() {
            hideShow('acs_income', 5);
            return true;
        },
        asthma : function() {
            hideShow('asthma', 6);
            return true;
        }
    };

    // hide or show the data layer
    function hideShow(id, index) {
        id = '#' + id;
        var $button = $(id);
        var layer = sublayers[index];

        if ($button.hasClass('selected')) {
            sublayers[index].hide();
            $button.removeClass('selected');
        } else if ($button.hasClass('selected') !== true) {
            
            // if a choropleth layer is already on, hide it.
            if (index >3 && index < 7) {
                for (var i = 4; i < 7; i++) {
                    sublayers[i].hide();
                    $($('.data-layer')[i]).removeClass('selected');
                }
            }

            sublayers[index].show();
            $button.addClass('selected');
        }
        return true;
    }

    // call the appropriate function when user clicks a button
    $('.data-layer').click(function() {
        sublayerActions[$(this).attr('id')]();
    });

    // clear all the layers
    $('.btn.clear').on('click', function(e) {
        e.preventDefault();
        sublayers.forEach(function(sublayer) {
            sublayer.hide();
        });
        $('.data-layer').removeClass('selected');
    });

    } //end of initmap 

    // set up custom zoom buttons
    var initZoomButtons = function(){
        $('#zoom-in').on('click', function(){
          map_object.zoomIn();
        });

        $('#zoom-out').on('click', function(){
          map_object.zoomOut();
        });
    };

    var init = function() {
        initMap();
        initZoomButtons();  
    };

    // only return init() and the stuff in the el object
    return {
        init: init,
        sublayers : sublayers,
        sublayerActions: sublayerActions
        //nag : nag 
    };

})(window, document, jQuery, _);

window.addEventListener('DOMContentLoaded', function() {
    app.map.init();
});