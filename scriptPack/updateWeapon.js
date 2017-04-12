function updateWeapon() {
	ammountOfBullet.innerHTML = ammo;
	ammounOfPowerUp.innerHTML  =powerSwipe;
    bearHealth.style.width = `${bearHp*20}px`;
}

module.exports = {updateWeapon}
