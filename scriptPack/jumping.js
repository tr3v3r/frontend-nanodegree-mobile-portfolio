const gravityForse = 9.81;
const pixelsPerMeter = canvas.width/10;

let {getPlatformtop,isPlatformUnderneath}= require('./mainFunctions');
let {playSound} = require('./sound');


class Stopwatch {
	constructor() {
		this.startTime = 0;
		this.running = false;
		this.elapsed = null;
	}

	start() {
		this.startTime = +new Date();
		this.running = true;		
	}

	stop() {
		this.elapsed =(+new Date()) - this.startTime;
		this.running = false;
	}

	getElapsedTime() {
		if(this.running) {
			return (+new Date()) - this.startTime;
		}

		else {
			return this.elapsed;
		}
	}

	isRunning() {
		return this.running;
	}

	reset() {
		this.startTime = 0;
		this.running = false;
		this.elapsed = 0;
	}
} 

class AnimationTimer {
	constructor(duration=1000,transducer) {
		this.transducer = transducer;
		this.stopwatch = new Stopwatch();
		this.duration = duration;		
	}

	start() {this.stopwatch.start()};
	stop() {this.stopwatch.stop()};
	isRunning() {return this.stopwatch.running};
	reset() {this.stopwatch.reset()};

	isExpired() {
		return this.stopwatch.getElapsedTime()>this.duration;
	}

	getElapsedTime() {
		let elapsedTime = this.stopwatch.getElapsedTime();
		let percentComplete = elapsedTime / this.duration;

		if(percentComplete >= 1) {
			percentComplete = 1.0;
		}
		
		if(this.transducer!== undefined && percentComplete >0) {
			elapsedTime = elapsedTime * (this.transducer(percentComplete)/percentComplete);			
		}

		return elapsedTime;
	}
}


AnimationTimer.makeEaseOutTransducer = function (strength) {
   return function (percentComplete) {
      strength = strength ? strength : 1.0;
      return 1 - Math.pow(1 - percentComplete, strength*2);
   };
};

AnimationTimer.makeEaseInTransducer = function (strength) {
   strength = strength ? strength : 1.0;
   return function (percentComplete) {
      return Math.pow(percentComplete, strength*2);
   };
};

AnimationTimer.makeEaseInOutTransducer = function () {
   return function (percentComplete) {
      return percentComplete - Math.sin(percentComplete*2*Math.PI) / (2*Math.PI);
   };
};


AnimationTimer.makeElasticTransducer = function (passes) {
   passes = passes || 3;

   return function (percentComplete) {
       return ((1-Math.cos(percentComplete * Math.PI * passes)) *
               (1 - percentComplete)) + percentComplete;
   };
};

AnimationTimer.makeBounceTransducer = function (bounces) {
   var fn = AnimationTimer.makeElasticTransducer(bounces);

   bounces = bounces || 2;

   return function (percentComplete) {
      percentComplete = fn(percentComplete);
      return percentComplete <= 1 ? percentComplete : 2-percentComplete;
   }; 
};
 


	player = {
    dying:false,
    visible:true,
    platform:platformData[0],	
	left:100,
	level:1,
	top:400,
	jumpHeight:runnerJumpHeight,
	jumpDuration:runnerJumpDuration,
	jumping:false,
	ascendStopwatch:new AnimationTimer(runnerJumpDuration/2,AnimationTimer.makeEaseOutTransducer(1.15)),
	descendSptopwatch:new AnimationTimer(runnerJumpDuration/2,AnimationTimer.makeEaseInTransducer(1.15)),
	falltimer:new AnimationTimer(),	
	falling:false,
	jump(){		
		if(this.jumping) return;

		this.jumping = true;
		this.runAnimationRate=0;
		this.verticalLaunchPosition = this.top;
		this.ascendStopwatch.start();
		playSound(jumpSound);
		
	},

	stopJumping() {
		this.ascendStopwatch.stop();
		this.descendSptopwatch.stop();
		this.jumping = false;

	},

	fall(initialVelocity) {
		this.velocityY = initialVelocity || 0;
		this.initialVelocityY = initialVelocity || 0;
		this.falling = true;


		this.falltimer.start();
	},

	stopFalling() {
		this.falltimer.stop();
		this.velocityY = 0;
		this.falling = false;
	}
}


function jumpExecute() {

	if(!player.jumping) return;
	
	if(isJumpOver()) {
		player.jumping = false;
		return;
	}



	if(isAscending()) {
		if(!isDoneAscending()){
			playerSprite = jumpUP;
			cellIndex=0;			
			ascend();
		} 
		else finishAscend();
	}

	else if(isDescending()) {
		if(!isDoneDescending()) {	
			playerSprite = jumpDown;
			cellIndex=0;		
			descend();
		} 
		else finishDescend();
	}
}

function isJumpOver() {

	return !player.ascendStopwatch.isRunning()&&
			!player.descendSptopwatch.isRunning();
}

function isAscending() {
	return player.ascendStopwatch.isRunning();
}

function ascend() {	
	let elapsed = player.ascendStopwatch.getElapsedTime();
	let deltaY = elapsed/(player.jumpDuration/2)*player.jumpHeight;
	
	player.top = player.verticalLaunchPosition - deltaY;
}

function isDoneAscending() {
	return player.ascendStopwatch.getElapsedTime() > player.jumpDuration/2;
}

function finishAscend() {
	player.jumpApex = player.top;
	player.ascendStopwatch.stop();
	player.descendSptopwatch.start();
}

function isDescending() {
	return player.descendSptopwatch.isRunning();
}

function descend() {
	let elapsed = player.descendSptopwatch.getElapsedTime();
	let deltaY = elapsed/(player.jumpDuration/2)*player.jumpHeight;

	player.top = player.jumpApex + deltaY;
}

function isDoneDescending() {
	return player.descendSptopwatch.getElapsedTime()>player.jumpDuration/2;
}

function finishDescend() {
	player.stopJumping();

	if(isPlatformUnderneath()) {
	player.top = player.verticalLaunchPosition;
	}

	else {
		player.fall(gravityForse*(player.descendSptopwatch.getElapsedTime()/1000)*
		pixelsPerMeter);
	}
	
}


//Падение 

function setPlayerVelocity() {
	player.velocityY = player.initialVelocityY  + 
						gravityForse*(player.falltimer.getElapsedTime()/1000)*
						pixelsPerMeter;
}

function calculateVerticalDrop() {
	return player.velocityY / fps;
}

function executeFalling() {
	let deltaY;

	if(player.jumping) {
		return;
	}

	if(isOutOfPlay()) {
		if(player.falling) {
		player.stopFalling();
        createDeath();
      
	}
	return;
	}

	if(!player.falling) {
		if(!isPlatformUnderneath()) {
			player.fall();
		}
		return;
	}

	setPlayerVelocity();
	deltaY = calculateVerticalDrop();

	if(!willFallBellowCurrentTrack(deltaY)) {
		player.top +=deltaY;
	}

	else {
		if(isPlatformUnderneath()) {
			fallOnPlatform();
			player.stopFalling();
		}

		else {
			player.top +=deltaY;
			player.level--;
		}
	}
}

function isOutOfPlay() {
	return player.top > canvas.height;
}

function willFallBellowCurrentTrack(deltaY) {
	return player.top + 48 + deltaY > getPlatformtop(player.level);
}

function fallOnPlatform() {
	player.top = getPlatformtop(player.level) - 48;
	player.stopFalling();
}


module.exports = {
	player,jumpExecute,executeFalling,AnimationTimer
}

let {createDeath} = require('./Sprite');
