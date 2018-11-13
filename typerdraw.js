/*
Author: Addison Boyer
Created: 11/02/2018
Shell for tetris style game for TyperPython
*/
var crumbling = new Audio("./crumbling.mp3")
var correct = new Audio("./correct.mp3");
var difficulty = 2, score = 0, bustIts = 3; 
var canvas = document.getElementById("gameback");
ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = canvas.height * (canvas.clientWidth/canvas.clientHeight);

var blockIndex = -1, dropX; 
// Array to hold x, and y coordinates of blocks
var blocks = new Array();
var colors = ["Pink", "Cyan", "Orange", "Yellow"];




// Spawn the first block
spawnBlock();

//document.onkeypress = moveBlock;
// Collision function
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
/*function moveBlock(e){
    
    e.preventDefault(); // Prevent space from moving the window
    
    var pressed = String.fromCharCode(e.keyCode);
    if(pressed == "a"){
        
        if(blocks[blockIndex][0] >= 0){
            blocks[blockIndex][0]-=10;   
        }
          
    }
    else if(pressed == "d"){
        if(blocks[blockIndex][0] <= canvas.width-blocks[blockIndex][3]){
            blocks[blockIndex][0]+=10;  
        }
        
    }
    else if(pressed == "s"){
        blocks[blockIndex][1]+=20;
    }
    else if(e.keyCode == 32){
        var blockW = blocks[blockIndex][3];
        blocks[blockIndex][3] = blocks[blockIndex][4];
        blocks[blockIndex][4] = blockW;
    }
    
}*/

function update(e){
    
    if(blocks.length > 0){
    if(blocks[blockIndex][1]<=canvas.height-blocks[blockIndex][4]-20){ // Block hasn't reached the bottom
        
        // Check if block collides with other blocks
        for(var i = 0; i < blocks.length-1; ++i){
            
            // Collides with another block
            if(collide(blocks[i])){
                if(blocks[blockIndex][1]<= 0){ // Blocks have reached the top, game is over
                    window.alert("Game over!");
                    location.reload();
                }
                blocks[blockIndex][6] = false;
                blocks[blockIndex][2] = "black";
                spawnBlock();
            }
        }
        
        blocks[blockIndex][1]+=.2;
    }
    else{
        blocks[blockIndex][6] = false;
        blocks[blockIndex][2] = "black";
        spawnBlock(); // Spawn a new block
    }
    
    
    draw();
}
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="Black";
    ctx.fillRect(0,canvas.height-20,canvas.width,20);
    blocks.forEach(function(b){
        ctx.fillStyle = b[2];
        ctx.strokeRect(b[0],b[1],b[3],b[4]);
        ctx.fillRect(b[0],b[1],b[3],b[4]);
        ctx.fillStyle = "black";
        ctx.font = "10px Comic Sans MS";
        ctx.fillText(b[5].question, b[0]+2,b[1]+b[4]/2);
    });
}

function spawnBlock(){
    dropX = Math.round(Math.random()*(canvas.width-canvas.width/7));
console.log(dropX);
    // x[0], y[1], color[2], width[3], height[4] question[5] isActive[6]
 blocks.push([dropX,-20,colors[Math.round(Math.random()*3)],canvas.width/7,canvas.height/7,createQuestion(),true]);
    blockIndex+=1;
    return;
}
    
function checkForAnswer(answer){
    var i = 0; 
    blocks.forEach(function(b){
        
        if(b[5].answer == answer && b[6] == true){
            blocks.splice(blocks.indexOf(b),1);
            blockIndex-=1;
            correct.play();
            score+=difficulty; // Score porportional to difficulty
            if(score % 5 == 0){
                difficulty+=1;
            }
            document.getElementById("yourcode").value = "";
            spawnBlock();
        }
        i+=1;
    });
}

function createQuestion(){
    var start = Math.round(Math.random()*10);
    var stop = Math.round((Math.random()*20)+11);
    
    if(difficulty == 1){
        var questionString = start + " to " + stop + " (Sum)"; 
        var answerString = "";
        total = 0;
        for (var i = start; i <= stop; i++){
            total+=i;
        }
        answerString+=total
        answerString+="\n";
    }
    else if(difficulty == 2){
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
        
        var questionString = start + " to " + stop; 
        var answerString = "";
    
        for(var i = start; i<=stop; i++){
            answerString = answerString + i + "\n";
    }
        
    }
    
    

    var question = {"question": questionString, "answer": answerString};
    
    return question;
}

function killBlock(e){
    var rect = canvas.getBoundingClientRect();
    
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    
    var x = (e.clientX - rect.left)*scaleX;
    var y = (e.clientY - rect.top)*scaleY;
    
    if(collide([x,y,"Blue",30,30,true]) && bustIts > 0){
        blocks.splice(blocks.indexOf(blocks[blockIndex]));
            crumbling.play()
            bustIts-=1;
            blockIndex-=1;
            spawnBlock();
    }
}

document.onmousedown = killBlock;
setInterval(update, 10);






