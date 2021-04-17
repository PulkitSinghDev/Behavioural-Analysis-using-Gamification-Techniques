let cardSymbols=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bomb","fa-bicycle"];
var squareCount=16;
let visibleCard;
let firstCard;
let secondCard;
let matchCardnumber=0;
let movescount=0;
var level=1;
var score=0;
function shuffle(array) {
    var currentIndex=array.length,
        temporaryValue,randomIndex;
		var sqr=squareCount;
    while (sqr!==0) {
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex-=1;
        temporaryValue=array[currentIndex];
        array[currentIndex]=array[randomIndex];
        array[randomIndex]=temporaryValue;
		sqr--;
    }
    return array;
}

function generateGameBoard() {
	alert("Level - "+level+"\nScores are based on moves");
   // document.querySelector(".deck").style.visibility="visible";
    let cardItemList=shuffle(cardSymbols);
	let cardItem;
	
    for(var index=0;index<squareCount;index++)
	{
        let cardDeck=document.querySelector(".deck");
         cardItem=document.createElement("li");
        cardItem.setAttribute('id', index);
        cardItem.setAttribute('name', cardItemList[index]);
        cardItem.classList.add("card");
        cardItem.setAttribute('onclick', 'startGame(this)');
        let symbolsItem=document.createElement("i");
        symbolsItem.classList.add("fa");
        symbolsItem.classList.add(cardItemList[index]);
        cardItem.appendChild(symbolsItem);
        cardDeck.appendChild(cardItem);
	//   #plan flop
		//for(var i=0; i<16; i++)  {
	//	childNode.push({label:key[i], value: cardItem});
		//}
    }
	//console.log(cardItem);
}

function startGame(tempCard) {
    tempCard.classList.add('open');
    tempCard.classList.add('show');
    if (firstCard && secondCard) {
        firstCard.classList.remove('open');
        firstCard.classList.remove('show');
        secondCard.classList.remove('open');
        secondCard.classList.remove('show');
        firstCard=null;
        secondCard=null;
    }
    if (!visibleCard) {

        visibleCard=tempCard;
        movescount++;
    } else {
        let item={
            id:tempCard.getAttribute('id'),
            name:tempCard.getAttribute('name')
        };

        if (checkMatchCard(item)) {
            tempCard.classList.add('match');
            tempCard.removeAttribute('onclick');
            visibleCard.classList.add('match');
            visibleCard.removeAttribute('onclick');
            matchCardnumber+=1;
           gameOver();
        }
        firstCard=tempCard;
        secondCard=visibleCard;
        visibleCard=null;
		clearSelectedCards();
    }
}

function checkMatchCard(item) {
    let card={
        id:visibleCard.getAttribute('id'),
        name:visibleCard.getAttribute('name'),
        cardIsOpen:visibleCard.classList.contains('open')
    };
    return (item.name===card.name && item.id!==card.id && card.cardIsOpen);
}

function clearSelectedCards() {
    setTimeout(()=> {
        if (firstCard) {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            firstCard=null;
        }
        if (secondCard) {
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            secondCard=null;
        }
    }, 250);
}

function gameOver()
	{
		
    if (matchCardnumber==8) {
		level+=1;
		rating();
		block();
		console.log(score);
		matchCardnumber=0;
		if (level==6)
		{
			localStorage.setItem("Card-Seek",score);
			alert("Thank you for taking the test!!!");
			self.close();
		}
		else{
		generateGameBoard();
		}
    }
  }

function block()
{
		for(var i=0; i<16; i++)  {
		var element1 = document.getElementById(i);
		console.log(element1);
		document.querySelector(".deck").removeChild(element1);
		}
}

function rating() {
        if (movescount<=15) {
			score+=3;
			
        } else if (movescount<20) {
            score+=2;
        } else if (movescount<=25) {
            score+=1;
        } 
		else{
            score+=0;
        }
}



generateGameBoard();

