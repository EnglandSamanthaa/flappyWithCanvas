const birdSprite = new Image();
birdSprite.src = 'Images/birdSpriteSheet.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 1260;
        this.orginalHeight = 1226;
        this.width = this.orginalWidth/30;
        this.height = this.orginalHeight/30;
        this.weight = 1;
        this.frameX = 0;

    }
    update(){
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 3) + curve){
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw(){
        //ctx.fillStyle = 'pink';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x - 15, this.y - 8, this.width * 1.5, this.height * 1.5);
    }
    flap(){
        this.vy -= 2;
        if (this.frameX >= 7) this.frameX = 0;
        else if(frame%8 === 0) this.frameX++;

    }
}

const bird = new Bird();
