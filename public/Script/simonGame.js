var generatedseq=[];
var started=false;
var level=0;
var userseq=[];
var colors=["green","red","blue","yellow"];

$(".start").click(function(){
    if ($("body").hasClass("game-over")){
      $("body").removeClass("game-over");
    }
    if(!started){
        generatesequence();
        started=true;
        $(".start").css("opacity","0");
    }
});

$(".btn").click(function(){
    var choosen=$(this).attr("id");
    playSound(choosen+".mp3");
    animatePress(choosen);
    userseq.push(choosen);
    chechsequence(userseq.length-1);
});

function generatesequence(){
    userseq=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomno=Math.floor(Math.random()*3);
    generatedseq.push(colors[randomno]);
    playSound(colors[randomno]+".mp3");
    animatePress(colors[randomno]);
}

function chechsequence(index){
    if(generatedseq[index]==userseq[index]){
     if(generatedseq.length==userseq.length){
            setTimeout(function() {
            generatesequence();  
            }, 500);
     }
    }
    else{
      gameover();
    }
}

function playSound(audio){
  var sound=new Audio("sounds/"+audio);
  sound.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
    $("#"+color).removeClass("pressed");
    },200);
}

function gameover(){
  $(document).addClass("game-over");
  playSound("wrong.mp3");
  $("h1").text("Wrong sequence.");
  $("body").addClass("game-over");
  savetostorage(level);
}

function savetostorage(level){ 
	localStorage.setItem("Simon-Game",level-1);
 }
