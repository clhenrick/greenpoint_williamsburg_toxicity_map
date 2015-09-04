#acs_5yr_2013{
  polygon-fill: #ECF0F6;
  polygon-opacity: 0.8;
  polygon-comp-op: multiply;
  line-color: #000000;
  line-width: 0.5;
  line-opacity: 0.1;
  [ rounded_mhhi > 75001 ]{
     polygon-fill: #216437;
  }
  [ rounded_mhhi > 65001 ][ rounded_mhhi <= 75000 ]{
     polygon-fill: #4f8759;
  }
  [ rounded_mhhi > 50001 ][ rounded_mhhi <= 65000 ]{
     polygon-fill: #75ab7e;
  }
  [ rounded_mhhi > 25001 ][ rounded_mhhi <= 50000 ]{
     polygon-fill: #a5d0b4;
  }
  [ rounded_mhhi > 0 ][ rounded_mhhi <= 25000 ] {
     polygon-fill: #dcf5e8;
  }
}
