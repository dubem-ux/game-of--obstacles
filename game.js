let canvas = document.getElementById('canvas'),context;
context = canvas.getContext('2d');
let body = document.getElementById('body')
body.onload =(()=>{
    startGame();
})

let startGame = (()=>{
// myScore = new component('30px','consolas','black',280,40,'text');
myGameArea.start();
myGamePiece = new Component(30,30,'red',10,120);
});
function Component(width, height,color,x,y){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
   
    this.update = (()=>{

        ctx = myGameArea.context;
        context.fillStyle = color;
        context.fillRect(this.x,this.y,this.width,this.height);
    })

    this.pos = (()=>{
        this.x += this.speedX;
        this.y += this.speedY;
    })
    
};
let myGameArea = {
    canvas: document.getElementById('canvas'),
    start: (()=>{
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea,20)
    }),
    clear:(()=>{
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    })
};

let updateGameArea = (()=>{
    myGameArea.clear();
    myGamePiece.x += 1
    myGamePiece.update()
});
