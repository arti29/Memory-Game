/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond','fa-paper-plane-o','fa-bomb','fa-bolt','fa-cube',
'fa-anchor','fa-leaf','fa-bicycle'];
cards= cards.concat(cards);
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
let moveCounter = 0;
let openCards = [];
let matchedcards = 0;
let starCounter = 0;
const cardsContainer =document.querySelector(".deck");

//This function will place cards on deck randomly
function initGame(){
    var shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        const cardLi = document.createElement('li');
        cardLi.className = "card";
        cardLi.innerHTML = `<i class="fa ${shuffledCards[i]}"></i>`;
        cardsContainer.appendChild(cardLi);
    }

  //adding eventlistener on cardsContainer
    cardsContainer.addEventListener('click', respondToTheClick);
}

//Calling the initGame function to place the cards on deck.
initGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Below is the event listener function on the card container
function respondToTheClick(evt){

    if(evt.target.className === 'card'){
        evt.target.classList.add("open","show");
        openCards.push(evt.target);

        if (openCards.length === 2 ){
            //compare the opened cards
            compareCards();
        }
         //count the number of moves
        countMoves();
    }
}

//It will compare two opened cards
function compareCards(){
    //if cards match
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
        openCards = [];
        //check if all the cards matched & game is over
        isOver();
    }
    //if cards do not match
    else {
        openCards[0].classList.add("unmatched");
        openCards[1].classList.add("unmatched");
        setTimeout(function(){
            openCards[0].classList.remove("open","show","unmatched");
            openCards[1].classList.remove("open","show","unmatched");
            openCards =[];
        },200);

    }
}

//Function to count the number of moves user makes
function countMoves(){
    moveCounter += 1;
    move = document.querySelector(".moves");
    move.innerHTML = moveCounter;

    //calculates rating
    rating();

    if (moveCounter === 1){
        //time starts
        stopWatch();
    }
}

//Function for star ratings
const starsContainer = document.querySelector(".stars")
function rating(){

    if (moveCounter <= 30){
        starCounter = 3;
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li>
        <i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    }
    else if (30< moveCounter && moveCounter <= 40){
        starCounter = 2;
        starsContainer.innerHTML = `<li><i class="fa fa-star">
        </i></li><li><i class="fa fa-star"></i></li>`;
    }
    else {
        starCounter = 1;
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    }
}

//Function to calculate the time
let seconds = 0;
let minutes = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let interval;

function stopWatch(){

    interval = setInterval(function(){
        seconds++;
        if (seconds / 60 === 1){
            seconds = 0;
            minutes++;
        }
        //To show the seconds and minutes as two digit number.
        if(seconds<10){
            displaySeconds = "0" + seconds.toString();
        }
        else{
            displaySeconds =  seconds;
        }

        if(minutes<10){
            displayMinutes = "0" + minutes.toString();
        }
        else{
            displayMinutes =  minutes;
        }

        document.querySelector('.timer').innerHTML = displayMinutes + ":" + displaySeconds;
    },1000);
}

//Reset button on deck page
const restartButton = document.querySelector(".restart");
//adding event listener on restartButton
restartButton.addEventListener('click', function(){
    reset();
    initGame();
});

//Function to reset the grid,moves and timer.
function reset(){

    //empty deck
    const deck = document.querySelector(".deck");
    deck.innerHTML="";

    //reset moveCounter
    moveCounter=0;
    move = document.querySelector(".moves");
    move.innerHTML = 0;

    //reset the open cards array.
    openCards = [];

    //reset rating
    rating();

    //reset the time
    seconds = 0;
    minutes = 0;
    document.querySelector('.timer').innerHTML = "00" + ":" + "00";
    clearInterval(interval);
}

//Function to check if game is over and displays message accordingly.
const congrats = document.querySelector(".modal");

function isOver(){
    matchedcards += 1;
    if (matchedcards === 8){
        clearInterval(interval);

        setTimeout(function(){
            congrats.style.display = "block";
            document.querySelector(".finalmsg").innerHTML=`With ${moveCounter}
            moves and ${starCounter} stars in ${minutes}:${seconds}s<br>Woooo!`
        }, 1500)
    }
}

//Function to reset the game and start again, once game is over.
function playAgain(){

    congrats.style.display = "none";
    reset();
    initGame();
}

// Function to show the Game istructions window
function instructionOn() {
    document.getElementById("overlay").style.display = "block";
 }

// Function to remove the Game istructions window
function instructionOff() {
    document.getElementById("overlay").style.display = "none";
 }

// Function for cross button on game over window
function crossButton(){
    document.getElementById("mod").style.display="none";
 }
