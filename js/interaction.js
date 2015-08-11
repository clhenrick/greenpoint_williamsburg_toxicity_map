var app = app || {};

app.interaction = (function(d, $, _) {
    //loading message for data loading : img, datalayer/map


    //default setup 
    $('a').css('cursor', 'pointer');

    //layer tooltips
    $('.dlayer').tooltip({
        container: 'body',
        contents: function() {
            return "wts tooltip!"; //why widget does not response to contents?
        }
    });


    var $aboutthedata =[];
    $('.next').click(function() {
        $('.tabs').not('.metadata').hide();
        if($aboutthedata.length <= 0){
       	$.each(desc,function(i,val){
        	$aboutthedata = $("<div class='desc'><h6 class='subtitle desc'>"+desc[i].title+"</h6> <span class='desc_contents contents'>"+desc[i].field+"</span> </div>");
        	$('.metadata').append($aboutthedata);
        	$('.contents').hide();
	    })
       		$('.desc:nth-child(even)').click(function(){
			      $('.contents:nth-child(even)').toggle();
	       	});
    	}else if($aboutthedata.length > 0){
    		console.log('no more append.');	
    	}

        $('.metadata').toggle();
    });



    var desc = [{
        title: "Waste Transfer Stations",
        field: "..."
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
    },{
    	title:"Industrial History",
    	field:"..."
    }];


/*  
    function layer_desc() {

		var desc = [
		{title:"waste transfer station", field:"cotents1"},
		{title:"title2", field:"cotents2"},
		{title:"title3", field:"cotents3"},
		{title:"title3", field:"cotents4"},
		{title:"title3", field:"cotents5"},
		{title:"title3", field:"cotents6"},
		{title:"title3", field:"cotents7"}
		];
		//about map layers

		$('.layers').tooltip({
		  items: "[title]",
		  content: function() {
		    var element = $( this );
		    if ( element.is( "[title]" ) ) {
		     var line = "<strong>"+desc[0].title +"</strong>"+"<br>"+desc[0].field;
		      return line;    
		    }
		  }
		});//tooptips on map 
		
    };//eof layer_desc


*/


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

$('#print_b').click(function() {
    screenshot();
});

$('#aboutus_b').click(function() {
    $('.tabs').not('.aboutus').hide();
    $('.aboutus').toggle();
}); 
$('#contact_b').click(function() {
    $('.tabs').not('.contact').hide();
    $('.contact').toggle();

}); 
$('#about_b').click(function() {
    $('.tabs').not('.about').hide();
    $('li').css();
    $('.about').toggle();

}); 
$('#dlayer_b').click(function() {
    $('.tabs').not('.dlayer').hide();
    $('.dlayer').toggle();
});

//not required yet
var init = function() {
    //layer_desc(); 
};
return {
    init: init
};

})(document, jQuery, _);