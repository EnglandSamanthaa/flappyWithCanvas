// ------------------------------         Images for player selection choices on homescreen
const greenSelection = new Image();
greenSelection.src = 'Images/green.png';
greenSelectionHeight = (innerHeight/4);
greenSelectionWidth = (innerWidth/6);
greenSelectionX = (innerWidth/3.5) - greenSelectionWidth
greenSelectionY = (innerHeight/3)

const pinkSelection = new Image();
pinkSelection.src = 'Images/pink.png';
pinkSelectionHeight = (innerHeight/4);                               
pinkSelectionWidth = (innerWidth/6);
pinkSelectionX = (innerWidth/3.5)*2 - pinkSelectionWidth;
pinkSelectionY = (innerHeight/3)

const grumpySelection = new Image();
grumpySelection.src = 'Images/grumpy.png';
grumpySelectionHeight = (innerHeight/4);     
grumpySelectionWidth = (innerWidth/6);
grumpySelectionX = (innerWidth/3.5)*3 - grumpySelectionWidth;
grumpySelectionY = (innerHeight/3)




// ---------------------------                        Images for spriteSheets
const greenBirdSprite = new Image();
greenBirdSprite.src = 'Images/spriteSheets/birdSpriteSheet.png';
const greenBirdOrginalHeight = 1226;
const greenBirdOrginalWidth = 1260; 

const pinkBirdSprite = new Image();
pinkBirdSprite.src = 'Images/spriteSheets/pinkBirdSpriteSheet.png';
const pinkBirdOrginalHeight = 588;
const pinkBirdOrginalWidth =  669;

const grumpyBirdSprite = new Image();
grumpyBirdSprite.src = 'Images/spriteSheets/grumpBirdSpriteSheet.png';
const grumpyBirdOrginalHeight = 814;
const grumpyBirdOrginalWidth = 802;


// ------------------------               Homescreen player selection constructor. 
class CharacterSelection {
  constructor(xpoint, ypoint, height, width) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.height = height;
    this.width = width;
  }
}

// variable image of player to selection from on homescreen
const greenBirdSelection = new CharacterSelection(greenSelectionX, greenSelectionY, greenSelectionHeight, greenSelectionWidth);
const pinkBirdSelection = new CharacterSelection(pinkSelectionX, pinkSelectionY, pinkSelectionHeight, pinkSelectionWidth);
const grumpyBirdSelection = new CharacterSelection(grumpySelectionX, grumpySelectionY, grumpySelectionHeight, grumpySelectionWidth);



//draws the player choices for homescreen selection
function drawPlayerSelection() {

  //draws green bird on the start screen
  ctxStart.drawImage(greenSelection, greenBirdSelection.xpoint, greenBirdSelection.ypoint, greenBirdSelection.width, greenBirdSelection.height);
  
  //draws pink bird on the start screen
  ctxStart.drawImage(pinkSelection, pinkBirdSelection.xpoint, pinkBirdSelection.ypoint, pinkBirdSelection.width, pinkBirdSelection.height);
  
  //draws grumpy bird on the start screen
  ctxStart.drawImage(grumpySelection, grumpyBirdSelection.xpoint, grumpyBirdSelection.ypoint, grumpyBirdSelection.width, grumpyBirdSelection.height);
};


class GamePlayCharacter {
  constructor(name, x, y, orginalWidth, orginalHeight, width, height, frameCount, spriteSheet){
    this.name = name;
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.orginalWidth = orginalWidth
    this.orginalHeight = orginalHeight;
    this.width = width;
    this.height = height;
    this.weight = 1;
    this.frameX = 0;
    this.frameCount = frameCount;
    this.spriteSheet = spriteSheet;

  }
  update(){
    let curve = Math.sin(angle) * 10;
    if (this.y > gameScreenCanvas.height - (this.height)+ curve) {
      this.y = gameScreenCanvas.height - (this.height) + curve;
      this.vy = 0;
      }else{
        this.vy += this.weight;
        this.vy *= .6;
        this.y += this.vy;
      }

    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed && this.y > this.height) this.flap();
  }
  draw(){
    // ctxGame.fillStyle = 'pink';
    // ctxGame.fillRect(this.x, this.y, this.width, this.height);
    ctxGame.drawImage(this.spriteSheet, this.frameX * this.orginalWidth, 0, this.orginalWidth, this.orginalHeight, this.x, this.y, this.width, this.height);
  }
  flap(){
    this.vy -= 5;
    if (this.frameX >= this.frameCount) this.frameX = 0;
    else if (frame % 2 === 0) this.frameX++;
  }
}

// in game characters
const greenBirdCharacter = new GamePlayCharacter('Green Bird', 300, 200, greenBirdOrginalWidth, greenBirdOrginalHeight, greenBirdOrginalWidth/12.26, greenBirdOrginalHeight/12.26, 7, greenBirdSprite);
const pinkBirdCharacter = new GamePlayCharacter('Pink Bird', 300, 200, pinkBirdOrginalWidth, pinkBirdOrginalHeight, pinkBirdOrginalWidth/5.88, pinkBirdOrginalHeight/5.88, 3, pinkBirdSprite);
const grumpyBirdCharacter = new GamePlayCharacter('Grumpy Bird', 300, 200, grumpyBirdOrginalWidth, grumpyBirdOrginalHeight, grumpyBirdOrginalWidth/8.14, grumpyBirdOrginalHeight/8.14, 7, grumpyBirdSprite);


