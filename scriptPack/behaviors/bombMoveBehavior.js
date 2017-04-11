function spriteInView(sprite) {
	return sprite.left+sprite.width > platformOffset && 
	sprite.left<platformOffset + canvas.width;
}

let bombMoveBehavior = {
	execute(sprite,now) {
		let opacity  = bgVelocity*5 /fps;
		
		if(sprite.visible) {
			if(!sprite.op) {
				sprite.op = opacity;				
			}

			sprite.left += sprite.op;
			
		}

		if(!spriteInView(sprite)&&sprite.type ==="bomb"||player.dying||sprite.used) {
			sprite.left = player.left + platformOffset;
			sprites.splice(sprites.indexOf(sprite),1);
			

		}
	}
}

module.exports = {
	bombMoveBehavior
}
