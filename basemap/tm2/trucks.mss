
@ttruck:#ab819c;//#a34f84;
@ltruck:#dfa7c9;
@ltruck_o:#0b0a0a;
#through_truck_dissolve{
  line-width:4;
  [zoom>=11] {line-width:.7;}
  [zoom>=12] { line-width:1.5;} 
  [zoom>=14] { line-width:2;} 
  [zoom>=16] { line-width:3;} 
  [zoom>=17] { line-width:5;} 
  line-color:@ttruck;
  line-opacity:.3;
  line-join:bevel;
  line-cap:round;
  line-gamma:1;
  line-gamma-method:power;
  line-simplify:1;
  line-smooth:.5;
  line-comp-op:multiply;
}
#d_local_truck{
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