@nycd: #120642;
@zip:#4b4b51;
@region:#e0e0d8;
@ttruck:#ab819c;//#a34f84;
@ltruck:#dfa7c9;
@ltruck_o:#0b0a0a;

#cd1_zip_labels {
  text-face-name: @sans_bold;
  text-allow-overlap: true;
  text-name: '[ZipCode]';
  text-size: 18;
  text-halo-fill: #fff;
  text-halo-radius: 1;
  text-fill: #999;
  text-opacity:0.7;
  text-horizontal-alignment: middle;
  [zoom>=15] {
    text-avoid-edges:true;
    text-size: 22;
  }
  [zoom>=16]{
    text-avoid-edges:false;
  }
  [zoom>=17] {
    text-size: 26;
  }
 }

#zip_boundaries{
  [zoom>=11] {line-width:1;line-dasharray: 4, 4;}
  [zoom>=14] { line-width:1;line-dasharray: 6, 6;} 
  [zoom>=16] { line-width:2;line-dasharray: 8, 8;} 
  line-color:@zip;
  line-opacity:0.4;
  line-join:bevel;
  line-cap:square;
  line-smooth:0;
  line-comp-op:multiply;
}

#cd1_mask_3857{
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
  polygon-opacity:.3;
  polygon-gamma:.5;
  polygon-gamma-method:power;
  polygon-comp-op:darken;
}

#truck-routes-through-clipped{
  line-width:4;
  [zoom>=11] {line-width:.7;}
  [zoom>=12] { line-width:1.5;} 
  [zoom>=14] { line-width:2;} 
  [zoom>=16] { line-width:3;} 
  [zoom>=17] { line-width:5;} 
  line-color:@ttruck;
  line-opacity:0.5;
  line-join:bevel;
  line-cap:butt;
  line-gamma:1;
  line-gamma-method:power;
  line-simplify:1;
  line-smooth:.5;
  line-comp-op:multiply;
}
#local_truck_routes{
   ::fill {
   line-width:1;
  [zoom>=11] {line-width:1.2;}
  [zoom>=14] { line-width:1.8;} 
  [zoom>=16] { line-width:3;} 
  [zoom>=17] { line-width:5;} 
  line-color:@ltruck;
  line-opacity:0.3;
  line-join:bevel;
  line-cap:round;
  line-gamma:1;
  line-gamma-method:power;
  line-simplify:1;
  line-smooth:.5;
  line-comp-op:multiply;
 }
}