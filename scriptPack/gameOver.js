let {getPlatformtop}= require('./mainFunctions');
let {businesSkin} = require('./changeSkin');

function restart() {      
     
       sprites = sprites.concat(garbage);
       garbage = [];  

       backgroundOffset = 0;
       platformOffset = 0;
        
       soundtrack.currentTime = 0;
       soundtrack.play(); 
        setTimeout(()=>{
        playerRestart()},30); 


    
}

function playerRestart() { 
   
    player.left = 100;
    player.level = 3;
    player.top = getPlatformtop(player.level);

    player.dying = false;
    player.visible = true;

    health = 3;
    healthBar.innerHTML = healthNodes;
    avatar.src = "images/leoFace.png"

    if(player.skin) player.skin.visible =true;
    bearHelthBlock.style.visibility = "hidden";

    ammo = 30;
    powerSwipe = 0;
    bearHp = 10;
    seeBoss = false;
    
    businesSkin();
    score.innerHTML = 0;

    if(player.falling) player.stopFalling();
    if(player.jumping) player.stopJumping();

}


function gameContinue() {
  if(health>0) {
  health--;
  healthBar.lastElementChild.remove();

  player.dying = false;
  player.visible = true;
   seeBoss = false;
   
  let prevPlatform  = platformData[platformData.indexOf(player.platform)-1]?
  platformData[platformData.indexOf(player.platform)-1]:
  platformData[platformData.indexOf(player.platform)];

  platformOffset = prevPlatform.left;
  bearHelthBlock.style.visibility = "hidden";
  player.level = prevPlatform.level;
  player.top = getPlatformtop(player.level)-48;
  player.left = 0;
  
   soundtrack.play();

  if(player.falling) player.stopFalling();
  if(player.jumping) player.stopJumping();
  }
}

module.exports = {restart};



gameMessage.onclick = gameOver.onclick = function(event) {
    let target = event.target;
        if(target.id === "restart") {
            restart();
            this.style.opacity = 0;
            this.style.visibility = "hidden";
        }

        else if(target.id === "continue"&&health>0) {
                 gameContinue();
                 this.style.opacity = 0;
                 this.style.visibility = "hidden";
        }
}
