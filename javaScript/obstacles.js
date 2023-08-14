//bottom pipe image
const pipeBottom = new Image();
pipeBottom.src = 'Images/pipe.png';

//top pipe image
const pipeTop = new Image();
pipeTop.src = 'Images/pipetop.png';

const obstaclesArray = [];

//obstacles constructor
class Obstacle {
    
    constructor(){
        //top pipe height
        this.top = (Math.random() * gameScreenCanvas.height/3) + 30;
        //bottom pipe height
        this.bottom = (Math.random() * gameScreenCanvas.height/3) + 30;
        this.x = gameScreenCanvas.width;
        this.width = 200;
        this.counted = false;

       this.obstacleXPosition = this.x;
       this.topObstacleYPosition = this.top;
       this.bottomObstacleYPosition = gameScreenCanvas.height - this.bottom;

    };


    draw(){
        ctxGame.drawImage(pipeTop, this.x, 0, this.width, this.top);
        ctxGame.drawImage(pipeBottom, this.x, gameScreenCanvas.height - this.bottom, this.width, this.bottom);
    };

    update(){
        this.x -= gameSpeed + 5;
        if(!this.counted && this.x < char.x){
            score++;
            this.counted = true;
        };
        this.draw();
    };
};


function handleObstactles(){
    //creates a new obstacle once the frame hits 175,,, will determine spacing between obstacles
    if (frame % 175 === 0) obstaclesArray.unshift(new Obstacle);
    //
    for (let i = 0; i < obstaclesArray.length; i++) obstaclesArray[i].update();
    //removes already passed obstacles from the obstacle array
    if (obstaclesArray.length > 4) obstaclesArray.pop(obstaclesArray[0]);
};