var app = app || {};

app.interaction = (function(d,$, _) {
    //loading message for data loading : img, datalayer/map


    //default setup 
    $('a').css('cursor','pointer');

    //layer tooltips
    $('.layers').tooltip({
    	container: 'body',
        contents: function() {
            return "wts tooltip!"; //why widget does not response to contents?
        }
    });
    $('.next').click(function(){
    	var $aboutthedata = $( "<p id='desc1'>Here you go!</p>" );
     	$('.container').not('.metadata').hide();
	    $('.metadata').toggle();
		$('.metadata').append( $aboutthedata );
    });

	var desc = [
		{title:"waste_transfer_stations", field:"cotents1"},
		{title:"polluted_points", field:"cotents2"},
		{title:"flood_risk", field:"cotents3"},
		{title:"polluted_polygons", field:"cotents3"},
		{title:"acs_pop", field:"cotents3"},
		{title:"acs_income", field:"cotents3"},
		{title:"asthma", field:"cotents3"}
	];


    /*  
    function layer_desc() {

		var desc = [
		{title:"waste transfer station", field:"cotents1"},
		{title:"title2", field:"cotents2"},
		{title:"title3", field:"cotents3"},
		{title:"title3", field:"cotents3"},
		{title:"title3", field:"cotents3"},
		{title:"title3", field:"cotents3"},
		{title:"title3", field:"cotents3"}
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


	function screenshot(){
		if(screen.width>0 && screen.height>0){
			try{
				//$('body').append('<div id="canvas"></div>');
				html2canvas(document.body, {
					allowTaint :  false,
					logging : true,
					taintTest: false,
					useCORS: true,
        			onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
           			var cap = canvas.toDataURL();
           			window.open(cap);
			        }
			    });
			}
			catch(err){
				console.log(err.message);
			}
		}
	}

	$('#print_b').click(function(){
		screenshot();
	});

    $('#aboutus_b').click(function() {
    	$('.container').not('.aboutus').hide();
        $('.aboutus').toggle();
    });
	$('#contact_b').click(function() {
    	$('.container').not('.contact').hide();
	    $('.contact').toggle();

	});
	$('#about_b').click(function() {
    	$('.container').not('.about').hide();
	    $('.about').toggle();
	});
	$('#dlayer_b').click(function() {
    	$('.container').not('.dlayer').hide();
	    $('.dlayer').toggle();
	});

	//not required yet
	/*
    var init = function() {
        //layer_desc();   	
    };
    return {
        init: init
    };
    */
})(document,jQuery, _);