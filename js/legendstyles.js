// legend data
var app = app || {};

app.legends = (function(){
  return {
    acs_pop : {
      title : "Population Density", // ppl per sq mile
      type : 'polygon',
      items : [
        {
          color : "#ffffff",
          label : "0"
        },{
          color : "#fcfaef",
          label : "1 - 2,500"
        },{
          color : "#f0ecd7",
          label : "2,501 - 4,000"
        },{
          color : "#e8dc91",
          label : "4,001 - 5,500"
        },{
          color : "#dfcd66",
          label : "5,501 - 7,500"
        },{
          color : "#cfb928",
          label : "7,501 or more"
        }
      ]
    },

    acs_income : {
      title : "Median Household Income",
      type : 'polygon',
      items : [
          {
          color : "#dcf5e8",
          label : "0 - $25,000"
        },{
          color : "#a5d0b4",
          label : "$25,001 - $50,000"
        },{
          color : "#75ab7e",
          label : "$50,001 - $65,000"
        },{
          color : "#4f8759",
          label : "$65,001 - $75,000"
        },{
          color : "#216437",
          label : "$75,001 or more"
        }
      ]
    },

    asthma : {
      title : "Asthma Rate",
      type : 'polygon',
      items : [
          {
          color : "#ffffff",
          label : "0"
        },{
          color : "#bfa4cd",
          label : "0 - 5"
        },{
          color : "#9c7aac",
          label : "6 - 9"
        },{
          color : "#7a518b ",
          label : "10 - 20"
        },{
          color : "#5a3072",
          label : "21 - 35"
        }
      ]
    },

    flood_risk : {
      title : "Future Flood Risk",
      type : 'polygon',
      items : [
        {
          color : "#93a5b6",
          label : "Projected 500-year storm"
        },
        {
          color : "#2E5387",
          label : "Projected 100-year storm"
        }
      ]
    },

    polluted_polygons : {
      title : "Polluted Places",
      type : 'polygon',
      items : [
        {
          color : "#FFCC00",
          label : "Plume"
        }
      ]
    },

    industrial_history_points : {
      title : "Industrial History Walking Tour",
      type : "point",
      items : [
        {
          color : "#000000",
          label : "Industrial history route"
        }
      ]
    },

    polluted_points : {
      title : "Poluted Sites",
      type : 'point',
      items : [
        {
          color : "#aa04ee",
          label : "EPA Regulated"
        },
        {
          color : "#fba782",
          label : "E-Designated"
        },
        {
          color : "#7b0006",
          label : "Spills > 100 Gallons"
        },
        {
          color : "#e171fb",
          label : "Spills < 100 Gallons"
        }
      ]
    },

    waste_transfer_stations : {
      title : "",
      type : 'point-donut',
      items : [
        {
          color : "#fff",
          label : "Waste Transfer Stations"
        }
      ]
    }
  }
})();