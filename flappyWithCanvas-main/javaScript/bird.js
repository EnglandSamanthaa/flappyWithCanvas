//Images for player selection choices on homescreen
const green = new Image();
green.src = 'Images/green.png';

const pink = new Image();
pink.src = 'Images/pink.png';

const grumpy = new Image();
grumpy.src = 'Images/grumpy.png';



class Character {
  constructor(xpoint, ypoint, height, width) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.height = height;
    this.width = width;
  }

}

let greenBird = new Character(112.5, 200, 140, 175);
let pinkBird = new Character(312.5, 200, 125, 175);
let grumpyBird = new Character(512.5, 205, 125, 175);

function drawPlayerSelection() {
  ctxStart.drawImage(green, greenBird.xpoint, greenBird.ypoint, greenBird.width, greenBird.height);
  ctxStart.drawImage(pink, pinkBird.xpoint, pinkBird.ypoint, pinkBird.width, pinkBird.height);
  ctxStart.drawImage(grumpy, grumpyBird.xpoint, grumpyBird.ypoint, grumpyBird.width, grumpyBird.height);
};
