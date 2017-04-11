function changeSkin() {
	runRight = [{left:277,top:145,width:45,height:41,w:54,h:49.2},
					{left:343,top:142,width:45,height:41,w:54,h:49.2},
					{left:408,top:145,width:45,height:41,w:54,h:49.2},
					{left:13,top:212,width:45,height:41,w:54,h:49.2},
					{left:80,top:209,width:45,height:41,w:54,h:49.2},
					{left:146,top:211,width:45,height:41,w:54,h:49.2}
					];

	runLeft = [{left:143,top:146,width:45,height:41,w:54,h:49.2},
					{left:77,top:143,width:45,height:40,w:54,h:48},
					{left:10,top:145,width:45,height:40,w:54,h:48},					
					{left:407,top:212,width:45,height:40,w:54,h:48},
					{left:340,top:209,width:45,height:40,w:54,h:48},
					{left:274,top:211,width:45,height:40,w:54,h:48}
					];

    jumpUP = [{left:211,top:278,width:45,height:40,w:54,h:48}];	
    jumpDown =[{left:212,top:211,width:45,height:40,w:54,h:48}];	
    standing =[{left:210,top:340,width:45,height:45,w:54,h:50}];			

}


function businesSkin() {
	runRight = [{left:15,top:15,width:45,height:40,w:54,h:48},
					{left:77,top:12,width:45,height:40,w:54,h:48},
					{left:143,top:12,width:45,height:40,w:54,h:48},
					{left:208,top:15,width:45,height:40,w:54,h:48},
					{left:276,top:12,width:45,height:40,w:54,h:48},
					{left:342,top:12,width:45,height:40,w:54,h:48}
					];

	runLeft = [{left:401,top:15,width:45,height:40,w:54,h:48},
					{left:335,top:12,width:53,height:40,w:63.6,h:48},
					{left:267,top:12,width:53,height:40,w:63.6,h:48},
					{left:201,top:12,width:53,height:40,w:63.6,h:48},
					{left:136,top:12,width:53,height:40,w:63.6,h:48},
					{left:69,top:12,width:53,height:40,w:63.6,h:48}
					];	

    jumpUP = [{left:208,top:81,width:51,height:40,w:61.2,h:48}];	
    jumpDown =[{left:402,top:12,width:51,height:40,w:61.2,h:48}];	
    standing =[{left:201,top:148,width:51,height:40,w:61.2,h:52}];			

}

module.exports = {changeSkin,businesSkin};