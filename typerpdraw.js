var speed = 5;
var questions = [{"text": "00000010", "expected": "0b10"},{"text": "00000001", "expected": "0b1"}];
 window.onload = function(){
 var canvas = document.getElementById("gameback"),
 agia = canvas.getContext("2d");
 
 agia.fillStyle = "black";
 agia.fillRect(0, 0, canvas.width, canvas.height);
 
 agia.fillStyle = "white";
 agia.font = "20px Calibiri";
 agia.fillText(questions[0].text,0,canvas.height/2);
 
 
 var start = 0;
function moveText(){
 setInterval(function(){
 
 start += 2;
 
 agia.fillStyle = "black";
 agia.fillRect(0, 0, canvas.width, canvas.height,70);

  agia.fillStyle = "white";
     
  }, 40);
 };
     
 }

