// legend data
var app = app || {};

app.legend = (function(){
  return {
    
    waste_transfer_stations : {
      title : ""
      items : [
        {
          color : "",
          label : "Waste transfer station"
        }
      ]
    },
    
    polluted_points : {
      title : "Poluted Sites (Points)"
      items : [
        {
          color : "",
          label : ""
        },
        {
          color : "",
          label : ""
        },
        {
          color : "",
          label : ""
        },
        {
          color : "",
          label : ""
        }
      ]
    },

    polluted_areas : {
      title : "Polluted Sites (Areas)",
      items : [
        {
          color : "",
          label : ""
        },
        {
          color : "",
          label : ""
        },
        {
          color : "",
          label : ""
        }
      ]
    },
    
    flood_risk : {
      title : "Flood Risk",
      items : [
        {
          color : "#2E5387 ",
          label : "Projected 500-year storm"
        },
        {
          color : "#0f3b82",
          label : "Projected 100-year storm"
        }
      ]
    },

    asthma : {
      title : "Asthma",
      items : [
        {
          color : "#5a3072",
          label : "21 - 35"
        },
        {
          color : "#7a518b ",
          label : "10 - 20"
        },
        {
          color : "#9c7aac",
          label : "6 - 9"
        },
        {
          color : "#bfa4cd",
          label : "0 - 5"
        },
        {
          color : "#ffffff",
          label : "0"
        }
      ]
    },

    acs_income : {
      title : "Median Income",
      items : [
        {
          color : "#216437",
          label : "$75,001 or more"
        },
        {
          color : "#4f8759",
          label : "$65,001 - $75,000"
        },
        {
          color : "#75ab7e",
          label : "$50,001 - $65,000"
        },
        {
          color : "#a5d0b4",
          label : "$25,001 - $50,000"
        },
        {
          color : "#dcf5e8",
          label : "0 - $25,000"
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