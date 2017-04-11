	


	function isPlatformUnderneath() {
	let platform;
	for(let i = 0; i < sprites.length; i++) {

		if(sprites[i].type === "platform"||sprites[i].type === "movingPlatform") {
			platform = sprites[i];			
			if(player.left+54>platform.left - platform.offset&&
 		player.left+20<platform.left - platform.offset+platform.width&&player.level === platform.level) return true;
		}
	}
	return false;		 
}
	

function getPlatformtop(level) {

	if(level === 1) return 448;
	if(level ===2) return 360;
	if(level ===3) return 250;
	if(level ===4) return 150;
}

	

module.exports = {isPlatformUnderneath,getPlatformtop};