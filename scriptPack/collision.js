let {player} = require('./jumping');
var {getPlatformtop}= require('./mainFunctions');
var {explode,createDeath}= require('./Sprite');
let {changeSkin} = require('./changeSkin');
let {playSound} = require('./sound')

function executeCollision() {

	let otherSprites;

	for(let i = 0;i < sprites.length; i++) {
		otherSprites = sprites[i];
		if(otherSprites.type!=="bomb") {
		if(isCandidateForCollision(otherSprites)) {
			if(didCollide(otherSprites)) {
				processCollision(otherSprites);
			}
		}
		}
	}
}

function isCandidateForCollision(otherSprites) {
	return otherSprites.left - otherSprites.offset < player.left + 50;
}

function didCollide(otherSprites) {

	let left = player.left+10,
	right = player.left + 54,
	top = player.top,
	bottom = player.top + 48,
	centerX = left + 27,
	centerY = top + 24;	
	
	return didRunnerCollideWithOtherSprite(left,top,right,bottom,centerX,centerY,otherSprites);			

}

function didRunnerCollideWithOtherSprite(left,top,right,bottom,centerX,centerY,otherSprites) {
	
	
		ctx.beginPath();
	    ctx.rect(otherSprites.left - otherSprites.offset,otherSprites.top,
		otherSprites.width,otherSprites.height);

	if(otherSprites.type ==="platform") {                   
		return ctx.isPointInPath(left,bottom) ||
			ctx.isPointInPath(right,bottom);
	}

	else {
       
        return ctx.isPointInPath(left,top) ||
			ctx.isPointInPath(right,top) ||
			ctx.isPointInPath(centerX,centerY) ||
			ctx.isPointInPath(left,bottom) ||
			ctx.isPointInPath(right,bottom)}
		
}



function processCollision(otherSprites) {
	if(otherSprites.type === "papparazzi"||
		otherSprites.type === "reporter"||
        otherSprites.type ==="reporterBullet"||
        otherSprites.type ==="cameraMan"||
        otherSprites.type ==="scarlet"||
        otherSprites.type ==="iceberg"||
        otherSprites.type ==="bear") {

        if(swiping&&!otherSprites.exploding&&otherSprites.type !=="bear") {

            explode(otherSprites);

             playSound(enemyDeathSound);
        }
      else if(!player.dying&&player.visible&&otherSprites.visible&&!swiping) {        
            createDeath();
       }		
	}

	if(otherSprites.type ==="oscar"&&otherSprites.visible&&!otherSprites.exploding) {
		explode(otherSprites);
		bossSoundtrack.pause();
		playSound(victorySound);
		gameWon = true;
		player.visible = false;
		  setTimeout(()=>{
             	
            	 victory.style.visibility = "visible";
                                
                 victory.style.opacity = 1;
                                
             },500)
		
	}

    if(otherSprites.type === "coin"&&!otherSprites.exploding) {        
        explode(otherSprites);       
        score.innerHTML=Number(score.innerHTML)+100 ;
         playSound(coinSound);
    }

    if(otherSprites.type === "rastberry"&&!otherSprites.exploding) {        
        explode(otherSprites);       
        ammo++;
        playSound(getAmmoSound);
    }

    if(otherSprites.type === "swipe"&&!otherSprites.exploding) {        
        explode(otherSprites);       
        powerSwipe++;
        playSound(getAmmoSound);

    }

    if(otherSprites.type === "skin"&&otherSprites.visible) {
    	player.skin = otherSprites;
    	otherSprites.visible = false;
    	changeSkin();
    	avatar.src = "images/revFace.png"
    	powerSwipe = 5;
    	playSound(skinSound);
        setTimeout(()=>{
            secondHint.style.opacity = 1;
            setTimeout(()=>{
                secondHint.style.opacity = 0;
            },4000)
        },1000)
    }

	if(player.jumping && otherSprites.type === "platform") {
		processPlatformCollisionDuringJump(otherSprites);
	}

	if(player.jumping && otherSprites.type === "movingPlatform") {
		processMovingPlatformCollisionDuringJump(otherSprites);
	}
}

function processPlatformCollisionDuringJump(platform) {
	let isDescending = player.descendSptopwatch.isRunning();

	
	if(isDescending) {
		player.stopJumping();
		player.level = platform.level;
		player.platform = platform;
		player.top = getPlatformtop(player.level) - 48; 
	}

	
}

function processMovingPlatformCollisionDuringJump(platform) {
	let isDescending = player.descendSptopwatch.isRunning();

	
	if(isDescending) {
		player.stopJumping();
		player.level = platform.level;
		player.Mplatform = platform;
		player.top = getPlatformtop(player.level) - 48;  
	}

	
}

module.exports = {
	executeCollision
}
