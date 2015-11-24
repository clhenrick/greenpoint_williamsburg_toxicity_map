var app = app || {};

app.interaction = (function(d, w, $) {
    // This module creates UI to map interactions on DOM elements

    function addToolTips() {
        // add jquery UI tooltips
        // we could probably do this without jQuery UI...
        $('.dlayer').tooltip({
            tooltipClass: "dlayer-tooltip"
        });
    }

    // create a static image of the map's current state option 1:
    // using the HTML 2 Canvas JS library: http://html2canvas.hertzen.com/
    // currently not working, as such I've removed the html2canvas.js file from being loaded in index.html
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

    // create a static image of the map's current state option 2:
    // ideally we would use CartoDB's Static Maps API to create a "screenshot" of the current map state
    // however there's currently a bug with it that needs to be resolved before it can be implemented: 
    // https://github.com/CartoDB/cartodb.js/issues/657
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

    // sets the height of the left UI & .menu.tabs to fit the user's browser window
    function setLeftUIheight() {
        
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

        // check screen size before applying active classs
        $(w).on('resize', checkScreenWidth )
    }

    function checkScreenWidth() {
        if (w.innerWidth <= 420 ) {

            $('#dlayer').removeClass('active');
            $('.tabs.dlayer').removeClass('active');

            $('#about').addClass('active');
            $('.tabs.about').addClass('active');
            
        } else {
            $('#dlayer').addClass('active');
            $('.tabs.dlayer').addClass('active');

            $('#about').removeClass('active');
            $('.tabs.about').removeClass('active');
        }
    }

    // get it all going...
    var init = function() {
        addToolTips();
        setLeftUIheight();
        addListeners();
        checkScreenWidth();
    };

    return {
        init: init
    };

})(document, window, jQuery);