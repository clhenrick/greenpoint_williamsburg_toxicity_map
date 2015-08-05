// legend data
var app = app || {};

app.legend = (function(){
  return {
    
    waste_transfer_stations : {
      items : [
        {
          color : "",
          label : "Waste transfer station"
        }
      ]
    },
    
    polluted_points : {
      items : [
        {
          color : "",
          label : "Polluted points"
        }
      ]
    },
    
    flood_risk : {
      items : [
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        }
      ]
    },

    asthma : {
      title : "Asthma",
      items : [
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        },
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        }
      ]
    },

    acs_income : {
      title : "Median Income",
      items : [
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        },
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        },
        {
          color : "",
          label : "A"
        },
        {
          color : "",
          label : "B"
        }        
      ]
    },

    acs_pop : {
      title : "Population Density", // ppl per sq mile
      items : [
        {
          color : "#cfb928",
          label : "7,501 or more"
        },
        {
          color : "#dfcd66",
          label : "5,501 - 7,500"
        },
        {
          color : "#e8dc91",
          label : "4,001 - 5,500"
        },
        {
          color : "#f0ecd7",
          label : "2,501 - 4,000"
        },
        {
          color : "#fcfaef",
          label : "1 - 2,500"
        },
        {
          color : "#ffffff",
          label : "0"
        }
      ]
    }
  }
})();