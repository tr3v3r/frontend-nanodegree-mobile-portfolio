let {playSound} = require('./sound');

function checkKeys() {
	if(!leftKey&&!rightKey || leftKey&&rightKey) running = false;
	else running = true;
}
    let begin = +new Date();



window.onblur = function() {    
    begin = +new Date(); 
}

window.onfocus = function() {
   lastAnimationFrame += (+new Date() - begin);
}



function animate(now) {
	fps =calculateFps(now);
	draw(now);	
	requestAF = requestAnimationFrame(animate);
}

function calculateFps(now) {    	
	var fps = 1000/(now-lastAnimationFrame);
	lastAnimationFrame = now;
	if(now-lastFpsUpdateTime>1000) {		
		lastFpsUpdateTime = now;
		fpsElement.innerHTML=`${fps} fps`;
	}
	return fps;
}

window.onload = function() {
loading.style.display = "none";
startingScreen.style.visibility = "visible";
    start.onclick = function(event) {    
        startingScreen.style.visibility = "hidden";
        requestAF = requestAnimationFrame(animate);
        lastAnimationFrame += (+new Date() - begin);
        soundtrack.play();
        setTimeout(()=>{
            firstHint.style.opacity = 1;
            setTimeout(()=>{
                firstHint.style.opacity = 0;
            },4000)
        },1000)   
    
    } 
}




function draw(now) {
ctx.clearRect(0,0,900,500);


// отрисовка и движение БГ
setBackgroundOffset();
drawBackground();

// отрисовка и движение платформ
setPlatformVelocity();
setPlatformOffset();
drawPlatform()


// отрисовка и движение персонажей
offsetSheet(now);
drawPlayer();

checkKeys();
runPlayer(4);
swipePlayer();

jumpExecute();

executeCollision();

executeFalling();



updateSprites(now);
setSpriteOffset();
drawSprites();

updateWeapon();

if(soundtrack.ended) {
	soundtrack.play();
}

if((player.left+platformOffset)>7950&&!seeBoss) {
	playSound(bossLaugh);
	seeBoss = true;
	soundtrack.pause();
	bossSoundtrack.play();
    bearHelthBlock.style.visibility = "visible";
}

}


let {setBackgroundOffset,drawBackground,setPlatformVelocity,
setPlatformOffset,drawPlatform,offsetSheet,drawPlayer,
runPlayer,swipePlayer} = require('./requestAnimation');
	
let {jumpExecute,executeFalling,player} = require('./jumping');

let {executeCollision} = require('./collision');

let {setSpriteOffset,drawSprites,updateSprites,createBombSprites} = require('./Sprite');
let {restart} = require('./gameOver');
let {updateWeapon} = require('./updateWeapon');



document.onkeydown = function(event) {
	if(event.keyCode === 70) {
		atacking = true;
	}

    if(event.keyCode === 71) {
    	if(powerSwipe>0&&!swipingNow)  {
    	   swipingNow = true;
    	   powerSwipe--;    	
           swiping = true;
           player.powerUp.visible = true;
           playSound(swipeSound);
    	}
    }  

	if(event.keyCode===32||event.keyCode===38) {
	   if(!player.falling) {
	       player.jump();	
	   }
    }

	if(event.keyCode ===39) {
		rightKey = true;
        rightKeyPressed = true;		
	}

	if(event.keyCode ===37) {		
		leftKey = true;		
        leftKeyPressed = true;	
	}
}


document.onkeyup = function(event) {

	if(event.keyCode ===70) {
		atacking = false;			
	}

	if(event.keyCode ===39) {
		
		rightKey = false;			
		rightKeyPressed = false;	
	}

	if(event.keyCode ===37) {			
	    leftKey = false;	
	    leftKeyPressed = false;
		
	}

	if(event.keyCode === 71) {
		swipingNow = false;
	 }

}














