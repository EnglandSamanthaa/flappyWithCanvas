const greenBirdSprite = new Image();
greenBirdSprite.src = 'Images/birdSpriteSheet.png';

const uFO = new Image();
uFO.src = 'Images/ufo.png';

const pinkBirdSprite = new Image();
pinkBirdSprite.src = 'Images/pinkBirdSpriteSheet.png';

const grumpyBirdSprite = new Image();
grumpyBirdSprite.src = 'Images/grumpBirdSpriteSheet.png';

const gentlemanBirdSprite = new Image();
gentlemanBirdSprite.src = 'Images/gentlemanBirdSpriteSheet.png';

const dragonSprite = new Image();
dragonSprite.src = 'Images/dragonSpriteSheet.png';

class GreenBird {
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
        if (this.y > canvas.height - (this.height * 2) + curve){
            this.y = canvas.height - (this.height * 2) + curve;
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
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(greenBirdSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x - 15, this.y - 8, this.width * 1.5, this.height * 1.5);
    }
    flap(){
        this.vy -= 2.5;
        if (this.frameX >= 7) this.frameX = 0;
        else if(frame%2 === 0) this.frameX++;

    }
}

class UFO {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 2244;
        this.orginalHeight = 2244;
        this.width = this.orginalWidth / 43;
        this.height = this.orginalHeight / 43;
        this.weight = 1;
    }
    update() {
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw() {
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(uFO, this.x, this.y , this.width, this.height * 1.4);
    }
    flap() {
        this.vy -= 2.5;
    }
}


class PinkBird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 669;
        this.orginalHeight = 588;
        this.width = this.orginalWidth / 14;
        this.height = this.orginalHeight / 14;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw() {
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(pinkBirdSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x - 8 , this.y - 6, this.width * 1.21, this.height * 1.21);
    }
    flap() {
        this.vy -= 2.5;
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame % 1.5 === 0) this.frameX++;

    }
}

class GrumpyBird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 802;
        this.orginalHeight = 814;
        this.width = this.orginalWidth / 17;
        this.height = this.orginalHeight / 17;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw() {
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(grumpyBirdSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x - 7, this.y, this.width * 1.3, this.height * 1.3);
    }
    flap() {
        this.vy -= 2.5;
        if (this.frameX >= 7) this.frameX = 0;
        else if (frame % 2 === 0) this.frameX++;

    }
}


class GentlemanBird {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 1329;
        this.orginalHeight = 865;
        this.width = this.orginalWidth / 18;
        this.height = this.orginalHeight / 18;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw() {
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(gentlemanBirdSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x, this.y - 5, this.width * 1.1, this.height * 1.2);
    }
    flap() {
        this.vy -= 2.5;
        if (this.frameX >= 8) this.frameX = 0;
        else if (frame % 1 === 0) this.frameX++;

    }
}

class Dragon {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.orginalWidth = 819;
        this.orginalHeight = 681;
        this.width = this.orginalWidth / 12;
        this.height = this.orginalHeight / 12;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle) * 10;
        if (this.y > canvas.height - (this.height * 2) + curve) {
            this.y = canvas.height - (this.height * 2) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height * 3) this.flap();
    }
    draw() {
        //uncomment next 2 lines to show box for collision detection. 
        // ctx.fillStyle = 'pink';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dragonSprite, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x - 20, this.y, this.width * 1.4, this.height * 1.2);
    }
    flap() {
        this.vy -= 2.5;
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame % 2 === 0) this.frameX++;

    }
}



const ufoChar = new UFO();
const bird = new GreenBird();
const pinkBird = new PinkBird();
const grumpyBird =  new GrumpyBird();
const gentlemanBird = new GentlemanBird();
const dragonChar = new Dragon();
