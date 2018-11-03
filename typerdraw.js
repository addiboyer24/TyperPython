/*
Author: Addison Boyer
Created: 11/02/2018
Shell for tetris style game for TyperPython
*/

var canvas = document.getElementById("gameback");
ctx = canvas.getContext("2d");

var blockIndex = -1, dropX; 
// Array to hold x, and y coordinates of blocks
var blocks = new Array();
var colors = ["Blue", "Red", "Green", "Yellow"];
spawnBlock();


document.onkeypress = moveBlock;
function collide(blockToCheck){
    var falling = blocks[blockIndex];
    
    if (blockToCheck[0] < falling[0] + falling[3] &&
   blockToCheck[0] + blockToCheck[3] > falling[0] &&
   blockToCheck[1] < falling[1] + falling[4] &&
   blockToCheck[1] + blockToCheck[4] > falling[1]) {
    // collision detected!
    return true;
}
    return false;
    
}
function moveBlock(e){
    
    e.preventDefault(); // Prevent space from moving the window
    
    var pressed = String.fromCharCode(e.keyCode);
    if(pressed == "a"){
        blocks[blockIndex][0]-=5;  
    }
    else if(pressed == "d"){
        blocks[blockIndex][0]+=5;
    }
    else if(pressed == "s"){
        blocks[blockIndex][1]+=2;
    }
    else if(e.keyCode == 32){
        var blockW = blocks[blockIndex][3];
        blocks[blockIndex][3] = blocks[blockIndex][4];
        blocks[blockIndex][4] = blockW;
    }
    
}

function update(e){
    
    if(blocks[blockIndex][1]<=canvas.height-blocks[blockIndex][4]){ // Block hasn't reached the bottom
        
        // Check if block collides with other blocks
        for(var i = 0; i < blocks.length-1; ++i){
            
            // Collides with another block
            if(collide(blocks[i])){
                if(blocks[blockIndex][1]<= canvas.width/20){
                    window.alert("Game over!");
                    location.reload();
                }
                spawnBlock();
            }
        }
        
        blocks[blockIndex][1]+=1;
    }
    else{
        spawnBlock(); // Spawn a new block
    }
    
    
    draw();
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="Black";
    ctx.strokeRect(0,canvas.width/20,canvas.width,1);
    ctx.fillRect(0,canvas.width/20,canvas.width,1);
    blocks.forEach(function(b){
        ctx.strokeRect(b[0],b[1],b[3],b[4]);
        ctx.fillStyle = b[2];
        ctx.fillRect(b[0],b[1],b[3],b[4]); 
    });
}

function spawnBlock(){
    dropX = Math.round(Math.random(10)*canvas.width-10);
    // x[0], y[1], color[2], width[3], height[4]
 blocks.push([dropX,-20,colors[Math.round(Math.random()*3)],10,20]);
    blockIndex+=1;
    return;
}

setInterval(update, 40);



