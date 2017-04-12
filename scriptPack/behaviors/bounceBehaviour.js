let {AnimationTimer} = require('../jumping');

class bounceBehaviour{
constructor(duration,height) {
	this.duration = duration || 1000;
	this.distance = height*2 || 100;
	this.bouncing = false;
	this.timer  = new AnimationTimer(this.duration,AnimationTimer.makeBounceTransducer(1));
	this.paused = false;
}
	startBouncing(sprite,now) {
		this.baseline = sprite.top;
		this.bouncing = true;
		this.timer.start(now);
	}

	resetTimer(now) {
		this.timer.stop(now);
		this.timer.reset(now);
		this.timer.start(now);
	}

	adjustVerticalPosition(sprite,elapsed,now) {
		let rising = false;
		let deltaY = this.timer.getElapsedTime(now) / this.duration*
					this.distance;

		if(elapsed < this.duration/2) rising = true;
		
		if(rising) {
			sprite.top = this.baseline - deltaY;
		}	
		else {
			sprite.top = this.baseline - this.distance+deltaY;
		}		
	}

	execute(sprite,now) {
		let elapsed;
		let deltaY;

		if(!this.bouncing) {
			this.startBouncing(sprite,now);
		}

		else {
			elapsed  =this.timer.getElapsedTime(now);

			if(this.timer.isExpired(now)) {
				this.resetTimer(now);
				return;
			}

			 this.adjustVerticalPosition(sprite, elapsed, now);
		}
	}
}
module.exports = {
	bounceBehaviour
}
