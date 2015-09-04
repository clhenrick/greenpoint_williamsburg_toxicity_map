#asthma_5yr{ 
	polygon-fill: #FFFFFF; 
	polygon-opacity: .7; 
	line-color: #666666; 
	line-width: 0.2; 
	line-opacity: 0.5; 
	polygon-comp-op:multiply; 
	[ asthptot >= 21 ][ asthptot <= 35 ] { 
		polygon-fill: #5a3072; 
	} 
	[ asthptot <= 10][ asthptot <= 20 ] { 
		polygon-fill: #7a518b; 
	} 
	[ asthptot <= 6][ asthptot <= 9] { 
		polygon-fill: #9c7aac; 
	} 
	[ asthptot <= 1][ asthptot <= 5] { 
		polygon-fill: #bfa4cd; 
	} 
}

