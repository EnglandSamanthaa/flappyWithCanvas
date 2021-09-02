const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;

const replay = document.getElementById('replayButton');
replay.height = 200;
replay.weight = 500;

const startButton = document.getElementById('startButton');
startButton.height = 200;
startButton.width = 200;

const playerSection = document.getElementById('char')
playerSection.height = 200;
playerSection.width = 200;

const pickCharDisplay = document.getElementById('pickCharDisplay')


const green = document.getElementById('green');
const pink = document.getElementById('pink');
const grumpy = document.getElementById('grumpy');
const gentleman = document.getElementById('gentleman');
const dragon = document.getElementById('dragon');
// const ufo = document.getElementById('ufo')


//Collision image
const bang = new Image();
bang.src = 'Images/bang.png';


//Image for background
const background = new Image();
background.src = 'Images/desert_BG.png';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

let char = null;
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;


// using spacebar to move bird up.
window.addEventListener('keydown', function (e) {
    if (e.code === "Space" || e.touchstart === touchstart) spacePressed = true;
});

window.addEventListener('keyup', function (e) {
    if (e.code === "Space") spacePressed = false;
    char.frameX = 0;
});

pink.addEventListener("click", function (evnt){
    char = pinkBird;
    pink.style.border = "5px solid pink";
    pink.style.paddingTop = '5px';
    pink.style.paddingLeft = '5px'
    pink.style.paddingRight = '5px';    
    pink.style.zIndex = '1';

    green.style.border = 'none';
    green.style.padding = '0';
    green.style.zIndex = '0';

    grumpy.style.border = 'none';
    grumpy.style.padding = '0';
    grumpy.style.zIndex = '0';
    
    gentleman.style.border = 'none';
    gentleman.style.padding = '0';
    gentleman.style.zIndex = '0';

    dragon.style.border = 'none';
    dragon.style.padding = '0';
    dragon.style.zIndex = '0';
});

green.addEventListener("click", function (evnt){
    char = bird;
    green.style.border = '5px solid green';
    green.style.paddingTop = '25px';
    green.style.paddingLeft = '5px'
    green.style.paddingRight = '5px';
    green.style.zIndex = '1';
   
    pink.style.border = 'none';
    pink.style.padding = '0';
    pink.style.zIndex = '0';

    grumpy.style.border = 'none';
    grumpy.style.padding = '0';
    grumpy.style.zIndex = '0';
    
    gentleman.style.border = 'none';
    gentleman.style.padding = '0';
    gentleman.style.zIndex = '0';

    dragon.style.border = 'none';
    dragon.style.padding = '0';
    dragon.style.zIndex = '0';
});

grumpy.addEventListener("click", function (evnt){
    char = grumpyBird;
    grumpy.style.border = '5px solid brown';
    grumpy.style.paddingTop = '30px';
    grumpy.style.paddingLeft = '3px'
    grumpy.style.paddingRight = '5px';
    grumpy.style.zIndex = '1';

    pink.style.border = 'none';
    pink.style.padding = '0';
    pink.style.zIndex = '0';
    
    green.style.border = 'none';
    green.style.padding = '0';
    green.style.zIndex = '0';
    
    gentleman.style.border = 'none';
    gentleman.style.padding = '0';
    gentleman.style.zIndex = '0';
    
    dragon.style.border = 'none';
    dragon.style.padding = '0';
    dragon.style.zIndex = '0';
});

gentleman.addEventListener("click", function (evnt){
    char = gentlemanBird;
    gentleman.style.border = '5px solid purple';
    gentleman.style.paddingTop = '5px';
    gentleman.style.paddingLeft = '10px'
    gentleman.style.paddingRight = '5px';
    gentleman.style.zIndex = '1';

    pink.style.border = 'none';
    pink.style.padding = '0';
    pink.style.zIndex = '0';
    
    green.style.border = 'none';
    green.style.padding = '0';
    green.style.zIndex = '0';

    grumpy.style.border = 'none';
    grumpy.style.padding = '0';
    grumpy.style.zIndex = '0';

    dragon.style.border = 'none';
    dragon.style.padding = '0';
    dragon.style.zIndex = '0';
});

dragon.addEventListener("click", function (evnt){
    char = dragonChar;
    dragon.style.border = '5px solid orange';
    dragon.style.paddingTop = '30px';
    dragon.style.paddingLeft = '3px'
    dragon.style.paddingRight = '5px';
    dragon.style.zIndex = '1';

    pink.style.border = 'none';
    pink.style.padding = '0';
    pink.style.zIndex = '0';

    green.style.border = 'none';
    green.style.padding = '0';
    green.style.zIndex = '0';

    grumpy.style.border = 'none';
    grumpy.style.padding = '0';
    grumpy.style.zIndex = '0';
    
    gentleman.style.border = 'none';
    gentleman.style.padding = '0';
    gentleman.style.zIndex = '0';
    
});

// ufo.addEventListener("click", function (evnt){
//     char = ufoChar;
// })


//start button event listener
startButton.addEventListener("click", function (evnt) {
    startButton.style.display = 'none';
    playerSection.style.display = 'none';
    pickCharDisplay.style.display = 'none';
    canvas.style.display = 'block';

    // console.log('start');
    animate();
});

//play again button event listner
replay.addEventListener("click", function (evnt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     //removes try again from screen   
    replay.style.display = 'none';
    
    //resets bird position, score 
    score = 0;
    frame = 0;
    hue = 0;
    angle = 0;
    char.x = 150;
    char.y = 200;
    spacePressed = false;

    //clears canvas    
    canvas.style.display = 'none';
    
    //clear obstacles & particles
    obstaclesArray.length = 0;
    particlesArray.length = 0;

    startButton.style.display = 'block';
    playerSection.style.display = 'flex';
    pickCharDisplay.style.display = 'block';

});

//Creates the scrolling background
function handleBackground() {
    if (BG.x1 <= - BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

//function that runs and draws the game. 
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleBackground();
    handleObstactles();
    handleParticles();
    char.update();
    char.draw();

    //draws score to top left corner
    ctx.fillStyle = 'orange';
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 75, 70);
    ctx.fillText(score, 75, 70);

    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate);

    angle+= 0.11;
    hue++;
    frame++;
}



//Function for collision dection
function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (char.x <= obstaclesArray[i].x + obstaclesArray[i].width && char.x + char.width >= obstaclesArray[i].x && ((char.y <= 0 + obstaclesArray[i].top + 5 && char.y + char.height > 0) || (char.y >= canvas.height - (obstaclesArray[i].bottom + 5) && char.y + char.height < canvas.height ))){
            //when collision is dectected

            ctx.drawImage(bang, char.x + 25, char.y - 10, 50, 50);
            ctx.font = '30px Georgia';
            ctx.fillStyle = 'yellow';
            ctx.fillText('Game Over! Your score is ' + score, 165, canvas.height/2 - 15)

            replay.style.display = 'block';

            // console.log(frame);
            return true;
        }
    }
}









