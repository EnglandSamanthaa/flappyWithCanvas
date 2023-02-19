// ----------------------- Variables
var canvasHeight = innerHeight;
var canvasWidth = innerWidth;

const canvasContainer = document.getElementById('canvasContainer');
canvasContainerHeight = canvasHeight;
canvasContainerWidth = canvasWidth;

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

const homeIcon = new Image();
homeIcon.src = 'Images/homeIcon.png';
homeIcon.height = 100;
homeIcon.width = 100;

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



let char = null;
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 25
let currentDisplay = 'home';
let homeScreenAnimation;
let gamePlayAnimation;


// -----------------------------------------------------------   functions  -------------------------------------------------------------



//function to create scrolling background
function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;


    if (currentDisplay === 'game'){   
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
        console.log('game background scrolling');
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
    homeScreenAnimation = requestAnimationFrame(homeScreen);
};


function handleCollisons(){
    for(let i = 0; i < obstaclesArray.length; i++){
         //determining if bird comes into contact with an obstacle
        if((char.x + char.width > obstaclesArray[i].x && char.x < obstaclesArray[i].x + obstaclesArray[i].width && char.y - 10 < obstaclesArray[i].top)
            || (char.x + char.width > obstaclesArray[i].x && char.x < obstaclesArray[i].x + obstaclesArray[i].width && char.y - 20 + char.height > obstaclesArray[i].bottomObstacleYPosition)){
                console.log("character x:", char.x + char.width, "characterTop y:", char.y - 10, "characterBottom y: ", char.y - 20 + char.height, "obstacle x:", obstaclesArray[i].x, "obstacle top:", obstaclesArray[i].top, "obstacle bottom:", obstaclesArray[i].bottom);
                 return true; 
        };
    };
};

//reloads the homescreen and resets game variables
function returnToHomeScreen(){
    gameScreenCanvas.style.display = 'none';
    homeScreenCanvas.style.display = 'block';
    char = null;
    spacePressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    currentDisplay = 'home';

    ctxStart.clearRect(0, 0, homeScreenCanvas.width, homeScreenCanvas.height);
    homeScreen();

};



function gamePlay(){
    ctxGame.clearRect(0, 0, gameScreenCanvas.width, gameScreenCanvas.height);
    
    //function on main.js... deals with the scrolling background. 
    //(((Find a way to shorten that code and easily pass in other backgrounds)))
    handleBackground();
    
    //function is on obstacle.js.... creates the pipes on the top and bottom of the screen
    handleObstactles();

    handleParticles();

    //score count on the bottom right corner
    ctxGame.font = '100px Black Ops One';
    ctxGame.fillStyle = 'white';
    ctxGame.fillText('Score : ' + score, (canvasWidth/4)*2.5, (canvasHeight/4) * 3.5, (canvasWidth/4), (canvasHeight/10));

    //function is on bird.js in character constructor... draws the character onto the gamescreen during game play
    char.draw();
    //function is on bird.js in character constructor... updates the birds position and animates the bird. 
    char.update();

    //function is on main.js.... 
    handleCollisons();
    if(handleCollisons()) {

        //allows for click events on the gameScreenCanvas
        gameScreenCanvas.onclick = function (e){
            console.log('click listener, gameScreen');
            const gameRect = gameScreenCanvas.getBoundingClientRect();
            const gameX= e.clientX - gameRect.left;
            const gameY = e.clientY - gameRect.top;
            console.log("x: " + gameX + " y: " + gameY);
            console.log(e);
            //when the home button is pressed
            if(gameX >= 100 && gameX <= 200 && gameY >= 100 && gameY <= 200){
                homeScreenReturnAllCharacterOptionsToOrigninalSize();
                returnToHomeScreen();
            };
        };

        ctxGame.font = '200px Black Ops One';
        ctxGame.fillStyle = 'white';
        ctxGame.fillText('Game Over!', (canvasWidth/4)*.4, (canvasHeight/2)*1.2, (canvasWidth/2), (canvasHeight/3));

        ctxGame.drawImage(homeIcon, 100, 100, 100, 100);
        cancelAnimationFrame(gamePlayAnimation);

        return;
    };

    //creates the animation loop for the gamescreen
    gamePlayAnimation = requestAnimationFrame(gamePlay);

    frame++;
};

//makes the green bird larger when clicked on homescreen, resets any other bird's size
function homeScreenGreenBirdSelectedResize(){
    greenBirdSelection.ypoint = greenBirdSelection.ypoint - 5;
    greenBirdSelection.height = greenSelectionHeight * 1.5;
    greenBirdSelection.width = greenSelectionWidth * 1.5;
    pinkBirdSelection.height = pinkSelectionHeight;
    pinkBirdSelection.width = pinkSelectionWidth;
    grumpyBirdSelection.height = grumpySelectionHeight;
    grumpyBirdSelection.width = grumpySelectionWidth;   
};

//makes the pink bird larger when clicked on homescreen, resets any other bird's size
function homeScreenPinkBirdSelectedResize(){
    greenBirdSelection.height = greenSelectionHeight;
    greenBirdSelection.width = greenSelectionWidth;
    pinkBirdSelection.ypoint = pinkBirdSelection.ypoint - 5;
    pinkBirdSelection.height = pinkSelectionHeight * 1.5;
    pinkBirdSelection.width = pinkSelectionWidth * 1.5;
    grumpyBirdSelection.height = grumpySelectionHeight;
    grumpyBirdSelection.width = grumpySelectionWidth;
};

//makes the grumpy bird larger when clicked on homescreen, resets any other bird's size
function homeScreenGrumpyBirdSelectedResize(){
    greenBirdSelection.height = greenSelectionHeight;
    greenBirdSelection.width = greenSelectionWidth;
    pinkBirdSelection.height = pinkSelectionHeight;
    pinkBirdSelection.width = pinkSelectionWidth;
    grumpyBirdSelection.height = grumpySelectionHeight * 1.5;
    grumpyBirdSelection.width = grumpySelectionWidth * 1.5;
    grumpyBirdSelection.ypoint = grumpyBirdSelection.ypoint - 5;
};

//resets all homeScreen characters choice to default size
function homeScreenReturnAllCharacterOptionsToOrigninalSize(){
    greenBirdSelection.height = greenSelectionHeight;
    greenBirdSelection.width = greenSelectionWidth;
    pinkBirdSelection.height = pinkSelectionHeight;
    pinkBirdSelection.width = pinkSelectionWidth;
    grumpyBirdSelection.height = grumpySelectionHeight;
    grumpyBirdSelection.width = grumpySelectionWidth;
}



// ------------------------------------------------------    event listeners    -------------------------------------------------------------------

// using spacebar to move bird up.
window.addEventListener('keydown', function (e) {
    if (e.code === "Space" || e.touchstart === touchstart) spacePressed = true;
});

window.addEventListener('keyup', function (e) {
    if (e.code === "Space") spacePressed = false;
    char.frameX = 0;
});


window.onload = (event) => {
    homeScreen();

    //listens for mouse clicks on the homeScreencanvas
    homeScreenCanvas.onclick = function(event) {
        console.log('click listener');
        const rect = homeScreenCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x + " y: " + y);
        console.log(event);

    
        //listens for a click on the green bird and selects green bird for character.
        if (x >= greenBirdSelection.xpoint && x <= greenBirdSelection.xpoint + greenBirdSelection.width && y >= greenBirdSelection.ypoint && y <= greenBirdSelection.ypoint + greenBirdSelection.height) {
            //only happens if the character isn't already green bird.
            if(char != greenBirdCharacter){
                char = greenBirdCharacter;
                console.log(char.name);
                homeScreenGreenBirdSelectedResize()
            };   
        };
    
        //listens for a click on the pink bird and selects pink bird for character
        if (x >= pinkBirdSelection.xpoint && x <= pinkBirdSelection.xpoint + 175 && y >= pinkBirdSelection.ypoint && y <= pinkBirdSelection.ypoint + 125) {
            //only happens if pink bird isn't already selected
            if(char != pinkBirdCharacter){
                char = pinkBirdCharacter;
                console.log(char.name);
                homeScreenPinkBirdSelectedResize();
            };
        };

        //listens for a click on the grumpy bird and selects grumpy bird for character
        if (x >= grumpyBirdSelection.xpoint && x <= grumpyBirdSelection.xpoint + 175 && y >= grumpyBirdSelection.ypoint && y <= grumpyBirdSelection.ypoint + 125) {
            //only happens if grumpy bird is not already selected
            if (char != grumpyBirdCharacter){
                char = grumpyBirdCharacter;
                console.log(char.name)
                homeScreenGrumpyBirdSelectedResize();
            };
        };

        //listens for start button to be pressed
        if (x >= startButtonX + 20 && x <= startButtonX + startButtonWidth && y >= startButtonY + 24 && y <= startButtonY+ startButtonHeight - 22 && char != null) {
            // console.log('start button pressed');

            homeScreenCanvas.style.display ='none';
            gameScreenCanvas.style.display = 'block';
            currentDisplay = 'game'
            obstaclesArray.length = 0;

            //functions the runs the game location on main.js
            gamePlay();

            cancelAnimationFrame(homeScreenAnimation);
            ctxGame.clearRect(0, 0, gameScreenCanvas.width, gameScreenCanvas.height);

            greenBirdCharacter.x = 200;
            greenBirdCharacter.y = 300;
            pinkBirdCharacter.x = 200;
            pinkBirdCharacter.y = 300;
            grumpyBirdCharacter.x = 200
            grumpyBirdCharacter.y = 300;
        };
    };
};
