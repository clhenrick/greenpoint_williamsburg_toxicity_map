var app = app || {};

app.interaction = (function(d, w, $) {
    // This module creates non-map interaction UI elements and event listeners

    // descriptions of the data layers to append to the "About the data" in the DOM
    var desc = [
        {
            title: "Waste Transfer Stations",
            field: "This layer shows waste transfer stations, scrap metal facilities, and recycling sorting facilities. A waste transfer station is a facility that receives solid waste from waste collection vehicles, and it is transferred to larger tractor-trailers or marine barges to be taken to a processing facility outside of the city. These types of facilities are typically associated with truck traffic dropping off or picking up waste or recycling, and contribute to air pollution and truck congestion in Williamsburg and Greenpoint.The Newtown Creek Wastewater Treatment Plant is also considered on this map for its daily transfer of wastewater sludge to a marine barge, and will be receiving truckloads of organic food waste to be processed at the plant."
        }, {
            title: "Polluted Sites",
            field: "An (E) designation comes from rezoning to notify an environmental requirement on a particular lot. The (E) designations in this map are lots that are required to address potential hazardous material contamination or air quality concerns (high ambient noise level (E) designations were omitted from this map) if the lot undergoes new construction or change in land use. An (E) designation does not signify pollution, but rather the potential for exposure to hazard material contamination or pollutants in ambient air quality. More information can be found on the NYC Office of Environmental Remediation’s website (http://www.nyc.gov/html/oer/html/e-designation/e-designation.shtml) <br/>Selected EPA sites: The EPA compiles sites that have regulation requirements through their Facility Registry Service. Facilities in this database must report to a variety of EPA programs, some as minimal as the Minor Air Facility Permit or as major as the Superfund program. There are over 1,000 facilities in Community Board 1 that have reported to the EPA at least once for any state or federal environmental programs. The sites shown in this map are the sites that have the largest burden of regulations to comply with, symbolizing potential for environmental risk. To access the full database, you can search by facility or geography here (http://www.epa.gov/enviro/facts/afs/search.html) or download the spatial data here (http://www.epa.gov/enviro/geo_data.html)<br>Spills are cataloged by NYS DEC for all accidental releases of petroleum, toxic chemicals, gases, and other hazardous materials. You can search for spills in their records on the DEC website (http://www.dec.ny.gov/cfmx/extapps/derexternal/index.cfm?pageid=2). Spills are categorized on this map as minor (smaller than 100 gallons) and major (100 gallons and greater) spills."
        }, {
            title: "Future Flood Risk",
            field: "The New York Panel on Climate Change has projected what the flood plain will look like in a 100-year and 500-year storm (a storm that typically occurs once every 100 and 500 years, respectively). This map shows the projected flood plains for the year 2020."
        }, {
            title: "Polluted Places",
            field: "There are Superfund and brownfield sites at the state and federal level. A brownfield site is a property where soil contamination exceeds standards set by NYS DEC (state) or US EPA (federal). These properties must be remediated before being redeveloped. Severely contaminated sites are designated as Superfund sites. This map includes all state and federally designated brownfield and Superfund sites, including those that have been remediated.<br /> The Exxon-Mobil Oil Spill was a decades-long oil leak that was discovered in 1978. Exxon has already removed 12.5 million gallons of oil, of the estimated 17 to 30 million gallons. Remediation of this site is on-going and overseen by NYS DEC. The oil spill was drawn from a map created by Riverkeeper in 2004 found in the Brownfield Opportunity Area nomination report from 2012. More information can be found on the NYS DEC site (http://nysdecgreenpoint.com/ProjectHistory.aspx) <br /> The Meeker plume was found during the Exxon-Mobil Oil Spill investigation. The plume of chlorinated solvents (teatrachloroethene – PCE and trichloroethene – TCE), was found in soil, soil vapor and groundwater. These solvents typically come from dry cleaning and degreaser compounds. The investigation for the source of this plume is ongoing and overseen by the NYS DEC. The Meeker Plume was drawn from an online map by the Newtown Creek Alliance.<br /> The NuHart plume is the remnants of the NuHart Plastics plants. Phthalate and TCE contaminate the site, making it a Class 2 State Superfund site, a “significant threat to public health and/or the environment requiring action.” The plume on this map was drawn from a report from April 2015 from NYS DEC."
        }, {
            title: "Population Density",
            field: "This data reflects population estimates from 2009-2013 American Community Survey (ACS). ACS is a running sample of approximately 1 in 40 households in the U.S. This sample is taken each month over a 1, 3 or 5-year period. The longer the sample time, generally the higher reliability of the data due to a larger sample size. These maps use the 5-year estimate from 2009-2013, the latest available 5-year data."
        }, {
            title: "Median Household Income",
            field: "Median household income is the middle income value, meaning half the population has an income above that amount, and half have an income below that amount. Median household income was $52,259 for New York City and $53,046 for the United States, according to the 2009-2013 American Community Survey."
        }, {
            title: "Asthma Rates",
            field: "Residents of Williamsburg and Greenpoint experience higher instances of asthma due to proximity to truck routes and sources of air pollution. This layer shows distribution of hospital visits for asthma from 2008 to 2012. This data was retrieved from Infoshare.org of Community Studies of New York, Inc., a non-profit that compiles and aggregates data."
        }, {
            title: "Industrial History",
            field: "Follow the points and paths on this layer to experience NAG’s Industrial History Walking Tour. The points of interest on this tour commemorate the neighborhood’s industrial legacy while bringing attention to the chemical contamination they have left behind, and its impact to the health and well-being of current residents. Find out more information about the tour(http://nag-brooklyn.org/2015/04/nags-industrial-history-walking-tours-of-williamsburg-and-greenpoint-coming-in-may-kick-off-event-april-28th-featuring-a-screening-of-the-film-shellshocked/)"
        }
    ];

    function addToolTips() {
        // add jquery UI tooltips
        // we could do this without jQuery UI...
        // $('.dlayer').tooltip();
    }
    
    // add the "about the data" content to the DOM
    function aboutData() {        
        $.each(desc, function(i, val) {
            var html = "<h3>" + val.title + "</h3><p>" + val.field + "</p>";
            $('.tabs.metadata').append(html);
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
        var wh = $(w).innerHeight(),
              fh = $('footer').innerHeight(),
              hh = $('.menu.header').innerHeight(),
              tnh = $('.menu.top-nav').innerHeight(),
              $uiLeft = $('.ui-left'),
              uiLeftPaddingTop = $uiLeft.css('padding-top').replace('px', ''),
              $menuTabs = $('.menu.tabs'),
              mtHeight = wh - hh - tnh - fh - uiLeftPaddingTop;

        console.log(wh, fh, mtHeight);

        $uiLeft.height(wh);
        $menuTabs.height(mtHeight);

    }

    // adds the event listeners to the non-map interactions UI
    function addListeners() {
        // listener to create a screenshot
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

    // initially open map layer selection UI for dev debugging. remove this code when ready for production.
    $('.menu.tabs.dlayer').addClass('active');
    $('.nav.dlayer').addClass('active');

    // get it all going...
    var init = function() {
        addToolTips();
        setLeftUIheight();
        addListeners();
        aboutData();
    };

    return {
        init: init,
        desc : desc
    };

})(document, window, jQuery);