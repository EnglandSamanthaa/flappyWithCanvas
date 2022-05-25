// ----------------------- Variables
const canvasHeight = innerHeight;
const canvasWidth = innerWidth;

//variables for the homescreen canvas
const homeScreenCanvas = document.getElementById('startCanvas');
const ctxStart = homeScreenCanvas.getContext('2d');
homeScreenCanvas.height = canvasHeight;
homeScreenCanvas.width = canvasWidth;

//variables for the gamescreen canvas
const gameScreenCanvas = document.getElementById('gameCanvas');
const ctxGame = gameScreenCanvas.getContext('2d');
gameScreenCanvas.height = canvasHeight;
gameScreenCanvas.width = canvasWidth;

//Image and variables for the start button
const startButton = new Image();
startButton.src = 'Images/startButton.png'
var startButtonHeight = 175;
var startButtonWidth = innerWidth/3;
var startButtonY = (innerHeight/4)*3 ;
var startButtonX = (innerWidth/2) - (startButtonWidth/2);

//Images of the different layers of the forest background
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
    x2: canvasWidth,
    y: 0,
    width: canvasWidth,
    height: canvasHeight
}



var char = '';
var spacePressed = false;
var angle = 0;
var hue = 0;
var frame = 0;
var score = 0;
var gameSpeed = 2;


// ------------------------------------------------------    event listeners    -------------------------------------------------------------------

// using spacebar to move bird up.
window.addEventListener('keydown', function (e) {
    if (e.code === "Space" || e.touchstart === touchstart) spacePressed = true;
});

window.addEventListener('keyup', function (e) {
    if (e.code === "Space") spacePressed = false;
    char.frameX = 0;
});



//listens for mouse clicks on the canvas
homeScreenCanvas.addEventListener('click', (event) => {

    const rect = homeScreenCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);
    //console.log(event);

    
    //listens for a click on the green bird and selects green bird for character.
    if (x >= greenBirdSelection.xpoint && x <= greenBirdSelection.xpoint + greenBirdSelection.width && y >= greenBirdSelection.ypoint && y <= greenBirdSelection.ypoint + greenBirdSelection.height) {
        //only happens if the character isn't already green bird.
        if(char != greenBirdCharacter){

            //Selects green bird as the in game character
            char = greenBirdCharacter;
            console.log(char.name);

            //makes the green bird larger, while returning other bird if previous selected to their orginal display size.
            greenBirdSelection.ypoint = greenBirdSelection.ypoint - 5;
            greenBirdSelection.height = greenSelectionHeight * 1.5;
            greenBirdSelection.width = greenSelectionWidth * 1.5;
            pinkBirdSelection.height = pinkSelectionHeight;
            pinkBirdSelection.width = pinkSelectionWidth;
            grumpyBirdSelection.height = grumpySelectionHeight;
            grumpyBirdSelection.width = grumpySelectionWidth;   
        };   
    };

    
    //listens for a click on the pink bird and selects pink bird for character
    if (x >= pinkBirdSelection.xpoint && x <= pinkBirdSelection.xpoint + 175 && y >= pinkBirdSelection.ypoint && y <= pinkBirdSelection.ypoint + 125) {
        //only happens if pink bird isn't already selected
        if(char != pinkBirdCharacter){

            //Selects pink bird as the in game character
            char = pinkBirdCharacter;
            console.log(char.name);

            //makes the pink bird larger, while returning other bird if previous selected to their orginal display size. 
            greenBirdSelection.height = greenSelectionHeight;
            greenBirdSelection.width = greenSelectionWidth;
            pinkBirdSelection.ypoint = pinkBirdSelection.ypoint - 5;
            pinkBirdSelection.height = pinkSelectionHeight * 1.5;
            pinkBirdSelection.width = pinkSelectionWidth * 1.5;
            grumpyBirdSelection.height = grumpySelectionHeight;
            grumpyBirdSelection.width = grumpySelectionWidth;
        };
    };

    
    //listens for a click on the grumpy bird and selects grumpy bird for character
    if (x >= grumpyBirdSelection.xpoint && x <= grumpyBirdSelection.xpoint + 175 && y >= grumpyBirdSelection.ypoint && y <= grumpyBirdSelection.ypoint + 125) {
        //only happens if grumpy bird is not already selected
        if (char != grumpyBirdCharacter){

            //Changes the in game character to grumpy bird
            char = grumpyBirdCharacter;
            console.log(char.name)

            //makes the grumpy bird larger, while returning other bird if previous selected to their orginal display size.
            greenBirdSelection.height = greenSelectionHeight;
            greenBirdSelection.width = greenSelectionWidth;
            pinkBirdSelection.height = pinkSelectionHeight;
            pinkBirdSelection.width = pinkSelectionWidth;
            grumpyBirdSelection.ypoint = grumpyBirdSelection.ypoint - 5;
            grumpyBirdSelection.height = grumpySelectionHeight* 1.5;
            grumpyBirdSelection.width = grumpySelectionWidth*1.5;
        };
    };


    //listens for start button to be pressed
    if (x >= startButtonX + 20 && x <= startButtonX + startButtonWidth && y >= startButtonY + 24 && y <= startButtonY+ startButtonHeight - 22) {
        // console.log('start button pressed');

        //allows game screen to sit on top of home screen
        homeScreenCanvas.style.zIndex = '-1';
        gameScreenCanvas.style.zIndex = '0';

        gamePlay();
    };


});




// -----------------------------------------------------------   functions  -------------------------------------------------------------



//function to create scrolling background
function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;


    if (homeScreenCanvas.style.zIndex === '-1'){
        
        //runs the scrolling background during game play.
        ctxGame.drawImage(backgroundLayer5, BG.x1, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer5, BG.x2, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer1, BG.x1, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer1, BG.x2, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer2, BG.x1, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer2, BG.x2, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer4, BG.x1, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer4, BG.x2, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer3, BG.x1, BG.y, BG.width, BG.height);
        ctxGame.drawImage(backgroundLayer3, BG.x2, BG.y, BG.width, BG.height);
        // console.log('game background scrolling');
    } else {
        //will change how fast the background moves
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
        //console.log('home background scrolling');
    };
};

//runs the homescreen, draws player selection and startbutton
function homeScreen() {

    ctxStart.clearRect(0, 0, homeScreenCanvas.width, homeScreenCanvas.height);

    //function on main.js... deals with the scrolling background. 
    //(((Find a way to shorten that code and easily pass in other backgrounds)))
    handleBackground();

    //writes pick a character on the home screen
    ctxStart.font = '100px Black Ops One';
    ctxStart.fillStyle = 'rgba(0, 230, 69, 1)';
    ctxStart.fillText('Pick A Character', 225, 125, 350, 75);

    //function on bird.js..... draws the player selection
    drawPlayerSelection();

    //draws the start button on to the homescreen
    ctxStart.drawImage(startButton, startButtonX, startButtonY, startButtonWidth, startButtonHeight);

    //creates the animation loop for the homescreen
    requestAnimationFrame(homeScreen);
};

//function is on main.js
homeScreen();


function gamePlay(){
    ctxGame.clearRect(0, 0, gameScreenCanvas.width, gameScreenCanvas.height);
    
    //function on main.js... deals with the scrolling background. 
    //(((Find a way to shorten that code and easily pass in other backgrounds)))
    handleBackground();

    //function is on obstacle.js.... creates the pipes on the top and bottom of the screen
    handleObstactles();

    //function is on bird.js in character constructor... draws the character onto the gamescreen during game play
    char.draw();

    //function is on bird.js in character constructor... updates the birds position and animates the bird. 
    char.update();

    //creates the animation loop for the gamescreen
    requestAnimationFrame(gamePlay);

    frame++;
};