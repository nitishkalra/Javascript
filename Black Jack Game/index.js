// JavaScript source code
var cardPoints = {
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "jack": 10,
    "queen": 10,
    "king": 10,
    "ace": 0
};
var cardNumbers = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
var cardTypes = ["Diamond", "Spade", "Club", "Heart"];
var deck = createDeck();
var playerScore = 0;
var dealerScore = 0;
var dealerShownScore = 0;
var playerCards = [];
var dealerCards = [];

// DOM elements

function createDeck() {
    var arr = new Array();
    for (var i = 0; i < cardTypes.length; i++) {
        for (var j = 0; j < cardNumbers.length; j++) {
            arr.push(cardNumbers[j] +"-"+cardTypes[i]);
        }
    }
    console.log(arr);
    return arr;
}
function getAcePoints(score) {
    if (score + 11 > 21) {
        return 1;
    }
    else {
        return 11;
    }
    
}
async function dealButtonClicked() {
    var welcomeScreen = document.getElementById("welcomeScreen");
    welcomeScreen.style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
    document.getElementById("playerName").innerHTML = document.getElementById("name").value;
    await giveCardToPlayer();
    await giveCardToPlayer();
    await giveCardToDealer();
    await giveCardToDealer();
    if (playerScore == 21) {
        alert("BLACKJACKKKKKKKKKK!!!!!!!!!!!!!!!!!!");
    }

}
function getRandomCardIndex() {
    var randomCardIndex = Math.floor(Math.random() * deck.length);
    console.log(randomCardIndex);
    return randomCardIndex;
}
async function giveCardToPlayer() {
    var card = deck.splice(getRandomCardIndex(), 1).toString();
    playerCards.push(card);
    var playerCardsList = document.getElementsByClassName("playerCardsList")[0];
    var liNode = document.createElement('li');
    var imgNode = document.createElement('IMG')
    console.log(card);
    imgNode.src = `images/${card}.jpg`;
    imgNode.className = 'card';
    liNode.appendChild(imgNode);
    playerCardsList.appendChild(liNode);
    addPlayerScore();
    document.getElementById("playerScore").innerHTML = playerScore;

}
async function giveCardToDealer() {
    var card = deck.splice(getRandomCardIndex(), 1).toString();
    dealerCards.push(card);
    var dealerCardsList = document.getElementsByClassName("dealerCardsList")[0];
    var liNode = document.createElement('li');
    var imgNode = document.createElement('IMG')
    console.log(card);
    
    if (dealerCards.length == 1) {
        imgNode.src = `images/Gray_back.jpg`;
        imgNode.id = 'hiddenCard';
        imgNode.className = 'card-hidden';
    }
    else {
        imgNode.src = `images/${card}.jpg`;
        imgNode.className = 'card';
    }
    liNode.appendChild(imgNode);
    dealerCardsList.appendChild(liNode);
    addDealerScore();
    document.getElementById("dealerScore").innerHTML = dealerShownScore;

}
function addPlayerScore() {

    var cardNumber = playerCards[playerCards.length - 1].split("-")[0];
    if (cardNumber == "ace") {
        var acePointsToBeAdded = getAcePoints(dealerScore);
        playerScore += acePointsToBeAdded;
        
    }
    else {
        playerScore += cardPoints[cardNumber];

    }
    
}
function addDealerScore() {
    var cardNumber = dealerCards[dealerCards.length - 1].split("-")[0];
    if (cardNumber == "ace") {
        var acePointsToBeAdded = getAcePoints(dealerScore);
        dealerScore += acePointsToBeAdded;
        dealerShownScore += dealerCards.length==1?0:acePointsToBeAdded;
    }
    else {
        dealerScore += cardPoints[cardNumber];
        dealerShownScore += dealerCards.length==1?0:cardPoints[cardNumber];
    }
        
}
async function hitButtonClicked() {
    await giveCardToPlayer();
    
    
    if (playerScore == dealerScore) {
        revealCard();
        showResult("Draw");
        //alert("Draw!");
    }
    if (playerScore == 21) {
        revealCard();
        showResult("You Won! 21 Points ");
        //alert("You won! 21 points");
    }
    else if (playerScore > 21) {
        revealCard();
        showResult("You Lost, Score exceeded 21");
        //alert("You Lost! score exceeded 21");
    }
}
async function standButtonClicked() {
    while (dealerScore < 17 && dealerScore <= playerScore) {
        await giveCardToDealer();
    }
    if (dealerScore > 21) {
        showResult("Player Won, dealer score exceeded 21");
        //alert("Player Won, dealer score exceeded 21");
    }
    else if (dealerScore == 21) {
        if (playerScore == 21) {
            showResult("Draw :(");
            //alert("Draw :(");
        }
        else {
            showResult("Dealer Won!");
            //alert("Dealer Won!")
        }
    }
    else if (dealerScore > playerScore) {
        showResult("Dealer Won!");
    }
    else {
        showResult("Player Won!");
    }
    
    revealCard();
    document.getElementById("dealerScore").innerHTML = dealerScore;
}
function revealCard() {
    var hiddenCard = document.getElementById("hiddenCard");
    hiddenCard.src = `images/${dealerCards[0]}.jpg`;
}
function showResult(result) {
    document.getElementById("result").innerHTML = result;
    document.getElementById("reload").style.display = 'block';
    document.getElementById("hitButton").style.display = 'none';
    document.getElementById("standButton").style.display = 'none';
}
function reload() {
    location.reload();
}