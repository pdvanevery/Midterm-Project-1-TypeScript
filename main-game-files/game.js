//move(player('assets/buggy-filler.jpeg')).to(200, 450)//

//Global Vairables
let yourMove;
let oppMove;
let savedOppMove;
let yourHealth = 100;
let oppHealth = 100;

//turn counters
let totRounds = 0;


//Variables for moves
let result;
const playByPlay = document.getElementById("announcements");
const yourHealthBar = document.getElementById("yourHealthBar");
const oppHealthBar = document.getElementById("oppHealthBar");
const attackButtonL = document.getElementById("attack1");
const attackButtonM = document.getElementById("attack2");
const attackButtonH = document.getElementById("attack3");
const counterButton = document.getElementById("counter");
const playAgain = document.getElementById("playAgain");

attackButtonL.addEventListener("click", fight);
attackButtonM.addEventListener("click", fight);
attackButtonH.addEventListener("click", fight);
counterButton.addEventListener("click", fight);

//run on load bc will disable during opp turn
function enableButtons() {
    attackButtonL.disabled = false;
    attackButtonM.disabled = false;
    attackButtonH.disabled = false;
    counterButton.disabled = false;
}

//starts the fight
function fight(e) {
    addRound();
    oppMoveA(e.target.id);
    healthChange();
    gameOver();
}

//adds a round to the round counter
function addRound() {
    totRounds += 1;
}

//adds counter action to the attacks
//counter to light attack
function counter(y, o) {
    let move = Math.floor((Math.random()*6)+1);
    if (y === "attack1") {
        if (move >=6){
            result = "Opponent's counter was successful! You took 10 damage";
            yourHealth -= 10;
            console.log("line 58", yourHealth);
        } 
        else {
            result = "Opponent's counter failed! You dealt 12 damage!";
            oppHealth -= 12;
            console.log("line 63", oppHealth);
        } 
    } 
     else if (y === "attack2") {
        if (move >=5){
            result = "Opponent's counter was successful! You took 15 damage";
            yourHealth -= 15;
            console.log("line 70", yourHealth);
        } 
        else {
            result = "Opponent's counter failed! You dealt 17 damage!";
            oppHealth -= 17;
            console.log("line 75", oppHealth);
        }
    }
   else if (y === "attack3") {
        if (move >=4){
            result = "Opponent's counter was successful! You took 22 damage";
            yourHealth -= 22;
            console.log("line 82", yourHealth);
        }
        else {
            result = "Opponent's counter failed! You dealt 25 damage!";
            oppHealth -= 25;
            console.log("line 87", oppHealth);
        }
    }

    // if (move >= 6 && y === "counter") {
    //     result = "Your counter was succcessful! Opponent took 10 damage";
    //     oppHealth -= 10;
    //     console.log("line 60", oppHealth);
    // } else {
    //     result = "Your counter was not successful! your were dealth 12 damage!";
    //     yourHealth -= 12;
    //     console.log("line 68", yourHealth);
    // }

       
    // if (move2 >= 5 && y === "counter") {
    //     result = "Your counter was succcessful! Opponent took 15 damage";
    //     oppHealth -= 15;
    //     console.log("line 77", oppHealth);
    // } else {
    //     result = "Your counter was not successful! your were dealth 17 damage!";
    //     yourHealth -= 17;
    //     console.log("line 84", yourHealth);
    // }     
    
   
    // if (move3 >= 4 && y === "counter") {
    //     result = "Your counter was succcessful! Opponent took 15 damage";
    //     oppHealth -= 20;
    //     console.log("line 94", oppHealth);
    // } else {
    //     result = "Your counter was not successful! your were dealt 25 damage!";
    //     yourHealth -= 25;
    //     console.log("line 101", yourHealth);
    //}     
}

//Display results for the round and health bar
function roundResults(result) {
    playByPlay.innerHTML += result + "<br>";
}

function healthChange() {
    yourHealthBar.style.width = yourHealth + "%";
    oppHealthBar.style.width = oppHealth + "%";
}

//game over function
function gameOver() {
    if (yourHealth <= 0 || oppHealth <= 0) {
        result = "Game Over!";
        roundResults(result);
        attackButtonL.disabled = true;
        attackButtonM.disabled = true;
        attackButtonH.disabled = true;
        counterButton.disabled = true;
        playAgain.disabled = true;
    }
}

//Game mechanics

//Generates a move for the opponent to use after the player chooses a move
function oppMoveA(id) {
    let moveC = 
    Math.floor((Math.random()*6)+1);
    if (moveC <= 4) {
        savedOppMove = "attack1";
    } else if (moveC = 3)  {
        savedOppMove = "attack2";
    } else if (moveC = 2) {
        savedOppMove = "attack3";
    } else {
        savedOppMove = "counter";
    };

    result = ("Your move is <span>" + id + "</span> and the computers move is <span>" + savedOppMove + "</span> on round " + totRounds);
    console.log(id, savedOppMove);
    damageStep(id, savedOppMove);
    damageStep2(id, savedOppMove);
    roundResults(result);

}


//actually applies the damage step
function damageStep(y, o) {
    if (y === "attack1" && o === "attack1") {
        result = "Both players took damage";
        if (oppHealth >=10 && yourHealth >= 10) {
            oppHealth -= 10;
            yourHealth -= 10;
            console.log("line 178", oppHealth);
            console.log("line 179", yourHealth);
        } else {
            oppHealth = 0;
            yourHealth = 0
        }
    } else if (y === "counter" && o === "counter") {
        result = "Both players attempted to counter, counters failed";
    } else if ( y === "attack1" && o === "attack2") {
        result = "Opponent is ready to counter";
        counter(y, o);
    } else if (y === "counter" && o === "attack1") {
        result = "You are ready to counter";
        counter(y, o );
    }
}

function damageStep2(y, o) {
    if (y === "attack2" && o === "attack2") {
        result = "Both players took damage";
        if (oppHealth >=15 && yourHealth >= 15) {
            oppHealth -= 15;
            yourHealth -= 15;
            console.log("line 201", oppHealth);
            console.log("line 202", yourHealth);
        } else {
            oppHealth = 0;
            yourHealth = 0
        }
    } else if (y === "counter" && o === "counter") {
        result = "Both players attempted to counter, counters failed";
    } else if ( y === "attack2" && o === "attack1") {
        result = "Opponent is ready to counter";
        counter(y, o);
    } else if (y === "counter" && o === "attack2") {
        result = "You are ready to counter";
        counter(y, o );
    } 
}

window.onload=enableButtons();