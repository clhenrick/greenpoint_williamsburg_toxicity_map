// Road labels
#road_label[zoom>=14]{ 
  text-placement: line;
  text-transform: uppercase;
  text-face-name: @sans;
  text-name: @name;
  text-size: 7;
  text-min-distance: 100;
  text-halo-fill: @land;
  text-halo-radius: 2;
  text-fill: mix(@text,@fill1,50);
  text-comp-op: src-over;
  [zoom>=15] { 
    text-size: 8;
    text-fill: @text;
  }
  [zoom>=17] {
    text-size: 11;
  }
}

// Water labels
#marine_label { 
  text-name: @name;
  text-face-name: @sans_bold;
  text-fill: @text;
  text-size: 12;
  text-halo-fill: @water;
  text-halo-radius: 1;
  text-wrap-before: true;
  text-wrap-width: 90;
  [labelrank=1] {
   text-size: 18;
  }
}

#water_label {
  [zoom<=13],
  [zoom>=14],
  [zoom>=16],
  [zoom>=17] {
    text-name: @name;
    text-face-name: @sans_bold;
    text-fill: @text;
    text-size: 12;
    text-halo-fill: @water;
    text-halo-radius: .1;
    text-wrap-width: 55;
    text-wrap-before: true;
    text-avoid-edges: true;
  }
}

#waterway_label[type='river'][zoom>=13],
#waterway_label[type='canal'][zoom>=14],
#waterway_label[type='stream'][zoom>=15] { 
  text-name: @name;
  text-face-name: @sans_bold;
  text-fill: mix(@text,@road,12);
  text-min-distance: 60;
  text-size:10;
  text-halo-fill: mix(@water,@road,50);
  text-halo-radius: .4;
  text-wrap-before: true;
  text-avoid-edges: true;
  text-placement: line;
}

// Place labels
#poi_label[maki='park'][scalerank<=2],
#poi_label[maki='airport'][scalerank<=2],
#poi_label[maki='airfield'][scalerank<=2],
#poi_label[maki='rail'][scalerank<=2],
#poi_label[maki='school'][scalerank<=2],
#poi_label[scalerank='hospital'][scalerank<=2] { 
  text-face-name: @sans_bold;
  text-allow-overlap: false;
  text-name: @name;
  text-size: 9;
  text-line-spacing: -2;
  text-min-distance: 50;
  text-wrap-width: 60;
  text-halo-fill: @land;
  text-halo-radius: 1;
  text-fill: @text;
}
