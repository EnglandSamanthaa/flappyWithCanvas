const pipeBottom = new Image();
pipeBottom.src = 'Images/pipe.png';

const pipeTop = new Image();
pipeTop.src = 'Images/pipetop.png';

const obstaclesArray = [];

class Obstacle {
    constructor(){
        this.top = (Math.random() * gameScreenCanvas.height/5) + 30;
        this.bottom = (Math.random() * gameScreenCanvas.height/3) + 30;
        this.x = gameScreenCanvas.width + 60;
        this.width = 100;
        this.counted = false;

        pipeBottom.height = this.top;
        pipeBottom.width = this.width;
    }

    draw(){
        let pipeBottomHeight = this.bottom;
        let pipeTopHeight = this.top;

        ctxGame.drawImage(pipeTop, this.x - 40, 0, this.width, this.top);
        ctxGame.drawImage(pipeBottom, this.x - 40, gameScreenCanvas.height - this.bottom, this.width, this.bottom);
    }

    update(){
        this.x -= gameSpeed + 2;
        if(!this.counted && this.x < char.x){
            score++;
            this.counted = true;
        }
        this.draw();

    }
}



function handleObstactles(){
    if (frame % 100 === 0){
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}