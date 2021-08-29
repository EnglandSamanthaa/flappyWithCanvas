class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 1;

    }
    update(){
        if (this.y > canvas.height - this.height){
            this.y = canvas.height - this.height;
            this.vy = 0;
        }
        this.vy += this.weight;
        this.y += this.vy;
    }
    draw(){
        ctx.fillstyle = 'pink';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap(){
        this.vy -= 2;
    }
}

const bird = new Bird();
