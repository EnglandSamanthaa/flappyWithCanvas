// ----------------------- Variables
const height = 600;
const width = 800;

// const gameCanvas = document.getElementById('gameCanvas');
// const ctx = gameCanvas.getContext('2d');
// gameCanvas.height = height;
// gameCanvas.width = width;

const homeScreenCanvas = document.getElementById('startCanvas');
const ctxStart = homeScreenCanvas.getContext('2d');
homeScreenCanvas.height = height;
homeScreenCanvas.width = width;

const startButton = new Image();
startButton.src = 'Images/startButton.png'
var startButtonHeight = 175;
var startButtonWidth = 400;
var startButtonY = 400;
var startButtonX = 200;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'Images/Layers/BG_Decor.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'Images/Layers/Foreground.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'Images/Layers/Ground.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'Images/Layers/Middle_Decor.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'Images/Layers/Sky.png';


const BG = {
    x1: 0,
    x2: width,
    y: 0,
    width: width,
    height: height
}

var char = '';
var spacePressed = false;
var angle = 0;
var hue = 0;
var frame = 0;
var score = 0;
var gameSpeed = 2;



// -----------------------    event listeners
//listens for mouse clicks on the canvas
homeScreenCanvas.addEventListener('click', (event) => {
    const rect = homeScreenCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    // console.log(event);
    
    //listens for a click on the green bird and selects green bird for character.
    if (x >= greenBird.xpoint && x <= greenBird.xpoint + greenBird.width && y >= greenBird.ypoint && y <= greenBird.ypoint + greenBird.height) {
    
        console.log('character is green bird');
        if(char != greenBird){
            char = greenBird;
            greenBird.ypoint = greenBird.ypoint - 10;
            greenBird.height = 160;
            greenBird.width = 195;
            pinkBird.height = 125;
            pinkBird.width = 175;
            grumpyBird.height = 125;
            grumpyBird.width = 175;
        }
        
    }

    //listens for a click on the pink bird and selects pink bird for character
    if (x >= pinkBird.xpoint && x <= pinkBird.xpoint + 175 && y >= pinkBird.ypoint && y <= pinkBird.ypoint + 125) {
        
        console.log('character is pink bird');      
        console.log(char);
        if(char != pinkBird){
            char = pinkBird;
            greenBird.height = 140;
            greenBird.width = 175;
            pinkBird.ypoint = pinkBird.ypoint - 10;
            pinkBird.height = 145;
            pinkBird.width = 195;
            grumpyBird.height = 125;
            grumpyBird.width = 175;
        }
    }

    //listens for a click on the grumpy bird and selects grumpy bird for character
    if (x >= grumpyBird.xpoint && x <= grumpyBird.xpoint + 175 && y >= grumpyBird.ypoint && y <= grumpyBird.ypoint + 125) {
        console.log('character is grumpy bird');
        console.log(char);

        if (char != grumpyBird){
        char = grumpyBird;
        greenBird.height = 140;
        greenBird.width = 175;
        pinkBird.height = 125;
        pinkBird.width = 175;
        grumpyBird.ypoint = grumpyBird.ypoint - 10;
        grumpyBird.height = 145;
        grumpyBird.width = 195;
        }
    }

    //listens for start button to be pressed
    if (x >= startButtonX + 20 && x <= startButtonX + startButtonWidth && y >= startButtonY + 24 && y <= startButtonY+ startButtonHeight - 22) {
        console.log('start button pressed');
    }

});




// ------------------------   functions


//function to create scrolling background
function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;


    if (homeScreenCanvas.style.display === 'none') {
        //runs the scrolling background during game play.
        ctx.drawImage(backgroundLayer4, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(backgroundLayer4, BG.x2, BG.y, BG.width, BG.height);
        console.log('game background scrolling');
    } else {
        gameSpeed = 1;
        //runs the scrolling background when on the homescreen.
        ctxStart.drawImage(backgroundLayer5, BG.x1, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer5, BG.x2, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer1, BG.x1, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer1, BG.x2, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer2, BG.x1, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer2, BG.x2, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer4, BG.x1, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer4, BG.x2, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer3, BG.x1, BG.y, BG.width, BG.height);
        ctxStart.drawImage(backgroundLayer3, BG.x2, BG.y, BG.width, BG.height);
        // console.log('home background scrolling');
    }
}

//runs the homescreen, draws player selection and startbutton
function homeScreen() {
    ctxStart.clearRect(0, 0, homeScreenCanvas.width, homeScreenCanvas.height);

    handleBackground();

    ctxStart.font = '100px Black Ops One';
    ctxStart.fillStyle = 'rgba(0, 230, 69, 1)';
    ctxStart.fillText('Pick A Character', 225, 125, 350, 75);

    drawPlayerSelection();

    ctxStart.drawImage(startButton, startButtonX, startButtonY, startButtonWidth, startButtonHeight);

    requestAnimationFrame(homeScreen);
};


homeScreen();
