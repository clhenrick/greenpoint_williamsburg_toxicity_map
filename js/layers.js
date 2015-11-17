var app = app || {};

app.layers = (function(){
  
  var cartocss = app.cartocss;
  
  return {
      user_name: 'nag-brooklyn',
      type: 'cartodb',
      sublayers: [{
          name: 'acs_pop',
          sql: "SELECT * FROM acs_5yr_2013_merge_copy",
          cartocss: cartocss.popdensity,
          interactivity: "people_per_square_mile"
      }, {
          name: 'acs_income',
          sql: "SELECT * FROM acs_5yr_2013_merge_copy",
          cartocss: cartocss.income,
          interactivity: "median_household_income, percent_hispanic, percent_nonhispanic_black, percent_nonhispanic_asian, percent_nonhispanic_white"
      }, {
          name: 'asthma',
          sql: "SELECT * FROM asthma_5yr",
          cartocss: cartocss.asthma,
          interactivity: "asthma_rate_per_1000_people"
      }, {
          name: 'flood_risk',
          sql: "SELECT * FROM floodrisk", 
          cartocss: cartocss.floodrisk,
          interactivity: ""
      }, {
          name: 'polluted_polygons',
          sql: "SELECT * FROM polluted_poly_f",
          cartocss: cartocss["polluted-areas"],
          interactivity: "site_or_owner_name, address, description, program, link_for_more_information, reference_number"
      }, {
          name: 'industrial_history_lines',
          sql: "SELECT * FROM industrialhistory_lines",
          cartocss: cartocss["industrial-history-lines"],
          interactivity: ""
      }, {
          name: 'industrial_history_points',
          sql: "SELECT * FROM industrialhistory_points",
          cartocss: cartocss["industrial-history-points"],
          interactivity: "name, address, type_of_industry_present_or_former, description, source_one, source_two"
      }, {
          name: 'polluted_points',
          sql: "SELECT * FROM polluted_points_f",
          cartocss: cartocss["polluted-points"],
          interactivity: "facility_or_owner, description, type_of_pollution, address, date, agency_program, link_for_more_information, quantity, remediated, responding_agency, source"
      }, {
          name: 'waste_transfer_stations',
          sql: "SELECT * FROM wts_July30", 
          cartocss: cartocss.wts,
          interactivity: "name, facilitytype, address, source"
      }]
  }
})();  

// , median_household_income, medianage, percent_nonhispanic_white, percent_hispanic, percent_nonhispanic_black, percent_nonhispanic_asian


