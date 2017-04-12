function isPlatformUnderneath() {
	let platform;
	for(let i = 0; i < sprites.length; i++) {

		if(sprites[i].type === "movingPlatform") {
			platform = sprites[i];			
			if(player.left+54>platform.left - platform.offset&&
 		player.left+20<platform.left - platform.offset+platform.width&&player.level === platform.level) return true;
		}
	}
	return false;		 
}

class movePlatformBehavior  {
	constructor(leftBorder,rightBorder) {
		this.lb = leftBorder;
		this.rb =rightBorder;
	}

	checkDirection(sprite) {

		let sRight = sprite.left +sprite.width;
		

		if(sRight > sprite.rb && sprite.direction === "right") {
			sprite.direction = "left";
		}

		else if(sprite.left < sprite.lb &&
		 sprite.direction === "left") {			
			sprite.direction = "right";
		}
	}

	moveSprite(sprite) {
		let pixelsToMove = sprite.velocityX / fps;	
		
		if(sprite.direction === "right") {

			sprite.left += pixelsToMove;
			
			if(player.Mplatform === sprite&&isPlatformUnderneath()&&player.top+48===sprite.top) {
				if(movingRight) {
				if(rightKey||leftKey) {
					player.left+=3 - pixelsToMove;
				}			
				
				else player.left+=pixelsToMove;
				} 

				else {
					if(rightKey||leftKey) {
					platformOffset+=3 - pixelsToMove;
					}
					else platformOffset+=pixelsToMove;
				} 
			}			
		}

		else {
			sprite.left -= pixelsToMove;
			if(player.Mplatform === sprite&&isPlatformUnderneath()&&player.top+48===sprite.top) {
				if(movingLeft) {
				if(rightKey||leftKey) {
					player.left-=3 - pixelsToMove;
				}			
				
				else player.left-=pixelsToMove;
				}
				else {
					if(rightKey||leftKey) {
					platformOffset-=3 - pixelsToMove;
					}
					else platformOffset-=pixelsToMove;
				}
				
			}	
		}
	}

	execute(sprite) {
		this.checkDirection(sprite);
		this.moveSprite(sprite);
	}
}

module.exports = {movePlatformBehavior};