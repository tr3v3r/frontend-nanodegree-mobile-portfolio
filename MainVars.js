let requestAF;
let lastAnimationFrame=0;
let lastFpsUpdateTime=0;
let fps;
let ctx = canvas.getContext("2d");
let backgroundOffset;
let BACKGROUND_VELOCITY = 60, // пикселя/с
    bgVelocity = BACKGROUND_VELOCITY;
let platformOffset;
let RUN_ANIMATION_RATE = 10; 
   
let runnerJumpHeight = 110;
let runnerJumpDuration = 800;

let paparazziPaceVelocity = 80;

let movingRight = true;
let movingLeft = true;

let leftKey = false;
let leftKeyPressed = false;
let rightKey = false;
let rightKeyPressed = false;

let running =false;
let atacking = false;
let swiping = false;
let swipingNow = false;

let player;

let platformData;
let sprites = [];
let garbage = [];

let playerSheet;
let playerSprite;

//Sprites for player
let standing;
let runRight;
let runLeft;
let jumpDown;
let jumpUP;
let cellIndex;

//Bullets and swipes
let ammo = 30;
let powerSwipe = 0;
let health = 3;
let healthNodes  = healthBar.innerHTML;


let bearHp = 10;
let seeBoss = false;


let gameWon = false;
