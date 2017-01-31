/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

init ();

dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

//setter
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//getter
//var x = document.querySelector('#score-' + activePlayer).textContent;
// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);



// btn is a callback -  it is a function that is called by another function. 
// It is a function that is passed to another function.
document.querySelector('.btn-roll').addEventListener('click', function (){
    if(gamePlaying){
        // 1. Need a random number.
        var dice = Math.floor(Math.random() * 6) + 1;//local var
        // 2. Display the result.
        var diceDOM = document.querySelector('.dice'); 
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        document.querySelector('#current-' + activePlayer).textContent = dice;
        // 3. Update the round score IF the rolled number was not 1.

        if (dice !== 1){
            //add score
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else{
            nextPlayer();
        } 
    } 
});
//anonomys functions are used when a function will not be reused.


document.querySelector('.btn-hold').addEventListener('click', function () {  
    if(gamePlaying){
            // add current score to the global score
        scores[activePlayer] += roundScores;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // check if the player won the game
        if(scores[activePlayer] >= 20){
            document.querySelector('.player-name').textContent = 'Winner';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer () {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
}

function init () {
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

        //hide the dice in the beginning.
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}