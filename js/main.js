var app = app || {};

app.map = (function(w, d, $, H) {    
    var sublayers = [], // For storing the cartodb sublayers
        sublayerActions = [], // for layer button interactions
        map_object,
        legend_data = app.legends.data,
        layerSource = app.layers,
        carto = app.cartocss,
        hb_source = d.getElementById('legend-template').innerHTML,
        hb_template = H.compile(hb_source),
        hb_data = [];

    // register handlebars helpers for rendering legends
    H.registerHelper('each', function(context, options) {
        var ret = "";
        for(var i=0, j=context.length; i<j; i++) {
          ret = ret + options.fn(context[i]);
        }
        return ret;
    });

    H.registerHelper('if', function(conditional, options) {
        if (conditional) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
    });        

    function initMap() {
        // map paramaters to pass to Leaflet
        var southWest = L.latLng(40.679628, -74.089720),
            northEast = L.latLng(40.755792, -73.856475),
            bounds = L.latLngBounds(southWest, northEast);

        //screen resolution setting for map user 
        var zoomStart = 14; //defualt setting for 1440*900

       function zoomStartSetting(){
        //screen resolutions
        //1920x1080   1366x768    1280x1024   1280x800    1024x768    800x600
        var defaultWidth = 1280;
        var defualtHeight = 1024; 
        var screenWidth = $(window).width(); //get the current screen width
        var screenHeight = $(window).height(); //get the current screen height
       }

        var params = {
            center: [40.7237442, -73.9532883], //Greenpoint
            zoomControl: false,
            zoom: zoomStart,
            maxZoom: 19,
            minZoom: 12,
            scrollwheel: disable,
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
        var mapid = 'bowonc.n26oid7e';
        //geocoding
        //map_object.addControl(L.mapbox.geocoderControl('mapbox.places'));
        var attr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
        //mapbox basemap
        var basemap = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.png?access_token=' + accessToken, 
        {attribution: attr}
        ).addTo(map_object);
    
    } // end init map


    function initCartoDBLayers() {
        var viz_json ="https://nag-brooklyn.cartodb.com/api/v2/viz/eebfa096-d35b-11e4-97b2-0e018d66dc29/viz.json";
        var cdb_options = {
                cartodb_logo: false,
                legends: false,
                https: true,
                attributionControl: true
        };

        cartodb.createLayer(map_object, layerSource, cdb_options)
            .addTo(map_object)
            .on('done', function(layer) {
                layer.setZIndex(5); // make sure the cartodb layer is on top.

                // get the number of sublayers
                var numSubLayers = layer.getSubLayerCount();
                for (var i = 0; i < numSubLayers; i++) {
                    layer.getSubLayer(i).setInteraction(true);
                    layer.getSubLayer(i).hide();
                    sublayers.push(layer.getSubLayer(i));

                    var fields = layerSource.sublayers[i].interactivity.split(",");

                    cartodb.vis.Vis.addInfowindow(
                        map_object, 
                        layer.getSubLayer(i),
                        fields
                    );
                }

            }).on('error', function(error) {
                console.log('error with cartodb.createLayer: ', error);
            });
    }  

    // button interactions object
    // call like: sublayerActions[i].layer_name();
    sublayerActions = {
        acs_pop : function() {
            hideShow('acs_pop', 0);
            return true;
        },
        acs_income : function() {
            hideShow('acs_income', 1);
            return true;
        },
        asthma : function() {
            hideShow('asthma', 2);
            return true;
        },
        flood_risk : function() {
            hideShow('flood_risk', 3);
            return true;
        },
        polluted_polygons : function() {
            hideShow('polluted_polygons', 4);
            return true;
        },
        polluted_points : function() {
            hideShow('polluted_points', 5);
            return true;
        },
        waste_transfer_stations : function() {
            hideShow('waste_transfer_stations', 6);
            return true;
        }
    };

    // hide or show the data layer
    function hideShow(id, index) {
        var id_hash = '#' + id, // the button id
            $button = $(id_hash), // the css id of the selected button
            $buttons = $('.data-layer'), // the ui buttons for sublayers
            $legends = $('.legend.dl'), // the sublayer legends currently displayed
            layer = sublayers[index], // the sublayer data,
            sublayer_len = sublayers.length;

        console.log('hideShow id: ', id, ' index: ', index);

        // if the layer is already selected turn it off
        if ($button.hasClass('selected')) {
            sublayers[index].hide();
            removeLegend(index);
            $button.removeClass('selected active pressed');
        
        } else if (!$button.hasClass('selected')) {
            // otherwise turn it on
            sublayers[index].show();
            renderLegend(index);
            $button.addClass('selected active pressed');
        }

        // determine if the index is for a choropleth layer
        if (index >= 0 && index < 3) {
            // remove other choropleth legends & layers if they are displayed
            for (var i=0; i<3; i++) {
                console.log('i: ', i);

                if ($('#legend-' + i).length && i !== index) {
                    removeLegend(i);
                    sublayers[i].hide();                 
                }

                if (i !== index) { 
                    var id2 = '#' + $('.data-layer')[6-i].getAttribute('id');
                    $(id2).removeClass('selected active pressed');
                }
                                
            }
        }
        
        return true;
    }

    var legendIndex =[];
    
    // renders the data layer's legend
    function renderLegend(index) {
        var data = legend_data[index];
        //console.log(data);
        data.id = index;
        console.log(index.id);
        function passData() {            
            var html = hb_template(data);
            $('.map-legends').append(html);
        }

        function resizeLegendContainer() {
            var h1 = $('.map-legends').innerHeight(),
                h2 = $('.legend-sources').innerHeight(),
                total = h1 + h2 + 10;
            $('#map-legend-container').innerHeight(total);
        }

        passData();
        resizeLegendContainer();
    }

    function removeLegend(index) {
        var target = $('#legend-' + index),
            lcontainer = $('#map-legend-container'),
            tHeight = target.innerHeight(),
            lHeight = lcontainer.innerHeight();

        target.remove();
        lcontainer.innerHeight(lHeight - tHeight);
    }

    /* event listeners */
    // call the appropriate function when user clicks a button
    $('.data-layer').click(function() {
        var layer = $(this).attr('id');
        console.log('clicked button: ', layer);
        sublayerActions[layer]();
    });

    // clear all the layers
    $('.nextsteps .clear').on('click', function(e) {
        e.preventDefault();
        sublayers.forEach(function(sublayer) {
            sublayer.hide();
        });
        $('.data-layer').removeClass('selected pressed active');
    });

    // set up custom zoom buttons
    var initZoomButtons = function(){
        $('#zoom-in').on('click', function(){
          map_object.zoomIn();
        });

        $('#zoom-out').on('click', function(){
          map_object.zoomOut();
        });
    };


    /* get it all going! */
    var init = function() {
        initMap();
        initCartoDBLayers();
        initZoomButtons();
       // zoomStartSetting();
    };


    return {
        init: init,
        sublayers : sublayers,
        sublayerActions: sublayerActions,
        hideShow : hideShow,
        renderLegend : renderLegend
    };

})(window, document, jQuery, Handlebars);

window.addEventListener('DOMContentLoaded', function() {
    app.map.init();
   // app.interaction.init();
});