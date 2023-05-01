

//get refresh rate from previous page
var urlParams = new URLSearchParams(window.location.search);
let speed = parseInt(urlParams.get('myVariable'));
console.log(speed);
let multiplier = 1;
if(speed === 55){
    let multiplier = 2;
}
if(speed === 70){
    let multiplier = 3;
}


const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
const snakeParts = [];
let tailLen = 10

//set #tiles on screen and tile size
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
//head of snake
let headX = 10;
let headY = 10;
//velocity of snake
let xVelo = 0;
let yVelo = 0;

let appleX = 5;
let appleY = 5;

let score = 0;
let ateApple = false;

const gulpSound = new Audio("Sounds/gulp.mp3");
const death = new Audio("Sounds/death.mp3");
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        death.play();
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
    if(ateApple){
        speed += 2;
        ateApple = false;
        console.log(speed);
    }

    const home = document.getElementsByClassName("button home");
    home[0].addEventListener("click", function(){
        window.location.href = "HomeScreen/home.html";
    });
    
}

function isGameOver(){
    let gameOver = false;
    //if the game just started dont end the game
    if(yVelo === 0 && xVelo === 0){
        return false;
    }

    if(headX<0 || headX+0.8>= tileCount || headY < 0 || headY+0.8 >= tileCount){
        gameOver = true;
    }
    for(let i = snakeParts.length-1; i > 0; i--){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = "red";
        ctx.font = "50px Verdana";
        ctx.fillText("GAME OVER!", canvas.width/6.5 - 10, canvas.height/2);

        ctx.fillStyle = "White";
        ctx.font = "25px Verdana";
        ctx.fillText("Final Score: "+ score, canvas.width/4 + 5, canvas.height/1.5);
        
    }

    return gameOver;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}

function drawSnake(){
   
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX,headY)) //put item at the end of the list next to the head
    if(snakeParts.length > tailLen){
        snakeParts.shift();//remove the furthest part if we have more than the snake parts
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY*tileCount, tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelo;
    headY = headY + yVelo;
}

function checkAppleCollision(){
    //check for collision
    if((headX > appleX - 1 && headX < appleX + 1) && (headY > appleY - 1 && headY < appleY + 1)){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLen += 5*multiplier;
        score++;
        gulpSound.play();
        ateApple = true;
    }
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, canvas.width-50, 10);
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    //up
    if(event.keyCode == 38){
        //snake cant move into itself
        if(yVelo == 0.2){
            return;
        }
        yVelo = -0.2;
        xVelo = 0;
    }

    //down
    if(event.keyCode == 40){
        //snake cant move into itself
        if(yVelo == -0.2){
            return;
        }
        yVelo = 0.2;
        xVelo = 0;
    }

    //left
    if(event.keyCode == 37){
        //snake cant move into itself
        if(xVelo == 0.2){
            return;
        }
        yVelo = 0;
        xVelo = -0.2;
    }

    //right
    if(event.keyCode == 39){
        //snake cant move into itself
        if(xVelo == -0.2){
            return;
        }
        yVelo = 0;
        xVelo = 0.2;
    }
}

drawGame();



