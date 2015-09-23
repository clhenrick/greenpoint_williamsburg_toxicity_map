
@nycd: #120642;
@zip:#4b4b51;
@region:#e0e0d8;
#cb1_zip_4326{
  line-width:2;
  [zoom>=11] {line-width:1;line-dasharray: 4, 4;}
  [zoom>=14] { line-width:1;line-dasharray: 6, 6;} 
  [zoom>=16] { line-width:2;line-dasharray: 8, 8;} 
  line-dasharray: 4, 4;
  line-color:@zip;
  line-opacity:0.3;
  line-join:bevel;
  line-cap:square;
  line-gamma:1;
  line-gamma-method:power;
  line-simplify:1;
  line-smooth:0;
  line-comp-op:multiply;
}


#cb1_zip_4326::ZipCode{
  
}


#NoCB1_dissolve{
  line-width:0;
  line-color:@nycd;
  line-opacity:0;
  line-join:bevel;
  line-cap:round;
  line-gamma:1;
  line-gamma-method:power;
  line-simplify:1;
  line-smooth:.5;
  line-comp-op:multiply;
  //polygon
  polygon-fill:@region;
  polygon-opacity:.6;
  polygon-gamma:.5;
  polygon-gamma-method:power;
  polygon-comp-op:darken;
}
