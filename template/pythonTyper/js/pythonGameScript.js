
var mainCanvasWidthPercent = .8;
var mainCanvasHeightPercent = .94;
var mainCanvas = document.getElementById('mainCanvas');

var scoreCanvasWidthPercent = .8;
var scoreCanvasHeightPercent = .05;
var scoreCanvas = document.getElementById('scoreCanvas');

var consoleCanvasWidthPercent = .19;
var consoleCanvasHeightPercent = 1;
var consoleCanvas = document.getElementById('consoleCanvas');

ctxMain = mainCanvas.getContext('2d');
ctxScore = scoreCanvas.getContext('2d');
ctxConsole = consoleCanvas.getContext('2d');

$(document).ready(function($){
	windowResize();
});


function windowResize(){
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}
function resizeCanvas(){

    scoreCanvas.width = window.innerWidth * scoreCanvasWidthPercent;
    scoreCanvas.height = window.innerHeight * scoreCanvasHeightPercent;

    consoleCanvas.width = window.innerWidth * consoleCanvasWidthPercent;
    consoleCanvas.height = window.innerHeight * consoleCanvasHeightPercent;
	
    mainCanvas.width = window.innerWidth * mainCanvasWidthPercent;
    mainCanvas.height = window.innerHeight * mainCanvasHeightPercent;
	
	
    draw();
}

function draw(){ 

	
    ctxMain.strokeStyle = 'blue';
    ctxMain.lineWidth = '5';
    ctxMain.strokeRect(0,0, mainCanvas.width, mainCanvas.height);
    ctxMain.fillText("This is the main Canvas", 10,50);
	

    ctxScore.strokeStyle = 'red';
    ctxScore.lineWidth = '5';
    ctxScore.strokeRect(0,0, scoreCanvas.width, scoreCanvas.height);
    ctxScore.fillText("This is the Scoreboard Canvas", 10,20);

    ctxConsole.strokeStyle ='orange';
    ctxConsole.lineWidth ='5';
    ctxConsole.strokeRect(0,0,consoleCanvas.width, consoleCanvas.height);
    ctxConsole.fillText("This is the console Canvas", 10,50);
	
}