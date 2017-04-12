function spriteInView(sprite) {
   
    return sprite.left+sprite.width > platformOffset && 
    sprite.left<platformOffset + canvas.width && sprite.top<canvas.height&& sprite.top>0;
}

let bulletVelocity = 100;
let reporterBulletMoveBehavior = {
    execute(sprite,now) {      

        
        if(sprite.visible && spriteInView(sprite)) {
            let velocity = bulletVelocity/fps;

            if(sprite.tangens < 0.2) {
                 sprite.left -= velocity;
            }
            else {            
            sprite.left -= velocity/sprite.tangens;
                if((player.top - sprite.sniper.top)>0){
                sprite.top += velocity
                }
                else{
                sprite.top -= velocity
                }
            }
        }

        if(!spriteInView(sprite)||player.dying||gameWon) {

            sprite.tangens = Math.abs(player.top - sprite.sniper.top)/(sprite.sniper.left-platformOffset-player.left);  
            
            sprite.visible = false;
        }

        
    }
}


module.exports = {
    reporterBulletMoveBehavior
}





