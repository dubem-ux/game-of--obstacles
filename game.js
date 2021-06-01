let canvas = document.getElementById('canvas'),context;
context = canvas.getContext('2d');
let body = document.getElementById('body')
body.onload =(()=>{
    startGame();
})



let startGame = (()=>{

// myScore = new component('30px','consolas','black',280,40,'text');
myGameArea.start();
myGamePiece = new component(30,30,'red',10,120);
});
function component(width, height,color,x,y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    console.log(color);
    ctx = myGameArea.context;
    console.log(ctx)
    context.fillStyle = color;
    context.fillRect(this.x,this.y,this.width,this.height);
};

let myGameArea = {
    canvas: document.getElementById('canvas'),
    start: (()=>{
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.frameNo = 0;
        
    })
//     clear:(()=>{
//         this.context.clearrect(0,0,this.canvas.width,this.canvas.height)
//     })
};


