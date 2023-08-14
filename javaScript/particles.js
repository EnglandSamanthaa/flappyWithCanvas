const particlesArray = [];

class Particle {
    constructor(){
        this.x = char.x;
        this.y = char.y + 25;
        this.size = Math.random() * 10;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = 'rgb(40, 247, 21)';
    };

    update(){
        this.x -= gameSpeed;
        this.y += this.speedY;
    };

    draw(){
        ctxGame.fillStyle = this.color;
        ctxGame.beginPath();
        ctxGame.arc(this.x + 10, this.y + 10, this.size, 0, Math.PI * 2);
        ctxGame.fill();
    };
};

function handleParticles(){
    particlesArray.unshift(new Particle);
    
    for (i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    };

    // if more than 200, remove 20
    if (particlesArray.lenth > 200){
        for (let i = 0; i < 20; i++){
            particlesArray.pop(particlesArray[i]);
        };
    };
};