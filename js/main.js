var app = app || {};

app.map = (function(w, d, $, H) {    
    var sublayers = [], // For storing the cartodb sublayers
        sublayerActions = [], // for layer button interactions
        map_object,
        legend_data = app.legends,
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

        var params = {
            center: [40.718640, -73.950605], //Greenpoint
            zoomControl: false,
            zoom: zoomStart,
            maxZoom: 19,
            minZoom: 12,
            scrollwheel: false,
            maxBounds: bounds,
            legends: true,
            infoControl: false,
            attributionControl: true
        };
        
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

    // grab the data-layers from cartodb
    function initCartoDBLayers() {        
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

                    var fields = layerSource.sublayers[i].interactivity.trim().split(",");

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

    // gets a data-layer's index or id from the cartodb sublayer array
    function getSubLayerIndex(val) {
        var idx = null;
        if (typeof val === 'number') {                    
            layerSource.sublayers.forEach(function(d,i){
                if (val === i) {
                    idx = d.name;
                }
            });
        } else {            
            layerSource.sublayers.forEach(function(d,i){
                if (d.name === val) {
                    idx = i;
                }
            });
        }
        return idx;
    }

    // hide or show the data layer
    function hideShow(id) {
        var id_hash = '#' + id, // the button id
            $button = $(id_hash), // the css id of the selected button
            $buttons = $('.data-layer'), // the ui buttons for sublayers
            $legends = $('.legend.dl'), // the sublayer legends currently displayed
            layer = sublayers[index], // the sublayer data,
            sublayer_len = sublayers.length,
            index = getSubLayerIndex(id);

        // if the layer is already selected turn it off
        if ($button.hasClass('selected')) {
            sublayers[index].hide();
            removeLegend(id);
            $button.removeClass('selected active pressed');
        
        } else if (!$button.hasClass('selected')) {
            // otherwise turn it on
            sublayers[index].show();
            renderLegend(id);
            $button.addClass('selected active pressed');
        }

        // determine if the index is for a choropleth layer
        if (index >= 0 && index < 3) {
            // remove other choropleth legends & layers if they are displayed
            for (var i=0; i<3; i++) {
                
                var x = getSubLayerIndex(i);
                
                if ($('#legend-' + x).length && i !== index) {
                    removeLegend(x);
                    sublayers[i].hide();                 
                }

                if (i !== index) { 
                    var id2 = '#' + $('.data-layer')[6 - i].getAttribute('id');
                    $(id2).removeClass('selected active pressed');
                }
               
            }
        }
        
        return true;
    }

    var legendIndex =[];
    
    // renders the data-layer's legend
    function renderLegend(id) {
        var data = legend_data[id];
        data.id = id;
        console.log(data);
        
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

    // removes the data-layer's legend
    function removeLegend(id) {
        var target = $('#legend-' + id),
            lcontainer = $('#map-legend-container'),
            tHeight = target.innerHeight(),
            lHeight = lcontainer.innerHeight();

        target.remove();
        lcontainer.innerHeight(lHeight - tHeight);
    }

    /*** 
        Map Interaction Event Listeners 
    ***/

    // load the appropriate data-layer on its corresponding button click
    $('.data-layer').click(function() {
        var layer = $(this).attr('id');
        console.log('clicked button: ', layer);
        hideShow(layer);
    });

    // clear all the layers
    $('.nextsteps .clear').on('click', function(e) {
        e.preventDefault();
        sublayers.forEach(function(sublayer,i) {
            sublayer.hide();
            var id = getSubLayerIndex(i);
            removeLegend(id);
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

    // stuff that's publicly accessible outside the module
    return {
        init: init,
        sublayers : sublayers,
        sublayerActions: sublayerActions,
        hideShow : hideShow,
        renderLegend : renderLegend,
        getSubLayerIndex : getSubLayerIndex
    };

})(window, document, jQuery, Handlebars);

window.addEventListener('DOMContentLoaded', function() {
    app.map.init();
   // app.interaction.init();
});