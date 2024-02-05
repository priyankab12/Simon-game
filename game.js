var randomNumber;
var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["green", "red", "yellow", "blue"];
var randomChosenColor;
var $selected;
var level=0;
var toggle=true;
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern=[];
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $selected = $("#" + randomChosenColor);
    $selected.addClass("flash");
    playSound(randomChosenColor);
   setTimeout(function() {
        $selected.removeClass("flash");
    }, 1000); // Adjust the duration (milliseconds) as needed
}
document.addEventListener("click",function(){
    var clicki=event.target.id;
    userClickedPattern.push(event.target.id);
   playSound(event.target.id);
    animatePress(clicki);
    //checking if the game pattern ==user clicked
   var size=userClickedPattern.length-1;
    checkAnswer(size);
   //animatePress(Event.key);
})
 
function playSound(randomChosenColor){
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

}
function animatePress(currentColour){
   $("#" +currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },300);

}

$(document).keydown(function(){
    if(toggle==true)
    {
         // console.log(event.key);
    nextSequence(level);
   
    toggle=false;

    }
  
    

})
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over ,Press Any key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    toggle=true;
    gamePattern=[];

}

