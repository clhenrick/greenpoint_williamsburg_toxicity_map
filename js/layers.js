var app = app || {};

app.layers = (function(){
  return {
      user_name: 'nag-brooklyn',
      type: 'cartodb',
      sublayers: [{
          sql: "SELECT * FROM acs_5yr_2013",
          cartocss: "#acs_5yr_2013{  line-join: round;  polygon-fill: #FFFFFF;  polygon-opacity: .7; polygon-comp-op: multiply; line-color: #696969;  line-width: 0.1;  line-opacity: .5;  image-filters: agg-stack-blur(1,1);}#acs_5yr_2013 [roundedcpop >75001]{polygon-fill: #cfb928;}#acs_5yr_2013 [roundedcpop >55001][ roundedcpop <= 75000] { polygon-fill: #dfcd66; } #acs_5yr_2013 [roundedcpop > 40001][ roundedcpop <= 55000] {polygon-fill: #e8dc91; } #acs_5yr_2013 [roundedcpop > 25001][ roundedcpop <= 40000] { polygon-fill: #f0ecd7; }#acs_5yr_2013 [roundedcpop >0][ roundedcpop <= 25000] {polygon-fill: #fcfaef;}",
          interactivity: "cartodb_id, roundedcpop"
      }, {
          sql: "SELECT * FROM acs_5yr_2013",
          cartocss: "#acs_5yr_2013{polygon-fill: #ECF0F6;polygon-opacity: 0.8;polygon-comp-op: multiply;line-color: #000000;line-width: 0.5;line-opacity: 0.1;}#acs_5yr_2013 [rounded_mhhi > 75001]{polygon-fill: #216437;}#acs_5yr_2013 [rounded_mhhi > 65001][rounded_mhhi <= 75000]{polygon-fill: #4f8759;}#acs_5yr_2013 [rounded_mhhi > 50001][rounded_mhhi <= 65000]{polygon-fill: #75ab7e;}#acs_5yr_2013 [rounded_mhhi > 25001][rounded_mhhi <= 50000]{polygon-fill: #a5d0b4;}#acs_5yr_2013 [rounded_mhhi > 0 ][rounded_mhhi <= 25000] {polygon-fill: #dcf5e8;}",
          interactivity: "cartodb_id, rounded_mhhi"
      }, {
          sql: "SELECT * FROM asthma_5yr_2012",
          cartocss: "#asthma_2012_ct{ polygon-fill: #FFFFFF; polygon-opacity: .7; line-color: #666666; line-width: 0.2; line-opacity: .5; polygon-comp-op:multiply; } #asthma_5yr_2012[ asthma5yr >= 21 ][ asthma5yr <= 35 ] { polygon-fill: #5a3072; } #asthma_5yr_2012 [ asthma5yr <= 10][ asthma5yr <= 20 ] { polygon-fill: #7a518b; } #asthma_5yr_2012[ asthma5yr <= 6][ asthma5yr <= 9] { polygon-fill: #9c7aac; } #asthma_5yr_2012[ asthma5yr <= 1][ asthma5yr <= 5] { polygon-fill: #bfa4cd; } #asthma_5yr_2012[ asthma5yr = 0] { polygon-fill: #FFFFFF; }",
          interactivity: "cartodb_id"  
      }, {
          sql: "SELECT * FROM floodrisk", 
          cartocss: "#table_2020_projected_flood_risk{polygon-fill: #2E5387; polygon-opacity: 0.5; polygon-comp-op: multiply; line-color: #bfd1ff; line-width: 0.3; line-opacity: 0; }",
          interactivity: "cartodb_id"
      }, {
          sql: "SELECT * FROM polluted_polygons_w_remediated_1",
          cartocss: "#polluted_polygons_w_remediated_1 {polygon-opacity: 0.7;line-color: #FFF;line-width: 0.5;line-opacity: 0;}#polluted_polygons_w_remediated_1[nag_id=1] {polygon-fill:#feb9f0;}#polluted_polygons_w_remediated_1[nag_id=2] {polygon-fill: #feff83;}#polluted_polygons_w_remediated_1[nag_id=3] {polygon-fill: #f3cc81;}",
          interactivity: "cartodb_id, acres"
      }, {
          sql: "SELECT * FROM polluted_points",
          cartocss: "#polluted_points {marker-fill-opacity: 0.9;marker-line-color: #FFFFFF;marker-line-width: 0.1;marker-line-opacity: 0.1;marker-placement: point;marker-type: ellipse;marker-width: 6.8;marker-allow-overlap: false;}#polluted_points[nag_id=10] {marker-fill: #7b0006;}#polluted_points[nag_id=7] {marker-fill: #fba782;}#polluted_points[nag_id=8] {marker-fill: #aa04ee;}#polluted_points[nag_id=9] {marker-fill: #e171fb;}",
          interactivity: "cartodb_id, address"
      }, {
          sql: "SELECT * FROM wts_July30", 
          cartocss: "#wts_july30{ marker-fill-opacity: 0; marker-line-color: #850200; marker-line-width: 3.5; marker-line-opacity: 0.7; marker-placement: point; marker-type: ellipse; marker-width: 10; marker-allow-overlap: true; }",
          interactivity: "cartodb_id, address"
      }]
  }
})();