// Languages: name (local), name_en, name_fr, name_es, name_de
@name: '[name_en]';

// Fonts //
@sans: 'Arial Unicode MS Regular';
@sans_bold: 'Arial Unicode MS Bold';

// Color palette //
@road:  #e5e8df;
@road2:  #e1e4d7; 
@land:  #f1f2ee;
@park: #b0c0af;
@water: #586c88;
@water2: #2f6363;
@fill1: #faf7f5;
@fill2: #e4e2e2;
@fill3: #c2c1c1;
@fill4: #585656;

@text: #95afb0;

Map [zoom<10]{ background-color: @land; }
Map [zoom>=10]{ background-color: @fill1; }

// Land Features //
#landuse[class='park']{
    polygon-fill: mix(@land,@park,80);
}

#landuse[class='cemetery'],
#landuse[class='wood'],
#landuse_overlay {
  polygon-fill: darken(@land,3);
  [zoom>=15] { polygon-fill:mix(@land,@fill2,95); }
}

#landuse[class='pitch'],
#landuse[class='sand'] { 
  polygon-fill: mix(@land,@fill4,90);
}

#landuse[class='hospital'],
#landuse[class='industrial'],
#landuse[class='school'] { 
  polygon-fill: mix(@land,@fill1,95);
}

#building { 
  polygon-fill: mix(@fill1,@land,60);
  [zoom>=16]{ polygon-fill: mix(@fill2,@land,100);}
}

#aeroway {
  ['mapnik::geometry_type'=3][type!='apron'] { 
    polygon-fill: mix(@fill2,@land,25);
    [zoom>=16]{ polygon-fill: mix(@fill2,@land,50);}
  }
  ['mapnik::geometry_type'=2] { 
    line-color: mix(@fill2,@land,25);
    line-width: 1;
    [zoom>=13][type='runway'] { line-width: 4; }
    [zoom>=16] {
      [type='runway'] { line-width: 6; }
      line-width: 3;
      line-color: mix(@fill2,@land,50);
    }
  }
}

// Water Features //
#water {
  ::shadow {
    polygon-fill: mix(@land,@water2,75);
  }
  ::fill {
    // a fill and overlay comp-op lighten the polygon-
    // fill from ::shadow.
    polygon-fill: @land;
    comp-op: soft-light;
    // blurring reveals the polygon fill from ::shadow around
    // the edges of the water
    image-filters: agg-stack-blur(10,10);
  }
}

// Water color is calculated by sampling the resulting color from
// the soft-light comp-op in the #water layer style above. 
#waterway {
  [type='river'],
  [type='canal'] {
    line-color: @water;
    line-width: 0;
  }
  [type='stream'] {
    line-color: @water;
    line-width: 0;
  }
}
