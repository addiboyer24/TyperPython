var canvas, width, height, context;
var speed = 6;
var angle = 290;
var rad = angle*Math.PI/180;
var R = 10;
var vx = Math.cos(rad)*speed;
var vy = Math.sin(rad)*speed;
var gravity = .05;

var ball = {x:35,y:420,vxb:vx,vyb:vy,r:R};

function init(){
    gravity = parseFloat(document.getElementById("grav").value);
    speed = parseFloat(document.getElementById("speed").value);
    vy = Math.sin(rad)*speed;
    vx = Math.cos(rad)*speed;
    ball = {x:400,y:50,vxb:vx,vyb:vy,r:R};
    $("#hide").fadeToggle();
    document.getElementById("start").enabled = false;
    
   canvas = document.querySelector("#canvas");
    d3.select("canvas").append("svg").attr("height", 100).attr("width",100).append("circle").attr("cx", 0).attr("cy",0).attr("r",40).style("fill", "green");
    
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    setInterval(draw,33); 
}

function draw(){
    context.clearRect(0,0,width,height);
    context.strokeRect(0,0,width,height);
    /*context.strokeRect(250,250,150,125);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(300,300);
    context.moveTo(350,300);
    context.lineTo(800,0);
    context.moveTo(350,350);
    context.lineTo(800,500);
    context.moveTo(300,350);
    context.lineTo(0,500);
    context.fillRect(250,250,150,125);
    context.stroke();
    */
 
    
    ball.y += ball.vyb;
    ball.x += ball.vxb;
    
    if((ball.y+ball.r)<= 500){
        ball.vyb += gravity;
    }
    else{
        ball.vyb = 0;
        ball.vxb = 0;
        ball.y = 500-ball.r;
    }
    
    context.beginPath();
    context.arc(ball.x,ball.y,ball.r,0,2*Math.PI,true);
    context.fillText("y:  "+ball.y, ball.x, ball.y-20);
    context.fillText("x:  "+ball.x, ball.x, ball.y-40);
    context.closePath();
    context.fill();
}
