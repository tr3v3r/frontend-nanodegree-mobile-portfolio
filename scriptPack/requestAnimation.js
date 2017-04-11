


let {getPlatformtop}= require('./mainFunctions');







//Отрисовка и движение background

let background = new Image();
background.onload = function() {
	ctx.drawImage(background,0,200);
}
background.src = "images/city_background.png";

let background2 = new Image();
background2.onload = function() {
	ctx.drawImage(background2,0,150);
}
background2.src = "images/background_hills.png";

let sky = new Image();
sky.onload = function() {
	ctx.drawImage(sky,0,0);
}
sky.src = "images/sky.jpg";



function drawBackground() {	
	ctx.drawImage(sky,0,0);
	ctx.drawImage(background2,0,130);	
	ctx.translate(-backgroundOffset,0);
	ctx.drawImage(background,0,200);
	ctx.drawImage(background,1200,200);
	ctx.translate(backgroundOffset,0);
}

function setBackgroundOffset() {
	if(running&&(!movingLeft||!movingRight)&&player.visible) {
   var offset = backgroundOffset + bgVelocity/fps; // Движение на основе времени

   if (offset > 0 && offset < 1200) {
      backgroundOffset = offset;
   }
   else {
      backgroundOffset = 0;
   }
}

}


// Отрисовка движения платформ

let pattern = new Image();
pattern.onload = function() {
	ctx.drawImage(pattern,0,200);
}
pattern.src = "images/pattern.png";

class Platform {
	constructor(w,h,x,level) {
		this.type = "platform";
		this.width = w;
		this.height = h;
		this.level = level;
		this.top = getPlatformtop(level);
		this.left = x;
		this.offset = 0;		
	}
}



platformData = [new Platform(900,100,0,1),
				new Platform(300,20,950,2),
				new Platform(150,20,1370,3),
				new Platform(150,20,1670,4),
				new Platform(150,20,2070,4),
				new Platform(500,100,1470,1),
				new Platform(700,100,2150,1),
				new Platform(150,20,2400,2),
				new Platform(700,100,3750,1),
				new Platform(200,25,4000,2),
				new Platform(100,20,4050,3),

				new Platform(200,20,4450,2),
				new Platform(200,20,4650,3),
				new Platform(200,20,4850,4),

				new Platform(500,300,5550,3),
				new Platform(500,300,6250,3),
				new Platform(700,300,6950,3),

				new Platform(900,100,7950,1),

				new Platform(200,20,8650,3),
				new Platform(200,20,8650,4)				
					
					];





for(let i = 0;i<platformData.length;i++) {
	sprites.push(platformData[i]);
}

let platformVelocity;
let platformVelocityMultiply = 4.35;
platformOffset = 0;

function drawPlatform() {
	let data;
	ctx.save();

	ctx.translate(-platformOffset,0);

	for(let i = 0;i < platformData.length;i++) {
		var ptrn = ctx.createPattern(pattern, 'repeat');
		data = platformData[i];
		data.offset = platformOffset;
        ctx.fillStyle = ptrn;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
		ctx.fillRect(data.left,data.top,data.width,data.height);
        ctx.strokeRect(data.left,data.top,data.width,data.height);
	}

	ctx.restore();
}

function setPlatformVelocity() {
	platformVelocity = bgVelocity*platformVelocityMultiply;
}

function setPlatformOffset() {
	if(running&&(!movingLeft||!movingRight)&&player.visible) {
	
	platformOffset += platformVelocity/fps;
    if(platformOffset<0)platformOffset=1;
	}
}


// Отрисовка движения персонажа

 playerSheet = new Image();
playerSheet.onload = function() {
	ctx.drawImage(playerSheet,15,15,45,40,0,0,45,40);
}
playerSheet.src = "images/leo.png";

playerSheetLeft = new Image();
playerSheetLeft.onload = function() {
	ctx.drawImage(playerSheetLeft,15,15,45,40,0,0,45,40);
}
playerSheetLeft.src = "images/leo-left.png";

let playerImg = playerSheet;



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
					

playerSprite =runRight;


cellIndex=0;

let  lastAdvanceTime = 0;


function offsetSheet(now) {
	if(!player.jumping&&!running){
		playerSprite = standing;
		cellIndex =0;
	} 

	if(!player.jumping&&running) {
		
		if(leftKey) playerSprite = runLeft;
		if(rightKey) playerSprite = runRight;


	if(RUN_ANIMATION_RATE === 0) {
		return;
	}
	if(lastAdvanceTime ===0) {
		lastAdvanceTime = now;
	}
	else if(now-lastAdvanceTime>1000/RUN_ANIMATION_RATE) {
       
		advance();
		lastAdvanceTime = now;
	}
}
}

function advance() {
	if(cellIndex === playerSprite.length-1) {		
		cellIndex =0;
	}
	else {

		cellIndex++;
		
	}
}

function drawPlayer() {	
    if(player.visible) {
	var cell = playerSprite[cellIndex];	 
	ctx.drawImage(playerImg,cell.left,cell.top,
				cell.width,cell.height,player.left,player.top,cell.w,cell.h);
}

}



function runPlayer(points) {
	isNearTheEdgeOfTheScreen()
	if(running&&player.visible) {		
		if(leftKey) {
			if(!player.jumping) playerSprite=runLeft;
			if(movingLeft) player.left-=points;
			bgVelocity = -BACKGROUND_VELOCITY;
			playerImg = playerSheetLeft;	
		};
		if(rightKey) {
			if(!player.jumping) playerSprite=runRight;
			if(movingRight) player.left+=points;
			bgVelocity = BACKGROUND_VELOCITY;
			playerImg = playerSheet;	
		} 
	
}
}


function swipePlayer () {
   if(swiping) {

    running = true;
    if(bgVelocity>0) rightKey = true;
    else  leftKey = true;

    BACKGROUND_VELOCITY = 220;

    runPlayer(10);

    
    setTimeout( ()=>{
        swiping = false;
        
        BACKGROUND_VELOCITY = 60;
        
        player.powerUp.visible = false;

        if(leftKey) bgVelocity = -BACKGROUND_VELOCITY;
        if(rightKey) bgVelocity = BACKGROUND_VELOCITY;

        if(!leftKeyPressed) leftKey = false;
        if(!rightKeyPressed) rightKey = false;

    },300)
    }
   
}

function isNearTheEdgeOfTheScreen()
 {
   	
 	if(platformOffset===0||player.left<0||player.left > 150&&player.left < 160) movingLeft = false;
 	else movingLeft = true;

 	if(player.left > 500) movingRight = false;		
 	else movingRight = true;
 	
 	
 }


module.exports = {drawBackground,setBackgroundOffset,
	platformOffset,setPlatformVelocity,setPlatformOffset,
drawPlatform,offsetSheet,drawPlayer,runPlayer,swipePlayer};





