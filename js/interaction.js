var app = app || {};

app.interaction = (function(d, w, $) {
    // This module creates non-map interaction UI elements and event listeners

    function addToolTips() {
        // add jquery UI tooltips
        // we could probably do this without jQuery UI...
        $('.dlayer').tooltip({
            tooltipClass: "dlayer-tooltip"
        });
    }

    // implements the HTML 2 Canvas JS for a user to print the current map view
    // currently not working
    function screenshot() {        
        if (screen.width > 0 && screen.height > 0) {
            try {
                html2canvas(document.body, {
                    allowTaint: false,
                    logging: true,
                    taintTest: false,
                    useCORS: true,
                    onrendered: function(canvas) {
                        // canvas is the final rendered <canvas> element
                        var cap = canvas.toDataURL();
                        window.open(cap);
                    }
                });
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    // ideally we would use the Static Maps API to create a "screenshot" of the current map state
    // however there's currently a bug with it that needs to be resolved: https://github.com/CartoDB/cartodb.js/issues/657
    function cdbStaticMap() {
        var basemap = {
            type: "http",
            options: {
                urlTemplate : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c']
            }
        };

        var layerSource = app.layers;

        cartodb.Image(layerSource, {
            basemap : basemap,
            override_bbox : true
        })
        .size(1200, 900)
        .center([40.718640, -73.950605])
        .zoom(14)
        .getUrl(function(err, url) {
            if (err) console.log('error: ', err);
            console.log('image url: ', url);
        });        
    }    

    function setLeftUIheight() {
        // sets the height of the left UI & .menu.tabs
        var wh = $(w).innerHeight(),
              fh = $('footer').innerHeight(),
              hh = $('.menu.header').innerHeight(),
              tnh = $('.menu.top-nav').innerHeight(),
              $uiLeft = $('.ui-left'),
              uiLeftPaddingTop = $uiLeft.css('padding-top').replace('px', ''),
              $menuTabs = $('.menu.tabs'),
              mtHeight = wh - hh - tnh - fh - uiLeftPaddingTop;

        $uiLeft.height(wh);
        $menuTabs.height(mtHeight);
    }

    // adds the event listeners to the non-map interactions UI
    function addListeners() {
        // listener to create a screenshot, currently disabled.
        $('#print_b').click(function() {
            // screenshot();
        });

        $(w).on('resize', setLeftUIheight);

        // listener to hide / show data layer UI & other content
        $('li.nav').click(function() {
            var c = $(this).attr('id'),
                menu_tabs = $('.tabs');

            $('li.nav').removeClass('active');
            
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
            } 

            $.each(menu_tabs, function(i, el) {
                var $el = $(el);

                $el.removeClass('active');

                if ($el.attr('class') === "menu tabs " + c) {
                    $(this).addClass('active');
                } 
            });
        });
    }


    // to do: check screen size before applying active class?
    // initially open map layer selection UI for dev debugging. remove this code when ready for production.
    $('.menu.tabs.dlayer').addClass('active');
    $('.nav.dlayer').addClass('active');

    // get it all going...
    var init = function() {
        addToolTips();
        setLeftUIheight();
        addListeners();
    };

    return {
        init: init
    };

})(document, window, jQuery);