// legend data
var app = app || {};

app.legends = (function(){
  return {
    acs_pop : {
      title : "Population Density",
      subtitle: "People per sq mile", // ppl per sq mile
      type : 'polygon',
      items : [
        {
          color : "#fcfaef",
          label : "0 - 25,000"
        },{
          color : "#f0ecd7",
          label : "25,001 - 40,000"
        },{
          color : "#e8dc91",
          label : "40,001 - 50,500"
        },{
          color : "#dfcd66",
          label : "50,501 - 75,000"
        },{
          color : "#cfb928",
          label : "75,001 or more"
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
      subtitle : "# of cases per 1,000 people, 2008-2012",
      type : 'polygon',
      items : [
        {
          color : "#bfa4cd",
          label : "1 - 5"
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
      title : "",
      type : 'polygon',
      items : [
        {
          color : "#FFCC00",
          label : "Polluted and Remediated Sites"
        }
      ]
    },

    industrial_history_points : {
      title : "Industrial History Walking Tour",
      type : "point",
      items : [
        {
          color : "#000000",
          label : "Industrial History Tour Site"
        }
      ]
    },

    polluted_points : {
      title : "Polluted Sites",
      type : 'point',
      items : [
        {
          color : "#7b0006",
          label : "EPA Regulated"
        },
        {
          color : "#fba782",
          label : "E-Designated"
        },
        {
          color : "#aa04ee",
          label : "Spills >= 100 Gallons"
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