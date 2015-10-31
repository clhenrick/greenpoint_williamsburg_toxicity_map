#acs_5yr_2013_merge_copy {   
  line-join: round;
  polygon-fill: #FFFFFF;  
  polygon-opacity: .7; 
  polygon-comp-op: multiply;
  line-color: #696969;  
  line-width: 0.1;  
  line-opacity: .5; 

  [roundedcpop>=75001]{ 
    polygon-fill: #cfb928; 
  }

  [roundedcpop>=55001][roundedcpop<=75000] {
    polygon-fill: #dfcd66;
  }

  [roundedcpop>=40001][roundedcpop<=55000] { 
    polygon-fill: #e8dc91; 
  }

  [roundedcpop>=25001][roundedcpop<=40000] { 
    polygon-fill: #f0ecd7; 
  }

  [roundedcpop>0][roundedcpop<=25000] {
    polygon-fill: #fcfaef;
  }

  [roundedcpop=0] {
    polygon-fill: #fff;
  }
}  
