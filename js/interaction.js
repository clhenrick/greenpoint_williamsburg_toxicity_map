var app = app || {};

app.interaction = (function(d, w, $) {
    // This module creates non-map interaction UI elements and event listeners

    // descriptions of the data layers to append to the DOM
    var desc = [{
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
        }],
    aboutthedata = [];
    /*function loadingSpinner(){
        $(document).on(function(){
            ajaxStart:functin(){};
            ajaxStop:function(){};
        });
    } */
    function addToolTips() {
        // add jquery UI tooltips
        // we could do this without jQuery UI...
        $('.dlayer').tooltip();
    }



    function aboutData() {
        // add the "about the data" content to the DOM
        if (aboutthedata.length <= 0) {
            $.each(desc, function(i, val) {
                aboutthedata = $("<div class='desc'><h3>" + desc[i].title + "</h3> <div class='contents'><p>" + desc[i].field + "</p></div> </div>");
                $('.tabs .metadata').append(aboutthedata);
                $('.contents').css({
                    "max-width": "260px",
                    "line-height": "18  0%",
                    "overflow-y": "none"
                });
            })
        } else if (aboutthedata.length > 0) {
            // console.log('no more append.'); 
        }
    }

    /*
        // accordian style UI display for "about the data"
        $('.aboutdata').click(function() {
            $('.tabs').not('.metadata').hide();

            if(aboutthedata.length <= 0){
                $.each(desc,function(i,val){
                    aboutthedata = $("<div class='desc accordion'><h3 class='desc'>"+desc[i].title+"</h3> <div class='contents'>"+desc[i].field+"</div> </div>");
                    $('.metadata').append(aboutthedata);
                    $('.contents').hide();
                })
                $('.accordion').accordion( {
                    animate: 200,
                    active:2,   
                    collapsible: true,
                    icons: false,
                    heightStyle: "fill"

                });
            }else if(aboutthedata.length > 0){
                console.log('no more append.'); 
            }

            $('.metadata').toggle();
        });
    */

    function screenshot() {
        // implements the HTML 2 Canvas JS for a user to print the current map view
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

    function addListeners() {
        // adds the event listeners to the non-map interactions UI
        $('#print_b').click(function() {
            screenshot();
        });
        //menu navigation bar

        $('ul li').click(function() {
            var c = $(this).attr('class');
            console.log(c);
            $('.tabs').not('.'+c).hide();
            if( c === "metadata" ) {
                aboutData();
            }
            $('.tabs'+'.'+c).toggle(10,function(){
                $('.tabs'+'.'+c).animate({
                    easing: "easeOut"
                });
                $('li'+'.'+c).css({"background-color":"#f1f0f0"});
                $('li').not('.'+c).css({"background-color":"transparent"});
                var isVisible = $('.tabs'+'.'+c).is('hidden');
                var isHidden = $('.tabs'+'.'+c).is('visible');
            });
        });


    }
    //Detect the collision between tabs and footer.
    //return the proper height as a result 
    function detectTabsHeight(tabClassname) {
        //detecting Collisions at the bottom
        var c = tabClassname;
        var f = footer;

        var tabPosition = $('.'+c).offset().top;
        var footerPosition = $(f).offset().top;
        var tabHeight = $('.'+c).height(); //original height
        var endOfTab = footerPosition-tabPosition; //screensize - footer height 
        //resizing tab heights if it extends over the footer position
        if( (tabPosition + tabHeight) >= footerPosition ){
            return endOfTab;
        }else if(tabPosition + tabHeight < footer_position) {
            return tabHeight;
        }      
    } 


    // Fit the tab size to the footer position 
    //when it collide while window resized/contents are too long.
    function applyTabHeight(){
        //in case window resized and makes new collision
        $(window).resize(function() {
        });
        //in case window size is very small and make the collision 
        //in case tab is originally too long 
    }
    //get the height of tab
    //if it collide to the footer


    var init = function() {
        addToolTips();
        addListeners();
        //detectTabsHeight();
    };

    return {
        init: init
    };

})(document, window, jQuery);