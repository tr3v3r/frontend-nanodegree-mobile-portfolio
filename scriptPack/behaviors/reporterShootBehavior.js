let reporterShootBehavior = {
    execute(sprite,now) {
        let bullet = sprite.ammo;
       
        if(!bullet.visible) {
            
            bullet.left = sprite.left +15;
            bullet.top = sprite.top+16;
            bullet.visible = true;
        }
    }
}

module.exports = {
    reporterShootBehavior
}
