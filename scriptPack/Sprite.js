let {cycleBevior} = require('./behaviors/cycleBehavior');
let {paceBehavior} = require('./behaviors/paceBehaviour');
let {bombMoveBehavior} = require('./behaviors/bombMoveBehavior');
let {bounceBehaviour} = require('./behaviors/bounceBehaviour');
let {collideBehavior} = require('./behaviors/collideBehavior');
let {reporterBulletMoveBehavior} = require('./behaviors/reporterBulletMoveBehavior');
let {reporterShootBehavior} = require('./behaviors/reporterShootBehavior');
let {powerUpBehavior} = require('./behaviors/powerUpBehavior');
let {movePlatformBehavior} = require('./behaviors/movePlatformBehavior');
let {setCoinsMap,setAmmoMap,setSwipeMap} = require('./coinsMap');
let {playSound} = require('./sound');
let {getPlatformtop}= require('./mainFunctions');


class Sprite {
	constructor(type ='',artist,behaviors=[]) {
		this.type = type;
		this.artist = artist;
		this.behaviors = behaviors;

        this.exploding = false; 

		this.left = 0;
		this.top = 0;
		this.width = 10;
		this.height = 10;

		this.velocityX = 0;
		this.velocityY =0;

		this.visible = true;
		this.direction = "right";
	}

	draw(context) {

		if(this.artist && this.visible) {
			this.artist.draw(this,context);
		}
	}

	update(now) {

		for(let i = 0; i < this.behaviors.length;i++) {

			if(this.behaviors[i]===undefined) {
				return;
			}

			this.behaviors[i].execute(this,now);
		}
	}
}

class SpriteSheetArtist {
	constructor(spritesheet,cells) {
		this.cells = cells;
		this.spritesheet = spritesheet;
		this.cellIndex =0;
	}

	advance() {		
		
		if(this.cellIndex === this.cells.length-1) {
			this.cellIndex =0;
		}
		else {
			this.cellIndex++;
		}
	}

	draw(sprite,context) {
		let cell = this.cells[this.cellIndex];	
		let top;
		let left;
		
		if(sprite.type === "papparazzi") {
			if(this.cellIndex===3) {
				left = sprite.left -32;
				top = sprite.top - 47;
			}

			else if (this.cellIndex === 2) {
				left = sprite.left -47;
				top = sprite.top - 63;
			}

			else {
			left = sprite.left;
			top = sprite.top;
		}
			
		} 

		else if(sprite.type === "coinExp") {
			left = sprite.left -20;
			top = sprite.top -20;
		}
			else {
			left = sprite.left;
			top = sprite.top;
		}
		
		
			context.drawImage(this.spritesheet,
			cell.left,cell.top,
			cell.width,cell.height,
			left,top,
			cell.width,cell.height);
			}



	}


// Спрайт папараци

//// Фотографы стоячие
let pappSheet = new Image();
pappSheet.onload = function() {
	ctx.drawImage(pappSheet,0,0);
}
pappSheet.src = "images/pappa.png";

let allPaparazzi = [];
let paparData = [{platformIndex:1},{platformIndex:0,offset:800,behaviors:[new cycleBevior(10,1500)]},
				 {platformIndex:1},{platformIndex:0,offset:500,behaviors:[new cycleBevior(10,1500),
				 	new bounceBehaviour(2000,120)]},
				 	{platformIndex:5},{platformIndex:9,offset:50},{platformIndex:14,offset:150}];


//// Фотографы сидячие
let pappSheet2 = new Image();
pappSheet2.onload = function() {
	ctx.drawImage(pappSheet2,0,0);
}
pappSheet2.src = "images/pappa2.png";

let allPaparazzi2 = [];
let paparData2 = [{platformIndex:0,offset:300,behaviors:[new cycleBevior(30,1500)]},					
					{platformIndex:0,offset:700},
					{platformIndex:6,offset:500},
					{platformIndex:14,offset:300}
					];
//// Тетка репортер

let retorterSheet = new Image();
retorterSheet.onload = function() {
	ctx.drawImage(pappSheet2,0,0);
}
retorterSheet.src = "images/reporter.png";


let retorters = [];
let reporterData = [
{platformIndex:4},
{platformIndex:18,offset:100},
{platformIndex:19}];


/// Монеты 

let coinSheet = new Image();
coinSheet.onload = function() {
    ctx.drawImage(coinSheet,0,0);
}
coinSheet.src = "images/coins.png";

let coins = [];
let coinsData = setCoinsMap();


// powerUp

let powerUpSheet = new Image();
powerUpSheet.onload = function() {
    ctx.drawImage(powerUpSheet,0,0);
}
powerUpSheet.src = "images/powerup-right.png";

let powerUpSheetLeft = new Image();
powerUpSheetLeft.onload = function() {
    ctx.drawImage(powerUpSheetLeft,0,0);
}
powerUpSheetLeft.src = "images/powerup-left.png";

// revenant skin

let newSkin = new Image();
newSkin.onload = function() {
    ctx.drawImage(newSkin,0,0);
}
newSkin.src = "images/revenant.png";
let newSkinData = [{platformIndex:6,offset:150}]
let skins = [];

// Gold rastberry

let rastberrySheet = new Image();
rastberrySheet.onload = function() {
    ctx.drawImage(rastberrySheet,0,0);
}
rastberrySheet.src = "images/rastberry.png";
let rastberryData = setAmmoMap();
let rasberries = [];

// Swipe 
let swipeSheet = new Image();
swipeSheet.onload = function() {
    ctx.drawImage(swipeSheet,0,0);
}
swipeSheet.src = "images/swipe.png";
let swipeData = setSwipeMap();
let swipes = [];

//cameraMan
let cameraManSheet = new Image();
cameraManSheet.onload = function() {
    ctx.drawImage(cameraManSheet,0,0);
}
cameraManSheet.src = "images/cameraman.png";
let cameraManData = [{platformIndex:0,offset:600,behaviors:[new bounceBehaviour(1500,120)]},
{platformIndex:7},{platformIndex:15,offset:325}];
let cameraMans = [];

//scarlet 

let scarletSheet = new Image();
cameraManSheet.onload = function() {
    ctx.drawImage(scarletSheet,0,0);
}
scarletSheet.src = "images/scarlet.png";
let scarletData = [{platformIndex:5,offset:300},{platformIndex:9},
{platformIndex:11,offset:50},{platformIndex:12},{platformIndex:13,offset:125},{platformIndex:15,offset:125}]
let scarlets = [];

//iceberg 

let icebergSheet = new Image();
icebergSheet.onload = function() {
    ctx.drawImage(icebergSheet,0,0);
}
icebergSheet.src = "images/iceberg.png";
let icebergData = [{platformIndex:8}]
let icebergs = [];

//moving platform
let movingPlatformSheet = new Image();
movingPlatformSheet.onload = function() {
    ctx.drawImage(movingPlatformSheet,0,0);
}
movingPlatformSheet.src = "images/plate.png";
let movingPlatformData = [{left:2950,level:2,lb:2950,rb:3350},
						  {left:3550,level:3,lb:3350,rb:3750},
						  {left:5150,level:4,lb:5150,rb:5550}
							]
let movingPlatforms = [];

// bear 

let bearSheet = new Image();
bearSheet.onload = function() {
    ctx.drawImage(bearSheet,0,0);
}
bearSheet.src = "images/bear.PNG";
let bearData = [{platformIndex:17}];
                            
let bears = [];

// oscar 

let oscarSheet = new Image();
oscarSheet.onload = function() {
    ctx.drawImage(oscarSheet,0,0);
}
oscarSheet.src = "images/oscar.png";
let oscarData = [{platformIndex:17,offset:400}];
                            
let oscars = [];




let pappCellsWidth = 55;
let pappCellsHeight  =55;

let reporterCellsWidth = 45;
let reporterCellsHeight  =50;

let coinCellsWidth = 25;
let coinCellsHeight  =25;

let powerUpCellsWidth = 240;
let powerUpCellsHeight = 117;

let cameraManCellsWidth = 52;
let cameraManCellsHeight = 49;

let scarletCellsWidth = 30;
let scarletCellsHeight = 45;

let bearCellsWidth = 62;
let bearCellsHeight = 79;

let oscarWidth = 25;
let oscarHeight = 45;

paparazziCells = [
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight},
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight},
	{left:17,top:137,width:118,height:117},
	{left:294,top:23,width:88,height:102},	
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight},
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight},
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight},
	{left:63,top:70,width:pappCellsWidth,height:pappCellsHeight}]


reporterCells = [
	{left:0,top:0,width:reporterCellsWidth,height:reporterCellsHeight},
	{left:45,top:0,width:reporterCellsWidth,height:reporterCellsHeight},
	{left:0,top:50,width:reporterCellsWidth,height:reporterCellsHeight},
	{left:45,top:50,width:reporterCellsWidth,height:reporterCellsHeight}
]



coinCells = [
    {left:0,top:0,width:coinCellsWidth,height:coinCellsHeight},
    {left:26,top:0,width:coinCellsWidth,height:coinCellsHeight},
    {left:0,top:27,width:coinCellsWidth,height:coinCellsHeight},
    {left:26,top:27,width:coinCellsWidth,height:coinCellsHeight}
]

powerUpCells = [
	{left:11,top:66,width:powerUpCellsWidth,height:powerUpCellsHeight},
	{left:268,top:66,width:powerUpCellsWidth,height:powerUpCellsHeight},
	{left:525,top:66,width:powerUpCellsWidth,height:powerUpCellsHeight},
	{left:11,top:325,width:powerUpCellsWidth,height:powerUpCellsHeight},
	{left:268,top:325,width:powerUpCellsWidth,height:powerUpCellsHeight},
	{left:525,top:325,width:powerUpCellsWidth,height:powerUpCellsHeight},

]

newSkinCells = [
	{left:0,top:0,width:60,height:82}
	
	]

raspberryCells = [
	{left:0,top:0,width:20,height:31}
]

swipeCells = [
	{left:0,top:0,width:57,height:26}
]

icebergCells = [
	{left:0,top:0,width:125,height:105}
]

cameraManCells = [
	{left:0,top:0,width:cameraManCellsWidth,height:cameraManCellsHeight},
	{left:58,top:0,width:cameraManCellsWidth,height:cameraManCellsHeight},
	{left:0,top:51,width:cameraManCellsWidth,height:cameraManCellsHeight},
	{left:58,top:51,width:cameraManCellsWidth,height:cameraManCellsHeight}
]

scarletCells = [
	{left:21,top:9,width:scarletCellsWidth,height:scarletCellsHeight},
	{left:87,top:9,width:scarletCellsWidth,height:scarletCellsHeight},
	{left:154,top:9,width:scarletCellsWidth,height:scarletCellsHeight},
	{left:21,top:76,width:scarletCellsWidth,height:scarletCellsHeight}
	
]

movingPlatformCells = [
	{left:0,top:14,width:200,height:20}
]

bearCells = [
    {left:21,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:91,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:163,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:235,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:303,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:379,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:447,top:93,width:bearCellsWidth,height:bearCellsHeight},
    {left:518,top:93,width:bearCellsWidth,height:bearCellsHeight},    
    {left:21,top:186,width:bearCellsWidth,height:bearCellsHeight},
    {left:99,top:186,width:bearCellsWidth+21,height:bearCellsHeight},
    {left:183,top:186,width:bearCellsWidth+21,height:bearCellsHeight}
]

oscarCells = [
    {left:0,top:0,width:oscarWidth,height:oscarHeight},
    {left:25,top:0,width:oscarWidth,height:oscarHeight},
    {left:48,top:0,width:oscarWidth,height:oscarHeight},
    {left:69,top:0,width:oscarWidth,height:oscarHeight},
    {left:90,top:0,width:oscarWidth,height:oscarHeight}    
]


//Спрайт снаядов
let bombSheet = new Image();
bombSheet.onload = function() {
	ctx.drawImage(bombSheet,0,0);
}
bombSheet.src = "images/rberry.png";

bobmCells = [{left:0,top:0,width:15,height:15}];



function createSprites() {
	createPaparazziSprites();
	createSittingPaparazziSprites();
	createReporterSprites();
    createCoinSprites();
    createPowerUpSprite();
    createSkinSprites();
    createRastberrySprites();
    createSwipeSprites();
    createCameraManSprites();
    createScarletSprites();
    createIcebergSprites();
    createMovingPlatformSprites();
    createBearSprites();
    createOscarSprites();

	addSpritesToSpriteArray();
}

createSprites();

function createPaparazziSprites() {
	let pappa;
	let pappaArtist;

	for(let i = 0; i < paparData.length;i++) {
        pappaArtist = new SpriteSheetArtist(pappSheet.cloneNode(false),paparazziCells);
		
		pappa = new Sprite('papparazzi',pappaArtist,
		[paceBehavior,new cycleBevior(20,1500),new bounceBehaviour(2000,120)]);
		pappa.width =  pappCellsWidth;
		pappa.height =  pappCellsHeight;

		pappa.velocityX = paparazziPaceVelocity;
		allPaparazzi.push(pappa);
	}
}

function createSittingPaparazziSprites() {
	let pappa;
	let pappaArtist;

	for(let i = 0; i < paparData2.length;i++) {

        pappaArtist = new SpriteSheetArtist(pappSheet2.cloneNode(false),paparazziCells);
		pappa = new Sprite('papparazzi',pappaArtist,[new cycleBevior(20,1500)]);
		pappa.width =  pappCellsWidth;
		pappa.height =  pappCellsHeight;

		pappa.velocityX = paparazziPaceVelocity;

		allPaparazzi2.push(pappa);
	}
}


function createReporterSprites() {
	let retorter;
	let retorterArtist;

	for(let i = 0; i < reporterData.length;i++) {

        retorterArtist = new SpriteSheetArtist(retorterSheet.cloneNode(false),reporterCells);
		retorter = new Sprite('reporter',retorterArtist,[paceBehavior,new cycleBevior(20,1500),reporterShootBehavior]);
		retorter.width =  reporterCellsWidth;
		retorter.height =  reporterCellsHeight;

		retorter.velocityX = paparazziPaceVelocity;
		retorters.push(retorter);

	}
}

function armReporters() {
    let retorter,
    reporterAmmo  = new SpriteSheetArtist(bombSheet,bobmCells);

    for(let i = 0; i < retorters.length; i++) {
        retorter = retorters[i];

        retorter.ammo = new Sprite("reporterBullet",reporterAmmo,[reporterBulletMoveBehavior]);

        retorter.ammo.width = 30;
        retorter.ammo.height =  32;

        retorter.ammo.top = retorter.top + retorter.ammo.height/2;
       
        retorter.ammo.left = retorter.left + retorter.ammo.width/2;
        retorter.ammo.visible = false;

        retorter.ammo.sniper = retorter;

        sprites.push(retorter.ammo);

    }
}


function createCoinSprites() {
    let coin;
    let coinArtist;

    for(let i = 0; i < coinsData.length;i++) {

        coinArtist = new SpriteSheetArtist(coinSheet.cloneNode(false),coinCells);
        coin = new Sprite('coin',coinArtist,[new cycleBevior(100,1500)]);
        coin.width =  coinCellsWidth;
        coin.height =  coinCellsHeight;
        

        coin.velocityX = paparazziPaceVelocity;
        coins.push(coin);
    }
}


function createSkinSprites() {
    let skin;
    let skinArtist;

     for(let i = 0; i < newSkinData.length;i++) {
        skinArtist = new SpriteSheetArtist(newSkin,newSkinCells);
        skin = new Sprite('skin',skinArtist); 
        skin.width = 60;
        skin.height = 82;        
        skins.push(skin);
    }
}

function createRastberrySprites() {
    let rastberry;
    let rastberryArtist;

     for(let i = 0; i < rastberryData.length;i++) {
        rastberryArtist = new SpriteSheetArtist(rastberrySheet.cloneNode(false),raspberryCells);
        rastberry = new Sprite('rastberry',rastberryArtist,[new cycleBevior(100,1500)]); 
        rastberry.width = 20;
        rastberry.height = 31;        
        rasberries.push(rastberry);
    }
}

function createSwipeSprites() {
    let swipe;
    let swipeArtist;

     for(let i = 0; i < swipeData.length;i++) {
        swipeArtist = new SpriteSheetArtist(swipeSheet.cloneNode(false),swipeCells);
        swipe = new Sprite('swipe',swipeArtist,[new cycleBevior(100,1500)]); 
        swipe.width = 57;
        swipe.height = 26;        
        swipes.push(swipe);
    }
}

function createCameraManSprites() {
	let cameraMan;
	let cameraManArtist;

	for(let i = 0; i < cameraManData.length;i++) {

        cameraManArtist = new SpriteSheetArtist(cameraManSheet.cloneNode(false),cameraManCells);
		cameraMan = new Sprite('cameraMan',cameraManArtist,[paceBehavior,new cycleBevior(20,1500)]);
		cameraMan.width =  cameraManCellsWidth;
		cameraMan.height =  cameraManCellsHeight;

		cameraMan.velocityX = paparazziPaceVelocity;
		cameraMans.push(cameraMan);
	}
}



function createScarletSprites() {
	let scarlet;
	let scarletArtist;

	for(let i = 0; i < scarletData.length;i++) {

        scarletArtist = new SpriteSheetArtist(scarletSheet.cloneNode(false),scarletCells);
		scarlet = new Sprite('scarlet',scarletArtist,[paceBehavior,new cycleBevior(20,1500)]);
		scarlet.width =  scarletCellsWidth;
		scarlet.height =  scarletCellsHeight;

		scarlet.velocityX = paparazziPaceVelocity;
		scarlets.push(scarlet);
	}
}


function createIcebergSprites() {
    let iceberg;
    let icebergArtist;

     for(let i = 0; i < icebergData.length;i++) {
        icebergArtist = new SpriteSheetArtist(icebergSheet,icebergCells);
        iceberg = new Sprite('iceberg',icebergArtist,[new cycleBevior(100,1500),paceBehavior]); 
        iceberg.width = 125;
        iceberg.height = 105; 
        iceberg.velocityX = paparazziPaceVelocity + 50;       
        icebergs.push(iceberg);
    }
}


function createMovingPlatformSprites() {
    let movingPlatform;
    let movingPlatformArtist;

     for(let i = 0; i < movingPlatformData.length;i++) {
        movingPlatformArtist = new SpriteSheetArtist(movingPlatformSheet,movingPlatformCells);
        movingPlatform = new Sprite('movingPlatform',movingPlatformArtist,[new cycleBevior(100,1500),
        																	new movePlatformBehavior()]); 
        movingPlatform.width = 200;
        movingPlatform.height = 20; 
        movingPlatform.velocityX = paparazziPaceVelocity + 50;       
        movingPlatforms.push(movingPlatform);
    }
}

function createBearSprites() {
    let bear;
    let bearArtist;
    	
    for(let i = 0; i < bearData.length;i++) {

        bearArtist = new SpriteSheetArtist(bearSheet.cloneNode(false),bearCells);
        bear = new Sprite('bear',bearArtist,[paceBehavior,new cycleBevior(100,2500)]);
        bear.width =  bearCellsWidth;
        bear.height =  bearCellsHeight;        
        bear.velocityX = paparazziPaceVelocity*3;
        test = bear;
        bears.push(bear);
    }
}

function createOscarSprites() {
    let oscar;
    let oscarArtrist;

    for(let i = 0; i < oscarData.length;i++) {

        oscarArtrist = new SpriteSheetArtist(oscarSheet.cloneNode(false),oscarCells);
        oscar = new Sprite('oscar',oscarArtrist,[new cycleBevior(100,2500),new bounceBehaviour(2000,120)]);
        oscar.width =  oscarWidth;
        oscar.height =  oscarHeight;  
        oscar.visible =false;
        player.oscar = oscar;      
        oscar.velocityX = paparazziPaceVelocity;
        oscars.push(oscar);
    }
}







let lastTimeFired = 0;
function createBombSprites(now) {
	if(atacking&&now-lastTimeFired > 200&&ammo>0) {
	lastTimeFired = now;
	let bomb;
	let bombArtist = new SpriteSheetArtist(bombSheet,bobmCells);
	bomb = new Sprite('bomb',bombArtist,[bombMoveBehavior,new collideBehavior(explode)]);
	bomb.width = 30;
	bomb.height = 32;
	
	bomb.top = player.top + 10;
	bomb.left = player.left + platformOffset+ 20;
	bomb.visible = true;	
	bomb.used = false;
	ammo--;	
	playSound(shootSound);
	sprites.push(bomb);
	}
}


function createPowerUpSprite() {
	
	
	let powerUpArtist = new SpriteSheetArtist(powerUpSheet,powerUpCells);
	player.powerUp = new Sprite('powerUp',powerUpArtist,[new powerUpBehavior(powerUpSheetLeft,powerUpSheet),new cycleBevior(20,1500)]);


	player.powerUp.width = powerUpCellsWidth;
	player.powerUp.height = powerUpCellsHeight;

	player.powerUp.top = player.top - powerUpCellsHeight/2;
	player.powerUp.left = player.left +platformOffset - powerUpCellsWidth;

	player.powerUp.visible = false;

	sprites.push(player.powerUp);
	
	
}





function initializeSprites() {
	
	positionSprites(allPaparazzi,paparData);
	positionSprites(allPaparazzi2,paparData2);
	positionSprites(retorters,reporterData);
    armReporters();
    positionSprites(coins,coinsData);
    positionSprites(skins,newSkinData);
    positionSprites(rasberries,rastberryData);
    positionSprites(swipes,swipeData);
     positionSprites(cameraMans,cameraManData);
     positionSprites(scarlets,scarletData);
     positionSprites(icebergs,icebergData);
     positionSprites(movingPlatforms,movingPlatformData);
     positionSprites(bears,bearData);
     positionSprites(oscars,oscarData);
}

function positionSprites(sprites,spriteData) {
	let sprite;

	for(let i = 0; i< sprites.length; i++) {
		
		sprite = sprites[i];		
	if(spriteData[i].platformIndex!==undefined) {
		
		putSpriteOnPlatform(sprite,platformData[spriteData[i].platformIndex]);
		if(spriteData[i].offset) sprite.left+=spriteData[i].offset;
		if(spriteData[i].behaviors) sprite.behaviors = spriteData[i].behaviors;
	}

	else {
		if(sprite.type ==="movingPlatform") {
			sprite.top = getPlatformtop(spriteData[i].level);
			sprite.level = spriteData[i].level;
			sprite.lb = spriteData[i].lb;
			sprite.rb = spriteData[i].rb;
		}
		else{sprite.top = spriteData[i].top;}
		
		sprite.left = spriteData[i].left;
	}}}

function putSpriteOnPlatform(sprite,platform) {	

	sprite.top =  platform.top - sprite.height;
	sprite.left = platform.left;
	sprite.platform = platform;	}



function addSpritesToSpriteArray() {
	let i;

	for(i = 0; i < allPaparazzi.length; i++) {		
		sprites.push(allPaparazzi[i]);
	}	

	for(i = 0; i < allPaparazzi2.length; i++) {		
		sprites.push(allPaparazzi2[i]);
	}

	for(i = 0; i < retorters.length; i++) {		
		sprites.push(retorters[i]);
	}

    for(i = 0; i < coins.length; i++) {     
        sprites.push(coins[i]);
    }

    for(i = 0; i < skins.length; i++) {     
        sprites.push(skins[i]);
    }

    for(i = 0; i < rasberries.length; i++) {     
        sprites.push(rasberries[i]);
    }

    for(i = 0; i < swipes.length; i++) {     
        sprites.push(swipes[i]);
    }

     for(i = 0; i < cameraMans.length; i++) {     
        sprites.push(cameraMans[i]);
    }

     for(i = 0; i < scarlets.length; i++) {     
        sprites.push(scarlets[i]);
    }

     for(i = 0; i < icebergs.length; i++) {     
        sprites.push(icebergs[i]);
    }

     for(i = 0; i < movingPlatforms.length; i++) {     
        sprites.push(movingPlatforms[i]);
    }

     for(i = 0; i < bears.length; i++) {     
        sprites.push(bears[i]);
    }

     for(i = 0; i < oscars.length; i++) {     
        sprites.push(oscars[i]);
    }
}


function setSpriteOffset() {
	let sprite;

	for(let i = 0;i < sprites.length; i++) {
		sprite = sprites[i];
		if(sprite.type !== "platform") {
			sprite.offset = platformOffset;
		}
	}
}

function updateSprites(now) {
	createBombSprites(now);
	
	let sprite;

	for(let i = 0; i < sprites.length; i++) {
		sprite = sprites[i];
		

	if(sprite.visible) {
		if(sprite.type!=="platform") {			
			sprite.update(now);
		}
		
	}
	}
}

function drawSprites() {
	
	let sprite;

	for(let i = 0; i < sprites.length; i++) {
		sprite = sprites[i];		
	if(sprite.visible &&sprite.type!== "platform" && spriteInView(sprite)) {
		
		ctx.translate(-sprite.offset,0);

		sprite.draw(ctx);

		ctx.translate(sprite.offset,0);
	}
	}
}

function spriteInView(sprite) {
	return sprite.left+sprite.width > platformOffset && 
	sprite.left<platformOffset + canvas.width;
}

initializeSprites()


// Смена состояния (ex: взрыв при столеоновении)

class SpriteAnimator {
    constructor (cells,duration,callback) {
        this.cells = cells;
        this.duration  = duration || 1000;
        this.callback  = callback;
    }

    start(sprite) {            
    	let prevType; 
       if(sprite.type === "coin"||sprite.type === "rastberry"||sprite.type === "swipe") {
       		prevType = sprite.type;
       		sprite.type = "coinExp";
       }
        let prevSRC = sprite.artist.spritesheet.src;
        let prevIndex = sprite.artist.cellIndex;
        let prevCells = sprite.artist.cells;
        let prevBehaviors = sprite.behaviors;       

        sprite.exploding = true;
        sprite.behaviors = [new cycleBevior(30,this.duration)];
        sprite.artist.cells = this.cells;
        sprite.artist.spritesheet.src = "images/explode.png";
        sprite.artist.cellIndex = 0;       

        setTimeout(()=>{   
           

            
            let prevSprite = sprites.splice(sprites.indexOf(sprite),1)[0];
            if(prevType) prevSprite.type = prevType;
            prevSprite.behaviors = prevBehaviors;
            prevSprite.artist.cells = prevCells;
            prevSprite.artist.spritesheet.src = prevSRC;
            prevSprite.artist.cellIndex = 0;
            prevSprite.exploding = false;

            garbage.push(prevSprite);
       
                      

        },this.duration);   

    }
  
}

let explosionWidth = 70;
let explosionHeight = 84;
let explosingDuration = 270;

let explosionCells = [{left:30,top:25,width:explosionWidth,height:explosionHeight},
{left:160,top:25,width:explosionWidth,height:explosionHeight},
{left:290,top:25,width:explosionWidth,height:explosionHeight},
{left:30,top:157,width:explosionWidth,height:explosionHeight},
{left:159,top:157,width:explosionWidth,height:explosionHeight},
{left:290,top:157,width:explosionWidth,height:explosionHeight},
{left:30,top:285,width:explosionWidth,height:explosionHeight},
{left:162,top:285,width:explosionWidth,height:explosionHeight},
{left:295,top:285,width:explosionWidth,height:explosionHeight}];

let explosionAnimator = new SpriteAnimator(explosionCells,explosingDuration);
let dyingAnimator = new SpriteAnimator(explosionCells,explosingDuration);

function explode(sprite) {
    explosionAnimator.start(sprite);
}
// Взрыв игрока
let deathSheet = new Image();
deathSheet.onload = function() {
    ctx.drawImage(deathSheet,0,0);
}
deathSheet.src = "images/explode.png";

function createDeath() {
   
    let death = new SpriteSheetArtist(deathSheet,explosionCells);

    player.death= new Sprite('death',death,[new cycleBevior(30,270)]);
    player.death.width = 70;
    player.death.height = 84;

    player.death.top = player.top - 20;
    player.death.left = player.left +platformOffset;     
    sprites.push(player.death);
    player.visible = false;
    player.dying = true;
    playSound(failureSound);
    soundtrack.pause();
    if(bossSoundtrack.currentTime>0)bossSoundtrack.pause();    


    setTimeout(()=>{ 
             sprites.splice(sprites.indexOf(player.death),1);
             setTimeout(()=>{
             	if(health>0)  {
            	 gameMessage.style.visibility = "visible";      
                 gameMessage.style.opacity = 1;
                 }
                 else {
                 	gameOver.style.visibility = "visible";      
                 	gameOver.style.opacity = 1;
                 }                 
             },500)

        },270); 
    
}




module.exports = {
    setSpriteOffset,drawSprites,updateSprites,createBombSprites,explode,createDeath,spriteInView};
