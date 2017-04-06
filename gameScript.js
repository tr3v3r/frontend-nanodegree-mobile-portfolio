/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	


	function isPlatformUnderneath() {
	let platform;
	for(let i = 0; i < sprites.length; i++) {

		if(sprites[i].type === "platform") {
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
}

	

module.exports = {isPlatformUnderneath,getPlatformtop};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let {cycleBevior} = __webpack_require__(9);
let {paceBehavior} = __webpack_require__(10);
let {bombMoveBehavior} = __webpack_require__(6);
let {bounceBehaviour} = __webpack_require__(7);
let {collideBehavior} = __webpack_require__(8);
let {reporterBulletMoveBehavior} = __webpack_require__(11);
let {reporterShootBehavior} = __webpack_require__(12);


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
let paparData = [{platformIndex:1},{platformIndex:2}];


//// Фотографы сидячие
let pappSheet2 = new Image();
pappSheet2.onload = function() {
	ctx.drawImage(pappSheet2,0,0);
}
pappSheet2.src = "images/pappa2.png";

let allPaparazzi2 = [];
let paparData2 = [{platformIndex:3},{platformIndex:4}];
//// Тетка репортер

let retorterSheet = new Image();
retorterSheet.onload = function() {
	ctx.drawImage(pappSheet2,0,0);
}
retorterSheet.src = "images/reporter.png";


let retorters = [];
let reporterData = [{platformIndex:1},{platformIndex:2}];


/// Монеты 

let coinSheet = new Image();
coinSheet.onload = function() {
    ctx.drawImage(coinSheet,0,0);
}
coinSheet.src = "images/coins.png";

let coins = [];
let coinsData = [{top:300,left:10},
                {top:300,left:40},
                {top:300,left:60},
                {top:300,left:80},
                {top:300,left:120},]




let pappCellsWidth = 55;
let pappCellsHeight  =55;

let reporterCellsWidth = 45;
let reporterCellsHeight  =50;

let coinCellsWidth = 25;
let coinCellsHeight  =25;

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

	for(let i = 0; i < paparData2.length;i++) {

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







let lastTimeFired = 0;
function createBombSprites(now) {
	if(atacking&&now-lastTimeFired > 200) {
		lastTimeFired = now;
	let bomb;
	let bombArtist = new SpriteSheetArtist(bombSheet,bobmCells);
	bomb = new Sprite('bomb',bombArtist,[bombMoveBehavior,new collideBehavior(explode)]);
	bomb.width = 30;
	bomb.height = 32;

	bomb.top = player.top + 10;
	bomb.left = player.left +platformOffset+ 20;
	bomb.visible = true;	
	bomb.used = false;
	sprites.push(bomb);
	}
}



function initializeSprites() {
	positionSprites(allPaparazzi,paparData);
	positionSprites(allPaparazzi2,paparData2);
	positionSprites(retorters,reporterData);
    armReporters();
    positionSprites(coins,coinsData);
}

function positionSprites(sprites,spriteData) {
	let sprite;

	for(let i = 0; i< sprites.length; i++) {
		sprite = sprites[i];		
	if(spriteData[i].platformIndex!==undefined) {
		putSpriteOnPlatform(sprite,platformData[spriteData[i].platformIndex]);
		
	}

	else {
		sprite.top = spriteData[i].top;
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



    setTimeout(()=>{ 
             sprites.splice(sprites.indexOf(player.death),1);
             setTimeout(()=>{        
                gameMessage.style.opacity = 1;
                 
             },500)

        },270); 
    
}




module.exports = {
    setSpriteOffset,drawSprites,updateSprites,createBombSprites,explode,createDeath,spriteInView};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const gravityForse = 9.81;
const pixelsPerMeter = canvas.width/10;

let {getPlatformtop,isPlatformUnderneath}= __webpack_require__(0);


class Stopwatch {
	constructor() {
		this.startTime = 0;
		this.running = false;
		this.elapsed = null;
	}

	start() {
		this.startTime = +new Date();
		this.running = true;		
	}

	stop() {
		this.elapsed =(+new Date()) - this.startTime;
		this.running = false;
	}

	getElapsedTime() {
		if(this.running) {
			return (+new Date()) - this.startTime;
		}

		else {
			return this.elapsed;
		}
	}

	isRunning() {
		return this.running;
	}

	reset() {
		this.startTime = 0;
		this.running = false;
		this.elapsed = 0;
	}
} 

class AnimationTimer {
	constructor(duration=1000,transducer) {
		this.transducer = transducer;
		this.stopwatch = new Stopwatch();
		this.duration = duration;		
	}

	start() {this.stopwatch.start()};
	stop() {this.stopwatch.stop()};
	isRunning() {return this.stopwatch.running};
	reset() {this.stopwatch.reset()};

	isExpired() {
		return this.stopwatch.getElapsedTime()>this.duration;
	}

	getElapsedTime() {
		let elapsedTime = this.stopwatch.getElapsedTime();
		let percentComplete = elapsedTime / this.duration;

		if(percentComplete >= 1) {
			percentComplete = 1.0;
		}
		
		if(this.transducer!== undefined && percentComplete >0) {
			elapsedTime = elapsedTime * (this.transducer(percentComplete)/percentComplete);			
		}

		return elapsedTime;
	}
}


AnimationTimer.makeEaseOutTransducer = function (strength) {
   return function (percentComplete) {
      strength = strength ? strength : 1.0;
      return 1 - Math.pow(1 - percentComplete, strength*2);
   };
};

AnimationTimer.makeEaseInTransducer = function (strength) {
   strength = strength ? strength : 1.0;
   return function (percentComplete) {
      return Math.pow(percentComplete, strength*2);
   };
};

AnimationTimer.makeEaseInOutTransducer = function () {
   return function (percentComplete) {
      return percentComplete - Math.sin(percentComplete*2*Math.PI) / (2*Math.PI);
   };
};


AnimationTimer.makeElasticTransducer = function (passes) {
   passes = passes || 3;

   return function (percentComplete) {
       return ((1-Math.cos(percentComplete * Math.PI * passes)) *
               (1 - percentComplete)) + percentComplete;
   };
};

AnimationTimer.makeBounceTransducer = function (bounces) {
   var fn = AnimationTimer.makeElasticTransducer(bounces);

   bounces = bounces || 2;

   return function (percentComplete) {
      percentComplete = fn(percentComplete);
      return percentComplete <= 1 ? percentComplete : 2-percentComplete;
   }; 
};
 


	player = {
    dying:false,
    visible:true,	
	left:100,
	level:1,
	top:400,
	jumpHeight:runnerJumpHeight,
	jumpDuration:runnerJumpDuration,
	jumping:false,
	ascendStopwatch:new AnimationTimer(runnerJumpDuration/2,AnimationTimer.makeEaseOutTransducer(1.15)),
	descendSptopwatch:new AnimationTimer(runnerJumpDuration/2,AnimationTimer.makeEaseInTransducer(1.15)),
	falltimer:new AnimationTimer(),	
	falling:false,
	jump(){		
		if(this.jumping) return;

		this.jumping = true;
		this.runAnimationRate=0;
		this.verticalLaunchPosition = this.top;
		this.ascendStopwatch.start();
		
	},

	stopJumping() {
		this.ascendStopwatch.stop();
		this.descendSptopwatch.stop();
		this.jumping = false;

	},

	fall(initialVelocity) {
		this.velocityY = initialVelocity || 0;
		this.initialVelocityY = initialVelocity || 0;
		this.falling = true;


		this.falltimer.start();
	},

	stopFalling() {
		this.falltimer.stop();
		this.velocityY = 0;
		this.falling = false;
	}
}


function jumpExecute() {

	if(!player.jumping) return;
	
	if(isJumpOver()) {
		player.jumping = false;
		return;
	}



	if(isAscending()) {
		if(!isDoneAscending()){
			playerSprite = jumpUP;
			cellIndex=0;			
			ascend();
		} 
		else finishAscend();
	}

	else if(isDescending()) {
		if(!isDoneDescending()) {	
			playerSprite = jumpDown;
			cellIndex=0;		
			descend();
		} 
		else finishDescend();
	}
}

function isJumpOver() {

	return !player.ascendStopwatch.isRunning()&&
			!player.descendSptopwatch.isRunning();
}

function isAscending() {
	return player.ascendStopwatch.isRunning();
}

function ascend() {	
	let elapsed = player.ascendStopwatch.getElapsedTime();
	let deltaY = elapsed/(player.jumpDuration/2)*player.jumpHeight;
	
	player.top = player.verticalLaunchPosition - deltaY;
}

function isDoneAscending() {
	return player.ascendStopwatch.getElapsedTime() > player.jumpDuration/2;
}

function finishAscend() {
	player.jumpApex = player.top;
	player.ascendStopwatch.stop();
	player.descendSptopwatch.start();
}

function isDescending() {
	return player.descendSptopwatch.isRunning();
}

function descend() {
	let elapsed = player.descendSptopwatch.getElapsedTime();
	let deltaY = elapsed/(player.jumpDuration/2)*player.jumpHeight;

	player.top = player.jumpApex + deltaY;
}

function isDoneDescending() {
	return player.descendSptopwatch.getElapsedTime()>player.jumpDuration/2;
}

function finishDescend() {
	player.stopJumping();

	if(isPlatformUnderneath()) {
	player.top = player.verticalLaunchPosition;
	}

	else {
		player.fall(gravityForse*(player.descendSptopwatch.getElapsedTime()/1000)*
		pixelsPerMeter);
	}
	
}


//Падение 

function setPlayerVelocity() {
	player.velocityY = player.initialVelocityY  + 
						gravityForse*(player.falltimer.getElapsedTime()/1000)*
						pixelsPerMeter;
}

function calculateVerticalDrop() {
	return player.velocityY / fps;
}

function executeFalling() {
	let deltaY;

	if(player.jumping) {
		return;
	}

	if(isOutOfPlay()) {
		if(player.falling) {
		player.stopFalling();
        createDeath();
      
	}
	return;
	}

	if(!player.falling) {
		if(!isPlatformUnderneath()) {
			player.fall();
		}
		return;
	}

	setPlayerVelocity();
	deltaY = calculateVerticalDrop();

	if(!willFallBellowCurrentTrack(deltaY)) {
		player.top +=deltaY;
	}

	else {
		if(isPlatformUnderneath()) {
			fallOnPlatform();
			player.stopFalling();
		}

		else {
			player.top +=deltaY;
			player.level--;
		}
	}
}

function isOutOfPlay() {
	return player.top > canvas.height;
}

function willFallBellowCurrentTrack(deltaY) {
	return player.top + 48 + deltaY > getPlatformtop(player.level);
}

function fallOnPlatform() {
	player.top = getPlatformtop(player.level) - 48;
	player.stopFalling();
}


module.exports = {
	player,jumpExecute,executeFalling,AnimationTimer
}

let {createDeath} = __webpack_require__(1);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let {player} = __webpack_require__(2);
var {getPlatformtop}= __webpack_require__(0);
var {explode,createDeath}= __webpack_require__(1);

function executeCollision() {

	let otherSprites;

	for(let i = 0;i < sprites.length; i++) {
		otherSprites = sprites[i];
		if(otherSprites.type!=="bomb") {
		if(isCandidateForCollision(otherSprites)) {
			if(didCollide(otherSprites)) {
				processCollision(otherSprites);
			}
		}
		}
	}
}

function isCandidateForCollision(otherSprites) {
	return otherSprites.left - otherSprites.offset < player.left + 50;
}

function didCollide(otherSprites) {

	let left = player.left+10,
	right = player.left + 54,
	top = player.top,
	bottom = player.top + 48,
	centerX = left + 27,
	centerY = top + 24;	
	
	return didRunnerCollideWithOtherSprite(left,top,right,bottom,centerX,centerY,otherSprites);			

}

function didRunnerCollideWithOtherSprite(left,top,right,bottom,centerX,centerY,otherSprites) {
	
	
		ctx.beginPath();
	    ctx.rect(otherSprites.left - otherSprites.offset,otherSprites.top,
		otherSprites.width,otherSprites.height);

	if(otherSprites.type ==="platform") {                   
		return ctx.isPointInPath(left,bottom) ||
			ctx.isPointInPath(right,bottom);
	}

	else {
       
        return ctx.isPointInPath(left,top) ||
			ctx.isPointInPath(right,top) ||
			ctx.isPointInPath(centerX,centerY) ||
			ctx.isPointInPath(left,bottom) ||
			ctx.isPointInPath(right,bottom)}
		
}



function processCollision(otherSprites) {
	if(otherSprites.type === "papparazzi"||
		otherSprites.type === "reporter"||
        otherSprites.type ==="reporterBullet") {

        if(swiping&&!otherSprites.exploding) {
            explode(otherSprites);
        }
      else if(!player.dying&&player.visible&&otherSprites.visible&&!swiping) {        
            createDeath();
       }		
	}


    if(otherSprites.type === "coin"&&!otherSprites.exploding) {        
        explode(otherSprites);
    }

	if(player.jumping && otherSprites.type === "platform") {
		processPlatformCollisionDuringJump(otherSprites);
	}
}

function processPlatformCollisionDuringJump(platform) {
	let isDescending = player.descendSptopwatch.isRunning();

	
	if(isDescending) {
		player.stopJumping();
		player.level = platform.level;
		player.top = getPlatformtop(player.level) - 48; 
	}

	
}

module.exports = {
	executeCollision
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let {getPlatformtop}= __webpack_require__(0);


function reset(left) {   
      
          
 
       sprites = sprites.concat(garbage);
       garbage = [];  

       backgroundOffset = 0;
       platformOffset = 0;
        
        setTimeout(()=>{
        playerReset(left)},30); 
    
}

function playerReset(left) {
  
    player.bomb ={};
    player.left = left;
    player.level = 3;
    player.top = getPlatformtop(player.level);

    player.dying = false;
    player.visible = true;
    

    if(player.falling) player.stopFalling();
    if(player.jumping) player.stopJumping();

}
module.exports = {reset};

gameMessage.onclick = function() {
    let target = event.target;
        if(target.id === "restart") {
            reset(100);
            gameMessage.style.opacity = 0;
        }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {




let {getPlatformtop}= __webpack_require__(0);



let movingRight = true;
let movingLeft = true;



//Отрисовка и движение background

let background = new Image();
background.onload = function() {
	ctx.drawImage(background,0,200);
}
background.src = "images/city_background.png";



function drawBackground() {	
	ctx.translate(-backgroundOffset,0);
	ctx.drawImage(background,0,200);
	ctx.drawImage(background,1200,200);
	ctx.translate(backgroundOffset,0);
}

function setBackgroundOffset() {
	if(running&&(!movingLeft||!movingRight)&&player.visible) {
   var offset = backgroundOffset + bgVelocity/fps; // Движение на основе времени

   if (offset > 0 && offset < 1200) {
      backgroundOffset = offset;
   }
   else {
      backgroundOffset = 0;
   }
}

}


// Отрисовка движения платформ



class Platform {
	constructor(w,h,x,level) {
		this.type = "platform";
		this.width = w;
		this.height = h;
		this.level = level;
		this.top = getPlatformtop(level);
		this.left = x;
		this.offset = 0;		
	}
}



platformData = [new Platform(500,100,0,1),
					new Platform(500,100,650,1),
					new Platform(100,15,300,2),
					new Platform(100,15,500,3),
					new Platform(100,15,800,2)
					];





for(let i = 0;i<platformData.length;i++) {
	sprites.push(platformData[i]);
}

let platformVelocity;
let platformVelocityMultiply = 4.35;
platformOffset = 0;

function drawPlatform() {
	let data;
	ctx.save();

	ctx.translate(-platformOffset,0);

	for(let i = 0;i < platformData.length;i++) {
		data = platformData[i];
		data.offset = platformOffset;
        ctx.fillStyle = "deepskyblue";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
		ctx.fillRect(data.left,data.top,data.width,data.height);
        ctx.strokeRect(data.left,data.top,data.width,data.height);
	}

	ctx.restore();
}

function setPlatformVelocity() {
	platformVelocity = bgVelocity*platformVelocityMultiply;
}

function setPlatformOffset() {
	if(running&&(!movingLeft||!movingRight)&&player.visible) {
	
	platformOffset += platformVelocity/fps;
    if(platformOffset<0)platformOffset=1;
	}
}


// Отрисовка движения персонажа

 playerSheet = new Image();
playerSheet.onload = function() {
	ctx.drawImage(playerSheet,15,15,45,40,0,0,45,40);
}
playerSheet.src = "images/leo.png";


let runRight = [{left:15,top:15,width:45,height:40,w:54,h:48},
					{left:77,top:12,width:45,height:40,w:54,h:48},
					{left:143,top:12,width:45,height:40,w:54,h:48},
					{left:208,top:15,width:45,height:40,w:54,h:48},
					{left:276,top:12,width:45,height:40,w:54,h:48},
					{left:342,top:12,width:45,height:40,w:54,h:48}
					];

let runLeft = [{left:401,top:15,width:45,height:40,w:54,h:48},
					{left:335,top:12,width:53,height:40,w:63.6,h:48},
					{left:267,top:12,width:53,height:40,w:63.6,h:48},
					{left:201,top:12,width:53,height:40,w:63.6,h:48},
					{left:136,top:12,width:53,height:40,w:63.6,h:48},
					{left:69,top:12,width:53,height:40,w:63.6,h:48}
					];					

jumpUP = [{left:208,top:81,width:51,height:40,w:61.2,h:48}];					

jumpDown =[{left:402,top:12,width:51,height:40,w:61.2,h:48}];

let standing =[{left:201,top:148,width:51,height:40,w:61.2,h:52}];
					

playerSprite =runRight;


cellIndex=0;

let  lastAdvanceTime = 0;


function offsetSheet(now) {
	if(!player.jumping&&!running){
		playerSprite = standing;
		cellIndex =0;
	} 

	if(!player.jumping&&running) {
		
		if(leftKey) playerSprite = runLeft;
		if(rightKey) playerSprite = runRight;


	if(RUN_ANIMATION_RATE === 0) {
		return;
	}
	if(lastAdvanceTime ===0) {
		lastAdvanceTime = now;
	}
	else if(now-lastAdvanceTime>1000/RUN_ANIMATION_RATE) {
       
		advance();
		lastAdvanceTime = now;
	}
}
}

function advance() {
	if(cellIndex === playerSprite.length-1) {		
		cellIndex =0;
	}
	else {

		cellIndex++;
		
	}
}

function drawPlayer() {	
    if(player.visible) {
	var cell = playerSprite[cellIndex];	 
	ctx.drawImage(playerSheet,cell.left,cell.top,
				cell.width,cell.height,player.left,player.top,cell.w,cell.h);
}

}



function runPlayer(points) {
	isNearTheEdgeOfTheScreen()
	if(running&&player.visible) {		
		if(leftKey) {
			if(!player.jumping) playerSprite=runLeft;
			if(movingLeft) player.left-=points;
			bgVelocity = -BACKGROUND_VELOCITY;
			playerSheet.src = "images/leo-left.png";	
		};
		if(rightKey) {
			if(!player.jumping) playerSprite=runRight;
			if(movingRight) player.left+=points;
			bgVelocity = BACKGROUND_VELOCITY;
			playerSheet.src = "images/leo.png";	
		} 
	
}
}


function swipePlayer () {
   if(swiping) {

    running = true;
    if(bgVelocity>0) rightKey = true;
    else  leftKey = true;

    BACKGROUND_VELOCITY = 220;

    runPlayer(10);

    
    setTimeout( ()=>{
        swiping = false;
        BACKGROUND_VELOCITY = 80;

        if(leftKey) bgVelocity = -BACKGROUND_VELOCITY;
        if(rightKey) bgVelocity = BACKGROUND_VELOCITY;

        if(!leftKeyPressed) leftKey = false;
        if(!rightKeyPressed) rightKey = false;

    },300)
    }
   
}

function isNearTheEdgeOfTheScreen()
 {
   
 	if(platformOffset===0&&player.left < 100||player.left<0) movingLeft = false;
 	else movingLeft = true;

 	if(player.left > 500) movingRight = false;		
 	else movingRight = true;
 	
 	
 }


module.exports = {drawBackground,setBackgroundOffset,
	platformOffset,setPlatformVelocity,setPlatformOffset,
drawPlatform,offsetSheet,drawPlayer,runPlayer,swipePlayer};







/***/ }),
/* 6 */
/***/ (function(module, exports) {

function spriteInView(sprite) {
	return sprite.left+sprite.width > platformOffset && 
	sprite.left<platformOffset + canvas.width;
}

let bombMoveBehavior = {
	execute(sprite,now) {
		let opacity  = bgVelocity*5 /fps;
		console.log(bgVelocity)
		if(sprite.visible) {
			if(!sprite.op) {
				sprite.op = opacity;				
			}

			sprite.left += sprite.op;
			
		}

		if(!spriteInView(sprite)&&sprite.type ==="bomb"||player.dying||sprite.used) {
			sprite.left = player.left;
			sprites.splice(sprites.indexOf(sprite),1);
			

		}
	}
}

module.exports = {
	bombMoveBehavior
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

let {AnimationTimer} = __webpack_require__(2);

class bounceBehaviour{
constructor(duration,height) {
	this.duration = duration || 1000;
	this.distance = height*2 || 100;
	this.bouncing = false;
	this.timer  = new AnimationTimer(this.duration,AnimationTimer.makeBounceTransducer(1));
	this.paused = false;
}
	startBouncing(sprite,now) {
		this.baseline = sprite.top;
		this.bouncing = true;
		this.timer.start(now);
	}

	resetTimer(now) {
		this.timer.stop(now);
		this.timer.reset(now);
		this.timer.start(now);
	}

	adjustVerticalPosition(sprite,elapsed,now) {
		let rising = false;
		let deltaY = this.timer.getElapsedTime(now) / this.duration*
					this.distance;

		if(elapsed < this.duration/2) rising = true;
		
		if(rising) {
			sprite.top = this.baseline - deltaY;
		}	
		else {
			sprite.top = this.baseline - this.distance+deltaY;
		}		
	}

	execute(sprite,now) {
		let elapsed;
		let deltaY;

		if(!this.bouncing) {
			this.startBouncing(sprite,now);
		}

		else {
			elapsed  =this.timer.getElapsedTime(now);

			if(this.timer.isExpired(now)) {
				this.resetTimer(now);
				return;
			}

			 this.adjustVerticalPosition(sprite, elapsed, now);
		}
	}
}
module.exports = {
	bounceBehaviour
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class collideBehavior {
    constructor(callback) {
        this.callback = callback;
    }
    execute(sprite) {
        let otherSprites;

    for(let i = 0;i < sprites.length; i++) {


        otherSprites = sprites[i];

        if(otherSprites.type!=="bomb"&&otherSprites.type!=="platform"&&otherSprites.type!=="reporterBullet") {
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

    if((otherSprites.type === "reporter"||otherSprites.type === "papparazzi")&&!otherSprites.exploding) { 
        sprite.used = true;                           
        callback(otherSprites);         
    }    
}

module.exports = {collideBehavior};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class cycleBevior  {
	constructor(duration,interval) {
		this.duration = duration || 0;
		this.inerval = interval || 0;
		this.lastAdvance = 0;
	}

	execute(sprite,now) {
		if(this.lastAdvance === 0) {
			this.lastAdvance = now;
		}

		if(this.interval && sprite.artist.cellIndex ===0) {
			if(now - this.lastAdvance < this.interval) {
				sprite.artist.advance();
				lastAdvance = now;
			}
		}

		else if(now - this.lastAdvance > this.duration) {
			sprite.artist.advance();
			this.lastAdvance = now;
		}
	}
}

module.exports = {
	cycleBevior
	
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

let paceBehavior = {
	checkDirection(sprite) {

		let sRight = sprite.left +sprite.width;
		let pRight = sprite.platform.left + sprite.platform.width;

		if(sRight > pRight && sprite.direction === "right") {
			sprite.direction = "left";
		}

		else if(sprite.left < sprite.platform.left &&
		 sprite.direction === "left") {			
			sprite.direction = "right";
		}
	},

	moveSprite(sprite) {
		let pixelsToMove = sprite.velocityX / fps;		
		if(sprite.direction === "right") {			
			sprite.left += pixelsToMove;			
		}

		else {
			sprite.left -= pixelsToMove;
		}
	},

	execute(sprite) {
		this.checkDirection(sprite);
		this.moveSprite(sprite);
	}

}

module.exports = {
	paceBehavior
	
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

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

        if(!spriteInView(sprite)||player.dying) {

            sprite.tangens = Math.abs(player.top - sprite.sniper.top)/(sprite.sniper.left-platformOffset-player.left);  
            
            sprite.visible = false;
        }

        
    }
}


module.exports = {
    reporterBulletMoveBehavior
}







/***/ }),
/* 12 */
/***/ (function(module, exports) {

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


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {



function checkKeys() {
	if(!leftKey&&!rightKey || leftKey&&rightKey) running = false;
	else running = true;
}

function animate(now) {
	fps =calculateFps(now);
	draw(now);	
	requestAF = requestAnimationFrame(animate);
}

function calculateFps(now) {
	var fps = 1000/(now-lastAnimationFrame);
	lastAnimationFrame = now;
	if(now-lastFpsUpdateTime>1000) {		
		lastFpsUpdateTime = now;
		fpsElement.innerHTML=`${fps} fps`;
	}
	return fps;
}

requestAF = requestAnimationFrame(animate);



function draw(now) {
ctx.clearRect(0,0,900,500);


// отрисовка и движение БГ
setBackgroundOffset();
drawBackground();

// отрисовка и движение платформ
setPlatformVelocity();
setPlatformOffset();
drawPlatform()


// отрисовка и движение персонажей
offsetSheet(now);
drawPlayer();

checkKeys();
runPlayer(5);
swipePlayer();

jumpExecute();

executeCollision();

executeFalling();


setSpriteOffset();
drawSprites();
updateSprites(now);

}


let {setBackgroundOffset,drawBackground,setPlatformVelocity,
setPlatformOffset,drawPlatform,offsetSheet,drawPlayer,
runPlayer,swipePlayer} = __webpack_require__(5);
	
let {jumpExecute,executeFalling,player} = __webpack_require__(2);

let {executeCollision} = __webpack_require__(3);

let {setSpriteOffset,drawSprites,updateSprites,createBombSprites} = __webpack_require__(1);
let {reset} = __webpack_require__(4);













document.onkeydown = function() {

	if(event.keyCode === 70) {
		atacking = true;

	}

    if(event.keyCode === 71) {
        swiping = true;

    }

    if(event.keyCode === 82) {
       reset(100);

    }

	if(event.keyCode===32) {
	if(!player.falling) {
	player.jump();	
	}
}

	if(event.keyCode ===39) {
		rightKey = true;
        rightKeyPressed = true;		
	}

	if(event.keyCode ===37) {		
		leftKey = true;		
        leftKeyPressed = true;	
	}
}


document.onkeyup = function() {

	if(event.keyCode ===70) {
		atacking = false;			
	}

	if(event.keyCode ===39) {
		rightKey = false;			
		 rightKeyPressed = false;	
	}

	if(event.keyCode ===37) {			
		leftKey = false;	
	   leftKeyPressed = false;
		
	}
}
















/***/ })
/******/ ]);