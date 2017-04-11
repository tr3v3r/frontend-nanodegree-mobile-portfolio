coinSound.volume = 0.9;
jumpSound.volume = 0.9;
swipeSound.volume = 0.9;
failureSound.volume = 0.9;
getAmmoSound.volume = 0.9;
enemyDeathSound.volume = 0.9;
shootSound.volume = 0.9;
soundtrack.volume = 0.8;
bossLaugh.volume = 0.7;
victory.volume = 0.8;
bossSoundtrack.volume =0.9;


let soundOn = true;

audioTracks = [
new Audio(),new Audio(),new Audio(),new Audio(),
new Audio(),new Audio(),new Audio(),new Audio(),
new Audio(),new Audio(),new Audio(),new Audio()
]

function soundIsPlaying(sound) {
	return !sound.ended && sound.currentTime>0;
}

function playSound(sound) {
	let track;
	let i;
	if(soundOn) {
		if(!soundIsPlaying(sound)) {
			sound.play();
		}

		else {
			for(  i = 0;i<audioTracks.length;i++) {
				track = audioTracks[i];				
				if(!soundIsPlaying(track)) {

					track.src = sound.currentSrc;					
					track.load();
					track.volume =sound.volume;
					track.play();

					break;
				}
			}
		}
	}
}

module.exports = {playSound};
