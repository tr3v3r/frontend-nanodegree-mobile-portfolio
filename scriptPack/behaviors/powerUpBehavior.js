class powerUpBehavior {
	constructor(leftImg,rightImg) {
		this.leftImg = leftImg;
		this.rightImg = rightImg;
	}
	execute(sprite,now) {	
			
			if(bgVelocity > 0) { 
			sprite.artist.spritesheet = this.rightImg;
			sprite.top = player.top - 40;
			sprite.left =player.left+sprite.offset -180;
			}

			else {
				sprite.artist.spritesheet = this.leftImg;
				sprite.top = player.top - 40;
				sprite.left =player.left+sprite.offset - 40;
			}


	}
}

module.exports = {powerUpBehavior};