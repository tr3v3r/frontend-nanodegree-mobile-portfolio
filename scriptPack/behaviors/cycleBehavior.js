class cycleBevior  {
	constructor(duration,interval) {
		this.duration = duration || 0;
		this.inerval = interval || 0;
		this.lastAdvance = 0;
	}

	execute(sprite,now) {
		if(this.lastAdvance === 0) {
			this.lastAdvance = now;
		}

		if(this.interval && sprite.artist.cellIndex ===0) {
			if(now - this.lastAdvance < this.interval) {
				sprite.artist.advance();
				lastAdvance = now;
			}
		}

		else if(now - this.lastAdvance > this.duration) {
			sprite.artist.advance();
			this.lastAdvance = now;
		}
	}
}

module.exports = {
	cycleBevior
	
}