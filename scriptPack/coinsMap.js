function createCoinsMap(map,offset) {
		
	 let result = {};
	 result.coins = [];
	 result.rastberry  =[];
	 result.swipe = [];

	

	 for(let i = 0;i < map.length;i++) {
	 	for(let j = 0;j < map[i].length;j++) {
	 		if(map[i][j]==="#") result.coins.push({left:offset+25*j,top:25*i});
	 		if(map[i][j]==="*") result.rastberry.push({left:offset+25*j,top:25*i});
	 		if(map[i][j]==="-") result.swipe.push({left:offset+25*j,top:25*i});
	 	}
	 }

	 return result;
}

let firstMap = [ "                                    ",
	 			 "                                    ",
	 			 "                                    ", 
	   			 "                                    ", 
	   			 "                                    ", 
	   			 "                                    ", 
	   			 "                                    ",
	   			 "                                    ", 
	   			 "                                    ",
				 "                                    ", 
	 			 "    ###                #   ####     ", 
				 "     #      ## ##      #   #        ",
	 			 "     #     #######     #   ####     ", 
				 "     #      #####   #  #      #     ", 
	  			 "    ###       #     ####   ####     ",
	   			 "                                    ", 	   							   
	   			 "                                    ", 
	   			 "                                    ", 
	   			 "                                    ", 	   						 
	   			 "                                    "],
	  secondMap = [ "                                    ",
	 				"                                    ",
	 				"                                ****", 
	   				"                      #         ****", 
	   				"                    #               ", 
	   				"                  #                 ", 
	   				"                 #                  ",
	   				"     #          #                   ", 
	   				"     ##        #                    ",
					"#########                           ", 
	 				"***  ##             ####   ####     ", 
					"     #              ###########     ",
	 				"                    ###########     ", 
					"                    ###########     ", 
	  				"                    ####   ####     ",
	   				"                                    ", 	   							   
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "],
	   thirdMap = [ "                                    ",
	 				"                                    ",
	 				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ",
	   				"             #                      ", 
	   				"             #                      ",
					"             #                      ", 
	 				"          #  #  #       ###         ", 
					"           # # #       # - #        ",
	 				"      #      #        #*****#       ", 
					"       #               #***#        ", 
	  				"  #######               ###         ",
	   				"       #                            ", 	   							   
	   				"      #         -  -                ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "];

	 fourMap = [ "                                    ",
	 				"                                    ",
	 				"                                    ", 
	   				"                                    ", 
	   				"                                    ",	   				 
	   				"         ###    ####   ####         ",
					"          #     #      #            ", 
	 				"          #     #      ###          ", 
					"          #     #      #            ",
	 				"         ###    ####   ####         ",
	 				"                                    ", 
	   				"                                    ",
	   				"                                    ", 
					"                                    ", 
	  				"                                    ",
	   				"                                    ", 	   							   
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "];  
	   fifthMap = [ "                                    ",
	 				"                                    ",
	 				"                                    ",
	 				"                                    ",
	 				"                                    ", 
	   				"     ##  ##   ##  ##                ", 
	   				"     ##  ##   ##  ##                ",	   				 
	   				"     ##  ##   ##  ##                ",
					"  ########################          ", 
	 				"   ######**********######           ", 
					"    ####################            ",	 				 
	   				"                                    ",
	   				"                                    ", 
					"                                    ", 
	  				"                                    ",
	   				"                                    ", 	   							   
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "]; 
	   sixMap = [ "                                    ",
	 				"                                    ",
	 				"                                    ",
	 				"                                    ",
	 				"                                    ", 
	   				"              ##      ##            ", 
	   				"     ##     ##  ##  ##  ##          ",	   				 
	   				"   ##  ##  ##     ##      ##        ",
					"  ##     ##                 ##      ", 
	 				"                              ##    ", 
					"                                    ",	 				 
	   				"                                    ",
	   				"                                    ", 
					"                                    ", 
	  				"                                    ",
	   				"                                    ", 	   							   
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "];
	   sevenMap = [ "                                    ",
	 				"                                    ",
	 				"                                    ",
	 				"  #####    #####  #####  #####      ",
	 				"  #   #    #   #  #      #          ", 
	   				"  #######  #   #  #####  #####      ", 
	   				"  #     #  #   #      #      #      ",	   				 
	   				"  #     #  #   #      #      #      ",
					"  #######  #####  #####  #####      ", 
	 				"                                    ", 
					"                                    ",	 				 
	   				"                                    ",
	   				"                                    ", 
					"                                    ", 
	  				"                                    ",
	   				"                                    ", 	   							   
	   				"                                    ", 
	   				"                                    ", 
	   				"                                    ", 	   						 
	   				"                                    "];				

function setCoinsMap() {
	let result = createCoinsMap(firstMap,0).coins;
	result = result.concat(createCoinsMap(secondMap,1100).coins);
	result = result.concat(createCoinsMap(thirdMap,2000).coins);
	result = result.concat(createCoinsMap(fourMap,2900).coins);
	result = result.concat(createCoinsMap(fifthMap,3800).coins);
	result = result.concat(createCoinsMap(sixMap,5550).coins);
	result = result.concat(createCoinsMap(sixMap,6250).coins);
	result = result.concat(createCoinsMap(sevenMap,6950).coins);
	return result;
}

function setAmmoMap() {
	let result = createCoinsMap(secondMap,1100).rastberry;
	result = result.concat(createCoinsMap(thirdMap,2000).rastberry);
	result = result.concat(createCoinsMap(fifthMap,3800).rastberry);
	return result;
}

function setSwipeMap() {
	let result = createCoinsMap(thirdMap,2000).swipe;
	 
	return result;
}

module.exports = {setCoinsMap,setAmmoMap,setSwipeMap};