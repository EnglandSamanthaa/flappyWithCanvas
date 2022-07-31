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
        this.top = (Math.random() * gameScreenCanvas.height/3) + 30;
        this.bottom = (Math.random() * gameScreenCanvas.height/3) + 30;
        this.x = gameScreenCanvas.width + 60;
        this.width = 200;
        this.counted = false;

        pipeBottom.height = this.top;
        pipeBottom.width = this.width;
    };


    draw(){

        let pipeBottomHeight = this.bottom;
        let pipeTopHeight = this.top;

        ctxGame.drawImage(pipeTop, this.x - 40, 0, this.width, this.top);
        ctxGame.drawImage(pipeBottom, this.x - 40, gameScreenCanvas.height - this.bottom, this.width, this.bottom);
    };


    update(){
        this.x -= gameSpeed + 2;
        if(!this.counted && this.x < char.x){
            score++;
            this.counted = true;
        }
        this.draw();
    };

};



function handleObstactles(){
    //creates a new obstacle once the frame hits 175,,, will determine spacing between obstacles
    if (frame % 175 === 0) obstaclesArray.unshift(new Obstacle);

    //
    for (let i = 0; i < obstaclesArray.length; i++) obstaclesArray[i].update();

    //removes already passed obstacles from the obstacle array
    if (obstaclesArray.length > 20) obstaclesArray.pop(obstaclesArray[0]);
};