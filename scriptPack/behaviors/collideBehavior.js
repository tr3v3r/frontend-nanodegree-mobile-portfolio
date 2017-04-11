let {playSound} = require('../sound');

class collideBehavior {
    constructor(callback) {
        this.callback = callback;
    }
    execute(sprite) {
        let otherSprites;

    for(let i = 0;i < sprites.length; i++) {


        otherSprites = sprites[i];

        if(otherSprites.type!=="bomb"&&otherSprites.type!=="platform"&&otherSprites.type!=="reporterBullet"&&otherSprites.type!=="powerUp") {
        if(isCandidateForCollision(sprite,otherSprites)) {
            if(didCollide(sprite,otherSprites)) {
                processCollision(sprite,otherSprites,this.callback);
            }
        }
        }
    }
    }
}

function isCandidateForCollision(sprite,otherSprites) {
   
   return otherSprites.left - otherSprites.offset < sprite.left + sprite.width;
}

function didCollide(sprite,otherSprites) {

    
    let bombLeft = sprite.left - sprite.offset,
    bombRight = sprite.left+sprite.width - sprite.offset,
    bombTop =  sprite.top,
    bottomTop = sprite.top +sprite.height,
    bombCenterX = bombLeft + sprite.width/2,
    bombCenterY = bombTop + sprite.height/2;
    
    
    return didBombCollideWithOtherSprite(bombLeft,bombTop,bombRight,bottomTop,bombCenterX,bombCenterY,otherSprites);   
            

}

function didBombCollideWithOtherSprite(left,top,right,bottom,centerX,centerY,otherSprites) {
    ctx.beginPath();
            
    ctx.rect(otherSprites.left - otherSprites.offset,otherSprites.top,
        otherSprites.width,otherSprites.height);
    
    return ctx.isPointInPath(left,top) ||
            ctx.isPointInPath(right,top) ||
            ctx.isPointInPath(centerX,centerY) ||
            ctx.isPointInPath(left,bottom) ||
            ctx.isPointInPath(right,bottom);    
    
}

function processCollision(sprite,otherSprites,callback) {

    if((otherSprites.type === "reporter"||
        otherSprites.type === "papparazzi"||
        otherSprites.type ==="cameraMan"
        )&&!otherSprites.exploding) { 
        sprite.used = true;                           
        callback(otherSprites);   
        playSound(enemyDeathSound);      
    } 

    if(otherSprites.type ==="scarlet") {
        sprite.used = true;
    }

    if(otherSprites.type === "bear") {
       
        if(bearHp === 0&&!otherSprites.exploding) {
             callback(otherSprites);
             player.oscar.visible = true;
        }
        else {
             sprite.used = true;
             playSound(bossHintSound);
             bearHp--;
        }
    }
   

    if(otherSprites.type === "iceberg")  {
        sprite.used = true;
    } 
}

module.exports = {collideBehavior};
