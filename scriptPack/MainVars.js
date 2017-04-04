let requestAF;
let lastAnimationFrame=0;
let lastFpsUpdateTime=0;
let fps;
let ctx = canvas.getContext("2d");
let backgroundOffset;
let BACKGROUND_VELOCITY = 80, // пикселя/с
    bgVelocity = BACKGROUND_VELOCITY;
let platformOffset;
let RUN_ANIMATION_RATE = 15; 
   
let runnerJumpHeight = 120;
let runnerJumpDuration = 1000;

let paparazziPaceVelocity = 80;

let leftKey = false;
let rightKey = false;

let running =false;
let atacking = false;

let player;

let platformData;
let sprites = [];
let garbage = [];

let playerSheet;
let playerSprite;

let jumpDown;
let jumpUP;
let cellIndex;
