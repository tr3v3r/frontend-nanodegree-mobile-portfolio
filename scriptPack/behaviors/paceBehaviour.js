let paceBehavior = {
	checkDirection(sprite) {

		let sRight = sprite.left +sprite.width;
		let pRight = sprite.platform.left + sprite.platform.width;

		if(sRight > pRight && sprite.direction === "right") {
			sprite.direction = "left";
		}

		else if(sprite.left < sprite.platform.left &&
		 sprite.direction === "left") {			
			sprite.direction = "right";
		}
	},

	moveSprite(sprite) {
		let pixelsToMove = sprite.velocityX / fps;
				
		if(sprite.direction === "right") {			
			sprite.left += pixelsToMove;			
		}

		else {
			sprite.left -= pixelsToMove;
		}
	},

	execute(sprite) {
		this.checkDirection(sprite);
		this.moveSprite(sprite);
	}

}

module.exports = {
	paceBehavior
	
}