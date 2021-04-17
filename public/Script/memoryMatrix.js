var numSquares=9;
var bCount=0;
var NUM=0;
var levelCount=1;
var winCount=0;
var loseCount=0;
var count=0;
var squares=document.getElementsByClassName("square");
var colors=generateRandomColor(numSquares);
var playAgain=document.querySelector("button");
var messageDisplay=document.querySelector("#message");
var colorDisplay=document.querySelector("span");
var gameMode=document.querySelectorAll(".mode");


function generateRandomColor(num)
{
    var arr=[];
	var temp;
	var i=0;
    while(arr.length!=Math.floor(num/3))
    {
       
		temp=randomColor();
        if(arr.indexOf(temp)<0 && temp<numSquares){
			arr[i]=temp;
			i++;
		}
    }
	console.log(arr);
    return arr;
}

function randomColor()
{
	return Math.floor(Math.random() * numSquares) + 1;
    
   // return Math.floor(((Math.random()+10)*100)%10);
}

function check(num)
{
	console.log(num);
		if(num<2){
			return 1;
		}
        else
        {
            return 0;
        }
       
}

//trial and error
function call()
{
	
	if (!this.classList.contains('selected')){
		
		if(check(count)){
			if(this.classList.contains('hover')){
				this.classList.remove('hover');
				this.classList.add('selected');
				this.style.backgroundColor="#8cba51";
				bCount+=1;
				playAgain.disabled=true;
				
				if(bCount===colors.length ){
					for(var i=0;i<numSquares;i++)
					{
						squares[i].classList.remove('selected');
					}
					bCount=0;
					levelCount+=1;
					count=0;
					score();
					if(levelCount>10){
					alert("You have reached the end!!...Thank You for taking the test!!!");
					localStorage.setItem("Memory-Matrix",winCount);
					self.close();
					}					
					localStorage.setItem("Memory-Matrix",winCount);
					setTimeout(PlayAgain,250);
				}
			}
			else{
				this.style.backgroundColor="#fd5e53";
				loseCount+=1;
				count+=1;
			}
		}
		else{
			score();
			lost();
		}
	}
}




function lost(){
	
            messageDisplay.textContent="YOU LOST!!!!";
            alert("Thank You for taking the test!!!");
            playAgain.textContent="Lost !!";
			localStorage.setItem("Memory-Matrix",winCount);
            document.querySelector("div").style.backgroundColor="white" ;
			self.close(); 
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
	loseCount=0;
}
	
	
function PlayAgain()
{
    count=0;
    NUM=0;
	squareDisplay();
    messageDisplay.textContent="";   
    document.querySelector("div").style.backgroundColor="white";
    colors=generateRandomColor(numSquares);  
    colorDisplay.textContent="All the best";
	playAgain.disabled=true;
    for(var i=0;i<numSquares;i++)
    {
		if(colors.indexOf(i)>-1){
			squares[i].style.backgroundColor="#de7119";
			squares[i].classList.add('hover');
		}
		else{
        squares[i].style.backgroundColor="#C5C5C5";
		}
        squares[i].addEventListener("click",call)
    }
	 setTimeout(changeBack, 500);
}

function changeBack()
{
	for(var i=0;i<numSquares;i++)
    {		
        squares[i].style.backgroundColor="#C5C5C5";
    }
}
	
PlayAgain();
//playAgain.addEventListener("click",PlayAgain);

function squareDisplay()
{

	if(levelCount>6)
    {
        numSquares=25;
    }
    else if(levelCount>3)
    {
        numSquares=16;
        
    }
    else
    {   
        numSquares=9;
    }
	alert("Level - "+levelCount);
	
    for(var j=0;j<squares.length;j++)
    {
        if(levelCount>6)
        {
			squares[j].style.display="block"; 
			squares[j].style.margin="0.8%";
			squares[j].style.width="18%";
			squares[j].style.bottomPadding="18%";
		  
        }
        else if(levelCount>3)
        {
            j < 16 ?  squares[j].style.display = "block" : squares[j].style.display="none";
			squares[j].style.margin="0.5%"; 
			
        }
        else
        {
             j < 9 ?  squares[j].style.display = "block" : squares[j].style.display="none";
			 squares[j].style.margin="3%"; 
			 
			 
        }
    }
	
}
