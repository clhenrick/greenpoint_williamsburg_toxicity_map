var app = app || {};

app.interaction = (function($, _) {

<<<<<<< HEAD
    var desc = [{
        title: "waste_transfer_stations",
        field: "cotents1"
    }, {
        title: "polluted_points",
        field: "cotents2"
    }, {
        title: "flood_risk",
        field: "cotents3"
    }, {
        title: "polluted_polygons",
        field: "cotents3"
    }, {
        title: "acs_pop",
        field: "cotents3"
    }, {
        title: "acs_income",
        field: "cotents3"
    }, {
        title: "asthma",
        field: "cotents3"
    }];
    $('.layers').tooltip({
        content: function() {
            return "wts tooltip!"; //why widget does not working?
        }
    });
    /*
    $('#'+desc[1].title).tooltip({
    	content:function(){
    		return desc[1].field;
    		}
    	});
    */
=======
	var desc = [
		{title:"waste_transfer_stations", field:"cotents1"},
		{title:"polluted_points", field:"cotents2"},
		{title:"flood_risk", field:"cotents3"},
		{title:"polluted_polygons", field:"cotents3"},
		{title:"acs_pop", field:"cotents3"},
		{title:"acs_income", field:"cotents3"},
		{title:"asthma", field:"cotents3"}
	];
	$('.layers').tooltip({
		content:function(){
			return "wts tooltip!";
			}
		});
	$('selected').click(function() {
		$(this).toggleClass('.pressed');
	}).hover(function() {
		$(this).toggleClass('.pressed');
	}).disableSelection();
	/*
	var buttonPressed = false;
	$('selected').click(function(event) {
		if(buttonPressed == false){
			buttonPressed = true;
			('selected').addClass('.pressed');
		} 
        else {
			buttonPressed = false;
			('selected').removeClass('.pressed');
		}
	});
*/
	/*
	$('#'+desc[1].title).tooltip({
		content:function(){
			return desc[1].field;
			}
		});
	*/
>>>>>>> change zoomin button style
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
    //layer button pressed effect
    $('selected' + '.layers').click(function() {
        $(this).toggleClass('pressed');
    })

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
    var init = function() {
        //layer_desc();   	
    };
    return {
        init: init
    };
})(jQuery, _);