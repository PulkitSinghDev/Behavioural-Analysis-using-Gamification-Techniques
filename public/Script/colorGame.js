var numSquares=3;
var count=0;
var NUM=0;
var levelCount=1;
var winCount=0;
var loseCount=0;
var squares=document.getElementsByClassName("square");
var colors=generateRandomColor(numSquares);
var playAgain=document.querySelector("button");
var messageDisplay=document.querySelector("#message");
var pickedColor=pickColor(numSquares);
var colorDisplay=document.querySelector("span");
var gameMode=document.querySelectorAll(".mode");


function changeColor(color,num)
{
    console.log("FUNCTION OF CHANGING COLORS CALLED with COLOR : " + color + "  num:" + num)
    for(var j=0;j<num;j++)
    {
        squares[j].style.backgroundColor=color;
    }
}

function pickColor(num)
{
    //pick random number from 1 and 6
    //Math.floor(Math.random * limit)
    var randomNumber=Math.floor(Math.random()*num );
    console.log(randomNumber)
    return colors[randomNumber];  
}

function generateRandomColor(num)
{
    var arr=[];
    for(var i=0;i<num;i++)
    {
        //get random color and store it 
        arr[i]=randomColor() 
    }
    return arr;
}

function randomColor()
{
    // pick a red ,green,blue
    var r=Math.floor(Math.random()*256 );
    var g=Math.floor(Math.random()*256 );
    var b=Math.floor(Math.random()*256 );
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function check(num)
{
    count=count+1;
    if(numSquares===3)
    {
        if(numSquares-num<=1)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
    else if(numSquares===6)
    {
        if(numSquares-num<=4)
        {
           return 0;
        }
        else
        {
            return 1;
        }
    }
    else
    {
        if(numSquares-num<=7)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
 
}




function call()
{

    if(check(count))
    {
        var clickedColor=this.style.backgroundColor;
        if(clickedColor===pickedColor)
        {
            document.querySelector("div").style.backgroundColor=clickedColor ;
            messageDisplay.textContent="Correct!!";
            changeColor(clickedColor,numSquares);
			score();
			levelCount+=1;
			count=0;
			loseCount=0;
            playAgain.textContent="Next Level !!";
			if(levelCount>10){
				alert("You have reached the end!!...Thank You for taking the test!!!");
				localStorage.setItem("Color-Game",winCount);
			self.close();
			}
        }
        else
        {
            this.style.backgroundColor="#FFFFFF";
            messageDisplay.textContent="Try Again";
			loseCount+=1;
        }
    }
    else
    {
        if(NUM==0)
        {
			score();
            messageDisplay.textContent="YOU LOST!!!!";
            alert("Thank You for taking the test!!!");
            playAgain.textContent="Lost !!";
			localStorage.setItem("Color-Game",winCount);
            document.querySelector("div").style.backgroundColor="white" ;
			self.close();
        }
        
    }
}

function score()
{
	if (loseCount==2)
	{
		winCount+=0;
	}
	else if (loseCount>=1)
	{
		winCount+=2;
	}
	else
	{
		winCount+=3;
	}
}


function PlayAgain()
{
    count=0;
    NUM=0;
	squareDisplay();
	//localStorage.setItem("storageName",winCount);
    messageDisplay.textContent="";   
    document.querySelector("div").style.backgroundColor="white";
    playAgain.textContent="NEW COLORS";
    colors=generateRandomColor(numSquares);
    pickedColor=pickColor(numSquares);    
    colorDisplay.textContent=pickedColor; 
	document.getElementById("messageDisplay").style.color=pickedColor;
    for(var i=0;i<numSquares;i++)
    {
        squares[i].style.backgroundColor=colors[i];
        squares[i].addEventListener("click",call)
    }
}

PlayAgain();
playAgain.addEventListener("click",PlayAgain);



function squareDisplay()
{

	if(levelCount>6)
    {
        numSquares=9;
    }
    else if(levelCount>3)
    {
        numSquares=6;
        
    }
    else
    {   
        numSquares=3;
    }
	alert("Level - "+levelCount);
    for(var j=0;j<squares.length;j++)
    {
        if(levelCount>6)
        {
			squares[j].style.display="block";           
		  
        }
        else if(levelCount>3)
        {
            j < 6 ?  squares[j].style.display="block":squares[j].style.display="none";
        }
        else
        {
             j < 3 ?  squares[j].style.display="block":squares[j].style.display="none";
        }
    }
	
}
