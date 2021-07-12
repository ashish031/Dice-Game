"use strict";

//Selcting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0"); 
const current1El = document.getElementById("current--1"); 
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");


//Starting conditions
let scores,currentScore,activePlayer,playing;


const init = function(){
    scores = [0,0];
    currentScore = 0;
    activePlayer =0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

init();
const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

//Rolling dice functionality
btnRoll.addEventListener("click", function(){
    if(playing){
        //generating a random number
    const dice = Math.trunc((Math.random() * 6) + 1);
    //display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //checking for number 1, if true switch to next player
    if(dice !== 1){
        //Add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0El.textContent = currentScore;above is the dynamic version
        
    }
    else{
        //Switch to other player
        switchPlayer();
    }
    }
});

btnHold.addEventListener("click", function(){
   if(playing){
        //add current score to active player s' score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //check if the score is already 100
    if(scores[activePlayer] >= 20){
        //finish the game
        playing = false;
        diceEl.classList.add("hidden");
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    }
    else{
        //switch to the next player
        switchPlayer();
    }
   }
});

btnNew.addEventListener("click", init);