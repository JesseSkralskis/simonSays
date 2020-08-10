
//array that will hold, 20 random numbers from 1 to 4 that will each represent
//one of the four pads in game
let order = [];
//array that will hold the players sequence
let playerOrder = [];
// keep track of the amount of the sequences hoe many times it flashes
let flash;
//keep track of turn
let turn;
//boolean thatkeeps track if player is not making mistakes
let good;
// variable to signify if its the computers turn
let compTurn;
//variable that will be in charge of triggering the intervals requred
let intervalId;
//dictates if in strict mode or not
let strict = false;
//dictates if computer should make a noise or not
let noise = true;
//dictates if game is on (when not on player cant push buttons)
let on = false;
//boolean that checks if player has won
let win;

// grabbing all of the needed elements
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");


const strictButton = document.querySelector('#strict');
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//making the strict button be on or off
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked) {
        strict = true;



    }else{
        strict = false;
    }
} );

//allowing the game to be turned on and if so creating a blank line in turncounter box.
//if not on clearColor will be called which puts the colors back to default
//also the intervalId interval will be stopped
onButton.addEventListener('click', (event) => {
    if (onButton.checked){
      on = true;
      turnCounter.innerHTML = "-";

    }else{
        on = false;
        turnCounter.innerHTML = '';
        clearColor();
        clearInterval(intervalId);
    }




});


//start button initiates game by calling the play function if on is true or the player has won
startButton.addEventListener('click', (event) =>{
    if (on || win){
        play();
    }
});


//game starts  all the variables are set to their start positions.
//the the sequence is created by randomly placing 20 digits 1-4 in an array.
// then the intterval is initiated that calls the gameturn() fuction every 800 milliseconds
function play() {
    console.log("play called");

   win = false;
   order = [];
   playerOrder = [];
   flash = 0;
   intervalId =0;
   turn = 1;
   turnCounter.innerHTML = 1;
   good = true;

   for(let i = 0; i < 20; i ++){
       order.push(Math.floor(Math.random() * 4) + 1 );


   }


   compTurn = true;
   intervalId = setInterval(gameTurn, 800);



}
function gameTurn() {
    console.log("game turned called");
    console.log(flash);
    console.log(turn);
    on = false;

    //checks if the computers turn is over by comparing the amount of flashes to the turn number. if they are
    // the same then the interval is stopped and the colors are cleared back to default awaiting the players input
    // on os set to true so player can input again compturn os put to false
    if (flash ==  turn){
        console.log("comp turn finished");
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    // if its the computers turn every 200 milliseconds the computer will play the sequence of pads and make a noise
    //by using the flash counter as an index and checking if its that number to call the function that initiates the sound and lights for
    //the sequence
   if(compTurn){
        console.log("compturn reached");
        clearColor();
        setTimeout(() => {
            if(order[flash] == 1) one();
            if(order[flash] == 2) two();
            if(order[flash] == 3) three();
            if(order[flash] == 4) four();
            flash++;

        },300);

   }
   console.log(order)
}


// checks if noise is on if it ois then grabs the audio and plays it
// keeps noise at true
// then "lights up the pad by changing its style to another color.
function one() {
    if(noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen"

}
function two() {
    if(noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato"

}
function three() {
    if(noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow"

}
function four() {
    if(noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue"

}
// changes all pads to default color
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}
// changes all colors to there lit up colors
function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

// for each pad when clicked the corresponding number is placed into an array
//then the check fuction is called to check if the player is correct
// the corresponding number function is called so the the pad will light up and make the noise
//if the player has not won the game then the color is cleared after 400 milliseconds
topLeft.addEventListener('click', (event) => {
if (on){

    playerOrder.push(1);
    console.log(playerOrder);
    check();
    one();
    if(!win){
        setTimeout(()=> {
            clearColor();
        }, 400);
    }
}
});

topRight.addEventListener('click', (event) => {
    if (on){

        playerOrder.push(2);
        console.log(playerOrder);

        check();
        two();
        if(!win){
            setTimeout(()=> {
                clearColor();
            }, 400);
        }
    }
});
bottomLeft.addEventListener('click', (event) => {
    if (on){
        console.log("reached");
        playerOrder.push(3);
        console.log(playerOrder);
        check();
        three();
        if(!win){
            setTimeout(()=> {
                clearColor();
            }, 400);
        }
    }
});
bottomRight.addEventListener('click', (event) => {
    if (on){
        console.log("reached");
        playerOrder.push(4);
        console.log(playerOrder);
        check();
        four();
        if(!win){
            setTimeout(()=> {
                clearColor();
            }, 400);
        }
    }
});

function check() {
    // checks if last button pushed by player is same as computer by comparing the last
    //number in the array of the computer order and the human sequence; if it is not then
    //good is set to false so we can innitiate what happens when a player is wrong
    if(playerOrder[playerOrder.length -1 ] !== order[playerOrder.length -1]) {
        good = false;
        console.log(" good to false player did not pick right #");
    }
    // checks if player has won the game
    if (playerOrder.length == 15 && good) {
        winGame();
    }
    //what happens when player has made a mistake
    //if in normal mode turn counter box will show "no" and all the lights will light up
    //then after 800  milliseconds turn counter will be reset to the turn the user is on
    // and the color will be reset to default as well as the players guess sequenceand the interval will
    //start again
    // in esseence giving the user another chance at the same stage

    if (!good){
        console.log("because not good this code runs");
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {

            turnCounter.innerHTML = turn;
            clearColor();
            //if in strict mode start over the play funtion is called in essence reseting the game
            if (strict){
                play();

                //otherwise start round over(i think)

            }else{
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn,800);




            }
        }, 800);
        noise = false;
    }
    //checks if player has pressed the right button and still on his way to winning

    if (turn == playerOrder.length && good && !win){
        console.log("player chose right");
        turn ++;
        playerOrder = [];
        compTurn = true;
        flash = 0;

        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn,  800);

    }





}
function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;

}






