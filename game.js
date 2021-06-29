let canvas = document.getElementById('canvas'), context;
context = canvas.getContext('2d');
let body = document.getElementById('body')
body.onload = (() => {
    startGame();
});
let myScore;
// let myGamePiece,myGameArea;
let myObstacle = [];
let startGame = (() => {
    // myScore = new component('30px','consolas','black',280,40,'text');
    myGameArea.start();
    myGamePiece = new Component(30, 30, 'red', 10, 120);
    myScore = new Component('1.5em', 'Helvetica', 'whitesmoke', 10, 270, 'text');
    // myObstacle =  new Component(10,2000,'green',300,120);
});
// DRAWING THE ITEMS ON THE GAMEAREA
function Component(width, height, color, x, y, type) {
    this.type = type
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = (() => {

        ctx = myGameArea.context;
        if (this.type == 'text') {
            context.font = `${this.width} ${this.height}`;
            context.fillStyle = color;
            this.text = myScore.text;
            context.fillText(this.text, this.x, this.y);
           
        } else {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height);
        };
    })

    this.pos = (() => {
        this.x += this.speedX;
        this.y += this.speedY;
    })
    // DEFINING CONDITIONS FOR THE CRASH
    this.crashWith = ((otherObj) => {
        let myleft = this.x;
        let myRight = this.x + (this.width);
        let myTop = this.y;
        let myBottom = this.y + (this.height);
        let otherleft = otherObj.x;
        let otherRight = otherObj.x + (otherObj.width);
        let otherTop = otherObj.y;
        let otherBottom = otherObj.y + (otherObj.height);
        let crash = true
        if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherleft) ||
            (myleft > otherRight)) {

            crash = false;
        };

        return crash;
    });
};

// actions relating to the canvas area of the game
let myGameArea = {
    canvas: document.getElementById('canvas'),
    frameNo: 0,
    // STARTING THE ACTIVITIES ON THE CANVAS GAME AREA
    start: (() => {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        //RETRIEVES THE KEYCODE OF ANY KEY PRESSED
        window.addEventListener('keydown', ((e) => {
            myGameArea.key = e.keyCode;
        }));
        window.addEventListener('keyup', ((e) => {
            myGameArea.key = false;
        }))
    }),
    // CLEARING THE PREVIOUS RECTANGLES BEFORE REDRAWING
    clear: (() => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }),
    //STOPING THE REDRAWING WHEN IT HITS OBSTACLES
    stop: (() => {
        myScore.text = 'Game over';
        myScore.update();
        console.log(myScore.text)
        clearInterval(this.interval)
        
    })
};
// DRAWING THE OBSTACLES EVERY 150th FRAME
let everyinterval = ((n) => {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
});
//REDRAWING THE GAME COMPONENT WITH THE NEW PARAMETERS
let updateGameArea = (() => {
    // STOPS THE GAME IF COLLISION WITH OBSTACLES OCCUR
    collisionStopsGame();

    //CLEARS THE GAME AREA FOR UPDATING
    myGameArea.clear();
   
    // DRAWING THE OBSTACLES AND PUSHING IT INTO THE OBSTACLES ARRAY
    myGameArea.frameNo += 1;
    myObstacleActivity();

    // ACTIVATE MOUSE CONTROL
    mousecontrol()

    //ACTIVATE KEYBOARD CONTROL
    // keyboardControl();  // uncomment to play with keyboard only
    
    // myObstacle.x -= 1
    // myObstacle.update();

    // GET THE SCORE

    myScore.text = 'SCORE:' + myGameArea.frameNo;
    
    // UPDATE THE GAME CONTROL MOVEMENT
    myGamePiece.pos();

    // UPDATE THE COMPONENTS
    myGamePiece.update();
    //UPDATE SCORE
    myScore.update();
    // myObstacle.update();

});

let up = document.getElementById('up');
let down = document.getElementById('down');
let left = document.getElementById('left');
let right = document.getElementById('right');

let mousecontrol = (()=>{
up.onmousedown = (() => { moveup() });
up.onmouseup = (() => { stopmove() });
down.onmousedown = (() => { movedown() });
down.onmouseup = (() => { stopmove() });
left.onmousedown = (() => { moveleft(); });
left.onmouseup = (() => { stopmove() });
right.onmousedown = (() => { movright(); });
right.onmouseup = (() => { stopmove() })
});

let stopmove = (() => {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
});

let moveup = (() => {
    myGamePiece.speedY -= 1;
});
let movedown = (() => {
    myGamePiece.speedY += 1;
});
let moveleft = (() => {
    myGamePiece.speedX -= 1;
});
let movright = (() => {
    myGamePiece.speedX += 1
});

let keyboardControl = (() => {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (myGameArea.key && myGameArea.key == 37) {
        myGamePiece.speedX = -1
    };
    if (myGameArea.key && myGameArea.key == 39) {
        myGamePiece.speedX = 1
    };
    if (myGameArea.key && myGameArea.key == 38) {
        myGamePiece.speedY = -1
    };
    if (myGameArea.key && myGameArea.key == 40) {
        myGamePiece.speedY = 1
    };
});

let collisionStopsGame = (()=>{
    let x, y;
    for (i = 0; i < myObstacle.length; i++) {
        if (myGamePiece.crashWith(myObstacle[i])) {
        
        myGameArea.stop();
      
           
            return;
        }
    }
})

let myObstacleActivity = (()=>{
   
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;

        // GIVING THE OBSTACLES RANDOM HEIGTH
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacle.push(new Component(12, height, 'green', x, 0))
        myObstacle.push(new Component(12, x - height - gap, 'green', x, height + gap));
    }

    for (i = 0; i < myObstacle.length; i++) {
        myObstacle[i].x -= 1;
        myObstacle[i].update();
    };

});