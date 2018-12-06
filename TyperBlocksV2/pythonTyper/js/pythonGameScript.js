/*
Game variables
*/
var defaultSpeed = 0;
var acceleration = 1.5;
var blockIndex = -1, bustIts = 3;
var dropX, difficulty = 1, score=0;
var started = false; 
// Array to hold all blocks for drawing
var blocks = new Array();
// Colors that the blocks can be
var colors = ["Lightblue", "Gold", "Beige", "Pink"];
var usingWhile = false;
var isTurtlePower = true, isEraserPower = true;
//usingWhile = true;

/*
Game images and audio
*/
var hammer = new Image();
hammer.src = "./assets/hammer.png";
var turtle = new Image();
turtle.src = "./assets/turtle.png";
var eraser = new Image();
eraser.src = "./assets/eraser.png";

/*
Canvas resizing variables
*/
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
//ctxConsole = consoleCanvas.getContext('2d');

$(document).ready(function($){
	windowResize();
});

function update(){
    // Block hasn't reached the bottom
    if(blocks[blockIndex][1]+blocks[blockIndex][4] < mainCanvas.height){
        blocks[blockIndex][1]+=blocks[blockIndex][7];
        
        for(var i = 0; i < blocks.length-1; ++i){
            
            // Collides with another block
            if(collide(blocks[i])){
                if(blocks[blockIndex][1]< 1){ // Blocks have reached the top, game is over
                    blocks = [];
                    window.alert("Game over!");
                    location.reload();
                }
                blocks[blockIndex][6] = false;
                blocks[blockIndex][2] = "black";
                
                acceleration = 1.5;
                spawnBlock();
            }
        }
    }
    // Block reached the bottom, spawn new block
    else{
        
        blocks[blockIndex][2] = "black";
        blocks[blockIndex][6] = false;
        acceleration = 1.5;
        spawnBlock();
    }
    
    draw();
}

function windowResize(){
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    acceleration = 1.5;
    spawnBlock();
}
function resizeCanvas(){
    
   var oldHeight = mainCanvas.height;
   var oldWidth = mainCanvas.width;
    
    console.log("went here");
    scoreCanvas.width = window.innerWidth * scoreCanvasWidthPercent;
    scoreCanvas.height = window.innerHeight * scoreCanvasHeightPercent;

    /*consoleCanvas.width = window.innerWidth * consoleCanvasWidthPercent;
    consoleCanvas.height = window.innerHeight * consoleCanvasHeightPercent;*/
	
    mainCanvas.width = window.innerWidth * mainCanvasWidthPercent;
    mainCanvas.height = window.innerHeight * mainCanvasHeightPercent;
    
   var xDiff = mainCanvas.width - oldWidth;
   var yDiff = mainCanvas.height - oldHeight;
    blocks.forEach(function(b){
        b[3] = mainCanvas.width/7;
        b[4] = mainCanvas.height/7;
        b[0] = b[0]+=xDiff;
        b[1] = b[1]+=yDiff;
    });
    
    draw();
}

function draw(){ 

	
    
    ctxMain.strokeStyle = 'blue';
    ctxMain.lineWidth = '5';
    ctxMain.clearRect(0,0,mainCanvas.width, mainCanvas.height);
    ctxMain.strokeRect(0,0, mainCanvas.width, mainCanvas.height);
    ctxMain.fillStyle = "black";
    if(!started){
        ctxMain.fillText("This is the main Canvas, click to start playing!", 10,mainCanvas.height/10);   
    }
    
	// Draw the blocks on the game canvas
    ctxMain.strokeStyle = 'black';
    blocks.forEach(function(b){
        //ctxMain.strokeRect(b[0],b[1],b[3],b[4]);
        ctxMain.fillStyle = b[2];
        ctxMain.fillRect(b[0],b[1],b[3],b[4]);
        ctxMain.fillStyle="black"
        ctxMain.font = "italic 16px Courier New";
        ctxMain.fillText(b[5].question, b[0]+10, b[1]+20);
    });
    
    // Draw the rectangle to hold the powerups
    ctxMain.fillStyle = "blue";
    ctxMain.fillRect(0,0,mainCanvas.width, mainCanvas.height/20);
    
        ctxMain.fillStyle = "black";
    var offset = 10;
    // Draw the remaining number of BustIts
    for(var i = 0; i < bustIts; i++){
        ctxMain.fillStyle = "silver"
        ctxMain.fillRect(i * hammer.width+offset+(i*10),5,hammer.width, hammer.height);
        ctxMain.drawImage(hammer, i * hammer.width+offset+(i*10), 5);
        
    }
    var offset = 10;
    // Draw the power-ups on the canvas
    
    // Turtle power
    if(isTurtlePower){
        ctxMain.fillStyle = "green";
        ctxMain.fillRect(mainCanvas.width-(turtle.width+offset), 5, turtle.width,turtle.height);
        ctxMain.drawImage(turtle, mainCanvas.width-(turtle.width+offset), 5);
        
        offset+=turtle.width+10;
    }
    
    //Eraser power
    if(isEraserPower){
        ctxMain.fillStyle = "pink";
        ctxMain.fillRect(mainCanvas.width-(eraser.width+offset), 5, eraser.width, eraser.height);
        ctxMain.drawImage(eraser, mainCanvas.width-(eraser.width+offset), 5);
        offset+=eraser.width+10;
    }
    
    ctxScore.strokeStyle = 'red';
    ctxScore.lineWidth = '5';
    ctxScore.font = "30px Courier New";
    ctxScore.clearRect(0,0,scoreCanvas.width,scoreCanvas.height);
    ctxScore.strokeRect(0,0, scoreCanvas.width, scoreCanvas.height);
    ctxScore.fillText("Score: " + score, 10,30);
    
    
    
    /*ctxConsole.strokeStyle ='orange';
    ctxConsole.lineWidth ='5';
    ctxConsole.clearRect(0,0,consoleCanvas.width,consoleCanvas.height);
    ctxConsole.strokeRect(0,0,consoleCanvas.width, consoleCanvas.height);
    ctxConsole.fillText("This is the console Canvas", 10,50);
	*/
}

function spawnBlock(){
    // Get the x coordinate for the new block
    dropX = Math.round(Math.random()*(mainCanvas.width-mainCanvas.width/7));
    
    // push the block into the blocks array
    blocks.push([dropX,-(mainCanvas.height/7),colors[Math.round(Math.random()*3)],mainCanvas.width/7,mainCanvas.height/7,createQuestion(),true, defaultSpeed]);
    blockIndex+=1;
    
}

function collide(blockToCheck){
    var falling = blocks[blockIndex];
    
    if (blockToCheck[0] < falling[0] + falling[3] &&
   blockToCheck[0] + blockToCheck[3] > falling[0] &&
   blockToCheck[1] < falling[1] + falling[4] &&
   blockToCheck[1] + blockToCheck[4] > falling[1]) {
    // collision detected!
    return true;
}
    return false; // No collision detected!
    
}

function createQuestion(){
    var start = Math.round(Math.random()*10);
    var stop = Math.round((Math.random()*20)+11);
    
    // Have to use a while loop
    if(difficulty > 3){
        usingWhile = true;
    }
    
    if(difficulty == 2 || difficulty == 5){
        var questionString = start + " to " + stop + " (Sum)"; 
        var answerString = "";
        total = 0;
        for (var i = start; i <= stop; i++){
            total+=i;
        }
        answerString+=total
        answerString+="\n";
    }
    else if(difficulty == 3 || difficulty == 6){
        var divisibleBy = Math.round(Math.random(1)*10);
        var questionString = start + " to " + stop + " %" + divisibleBy + "=0"; 
    var answerString = "";
    
    for(var i = start; i<=stop; i++){
        
        if(i % divisibleBy == 0){
            answerString = answerString + i + "\n";   
        }
        
    }
        
    }
    else{ 
         
        // You have complted the game.
        if(difficulty == 7){
        window.alert("Congrats you have finished the game with a score of " + score + ". Thanks for playing!");
                     
}
        // Or, spawn the warmup questions.
        var questionString = start + " to " + stop; 
        var answerString = "";
    
        for(var i = start; i<=stop; i++){
            answerString = answerString + i + "\n";
    }
        
    }
    
    var question = {"question": questionString, "answer": answerString};
    
    return question;
}

// Function that removes the block if bustIts are available.
function killBlock(e){
    
    if(started == false){ // Start the game on click
        started = true;
        defaultSpeed = 0.25;
        blocks[blockIndex][7]=defaultSpeed;
    }
    
    
    var rect = mainCanvas.getBoundingClientRect();
    
    var scaleX = mainCanvas.width / rect.width;
    var scaleY = mainCanvas.height / rect.height;
    
    var x = (e.clientX - rect.left)*scaleX;
    var y = (e.clientY - rect.top)*scaleY;
    
    //console.log("went here");
    
    if(collide([x,y,"Blue",30,30,true]) && bustIts > 0){
        blocks.splice(blocks.indexOf(blocks[blockIndex]),1);
            // Play the sound
            bustIts-=1;
            blockIndex-=1;
            acceleration = 1.5;
            spawnBlock();
    }
    
    // Check to see if the user clicked on a powerup!
    powerUpUsed(x,y);
    
}

function powerUpUsed(x,y){
    
    var turtleX = mainCanvas.width-turtle.width-10;
    /*var eraserX = canvas.width-bomb.width-50;
    var chameleonX = canvas.width-chameleon.width-90;
    var timeX = canvas.width-time.width-130;
    var billsX = canvas.width-bills.width-170;
    var windX = canvas.width-move.width-210;
    var floatX = canvas.width-float.width-250;*/
    var checkY = 5;
    
    
    
    // Block to check (x,y.10,10)
    // falling (turtleX, checkY, turtle.width, turtle.height )
    
    // slow down with Turtle
    if (x < turtleX + turtle.width &&
   x + 10 > turtleX &&
   y < checkY + turtle.height &&
   y + 10 > checkY && isTurtlePower) {
        
        // Used the turtle powerup
        isTurtlePower = false;
        //braking.play();
        blocks[blockIndex][7]-=.235;
    
}
    
// Erase all blocks on the screen
/*else if(x < eraserX + eraser.width &&
   x + 10 > eraserX &&
   y < checkY + eraser.height &&
   y + 10 > checkY){
    
    eraserPowerAvailable = false;
    eraseAllBlocks();
}
// Get a new question
else if(x < chameleonX + chameleon.width &&
   x + 10 > chameleonX &&
   y < checkY + chameleon.height &&
   y + 10 > checkY){
    chameleonPowerAvailable = false;
    change.play();
    blocks[blockIndex][5] = createQuestion();
}
    else if(x < timeX + time.width &&
   x + 10 > timeX &&
   y < checkY + time.height &&
   y + 10 > checkY){
    
    blocks[blockIndex][1] = 0;
    
    timePowerAvailable = false;
    winding.play();
}
    else if(x < billsX + bills.width &&
   x + 10 > billsX &&
   y < checkY + bills.height &&
   y + 10 > checkY){
    
    blocks[blockIndex][2] = "Lightgreen";
    blocks[blockIndex][5].question = "print('$')";
    blocks[blockIndex][5].answer = "$\n";
    chaching.play();
    blocks[blockIndex][7] = 0;
    lootPowerAvailable = false;
    
}
    
    else if(x < windX + move.width &&
   x + 10 > windX &&
   y < checkY + move.height &&
   y + 10 > checkY){
    
    var tot = 0; 
    blocks.forEach(function(b){
        tot+=b[0] 
    });
    tot = tot/blocks.length;
    blocks[blockIndex][0] = canvas.width-tot;
    blocks[blockIndex][1]-=50;
    windy.play();
    movePowerAvailable = false;
    
}
    else if(x < floatX + float.width &&
   x + 10 > floatX &&
   y < checkY + float.height &&
   y + 10 > checkY){
    
    blocks[blockIndex][7] = -.5;
    inflate.play();
    floatPowerAvailable = false;
    isFloating = true;
    
}*/

}

function checkForAnswer(answer){
    var i = 0;
    
    if(usingWhile){
        if(!checkForWhile()){
         answer = "";
        }
    }
    
    blocks.forEach(function(b){
        
        if(b[5].answer == answer && b[6] == true){
            blocks.splice(blocks.indexOf(b),1);
            blockIndex-=1;
            //correct.play();
            score+=difficulty; // Score porportional to difficulty
            if(score % 5 == 0){
                //defaultSpeed+=.1;
                difficulty+=1;
                if(bustIts < 5){
                    bustIts+=1;
                    //ding.play();   
                }
                
            }
            document.getElementById("consoleCanvas").value = "";
            spawnBlock();
        }
        i+=1;
    });
}

function reservedWords(){
    var newHtml = "";
    var currentCode = consoleCanvas.value;
    words = currentCode.split(" ");
    console.log(words);
    
    for(var i = 0; i < words.length; i++){
        if(words[i] == "for"){
            console.log("Went here");
            words[i] = "<span class='statement'>" + words[i] + " &nbsp;</span>";
            
        }
    }
    
    words.forEach(function(word){
        console.log(word);
        newHtml+=word;
        newHtml+=" ";
    });
    
    consoleCanvas.innerHtml = newHtml; 
}

function checkForWhile(){
    var currentCode = consoleCanvas.value;
    
    if(currentCode.search("while") == -1){
        window.alert("Try to destroy the block using a while loop instead!");
        return false;
    }
    else{
        return true; 
    }
}

// Call the update function
setInterval(update, 7.77);

// Check to see if the user clicked on a block
document.onmousedown = killBlock;
document.onkeydown = reservedWords;