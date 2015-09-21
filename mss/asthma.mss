#asthma_5yr{ 
	polygon-fill: #FFFFFF; 
	polygon-opacity: 0.7; 
	line-color: #666666; 
	line-width: 0.2; 
	line-opacity: 0.5; 
	polygon-comp-op:multiply; 

	[ asthma_rate_per_1000_people >= 21 ][ asthma_rate_per_1000_people <= 35 ] { 
		polygon-fill: #5a3072; 
	} 

	[ asthma_rate_per_1000_people <= 10][ asthma_rate_per_1000_people <= 20 ] { 
		polygon-fill: #7a518b; 
	} 

	[ asthma_rate_per_1000_people <= 6][ asthma_rate_per_1000_people <= 9] { 
		polygon-fill: #9c7aac; 
	} 

	[ asthma_rate_per_1000_people >=1][ asthma_rate_per_1000_people <= 5] { 
		polygon-fill: #bfa4cd; 
	} 

}
