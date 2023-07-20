//global variables
//equations 
let questionAmount=0;
let equationsArray = [];
//Gamepage
let firstnumer =0;
let secondnumber =0;
let equationobject ={};
let wrongFormat =[];
let playerGuessArray = [];
//scroll
let valueY = 0;
//score
let timer;
let timedPlayed = 0;
let besttime =0;
let penaltytime=0;
let finaltime=0;
let finaltimeDisplay= "0.0s";
//best score
let bestScoreArray =  [];
//score page
const finalTimeEl = document.querySelector('.Final-Time');
const bestTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playagainbutn = document.querySelector('.play-button');
//const bestScoreEl =

//First page
const startform = document.getElementById("start-form");
const radioContainer = document.querySelectorAll(".Radio-container");
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
const gamePage= document.getElementById("game-page");
const scorePage= document.getElementById("score-page");
const splashPage = document.getElementById("splash-page");
const countDownPage = document.getElementById("countdown-page");
startform.addEventListener('click',()=>{
    radioContainer.forEach((radioEL)=>{
        console.log(radioEL);
        radioEL.classList.remove("selected-label");
        if(radioEL.children[1].checked)
        {
            radioEL.classList.add("selected-label");
        }
    });
});
//get the value from selected radio button
function getRadioValue()
{
    let radioValue;
    radioInputs.forEach((radioInput)=>{
       if(radioInput.checked){
            radioValue = radioInput.value;
       }
        //alert(radioInput.value);
    });
    return (radioValue);
}

function selectQuestionAmount(e){
    e.preventDefault();
    questionAmount= getRadioValue();
    //alert(questionAmount);
    console.log("Question amount value =",questionAmount);
    if(questionAmount)
    {
        showCountDown();
    }
}
//Event listners
startform.addEventListener('submit',selectQuestionAmount);
//countdown
const countdown = document.querySelector(".countdown");
function showCountDown()
{
    countDownPage.hidden = false;
    splashPage.hidden = true;
    countDownStart();
    populateGamePage();
    setTimeout(showGamePage,4000);

}
//display 1 2 3 and go
function countDownStart()
{
    countdown.textContent = '3';
    setTimeout(()=>{
        countdown.textContent = '2';
    },1000);
    setTimeout(()=>{
        countdown.textContent = '1';
    },2000);
    setTimeout(()=>{
        countdown.textContent = 'GO';
    },3000);
}
//return the random number upto maxx
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max))
}

//create correct or incorrect random equations
// Randomly choose the operator
const operators = ["X", "+", "-", "/"];
const operator = operators[getRandomInt(operators.length)];
function createequations() {
    equationsArray = []; // Clear the array to start fresh
    const correctEquations = getRandomInt(questionAmount - 1) + 1; // Random number of correct equations (at least 1)
    const wrongEquations = questionAmount - correctEquations; // Remaining equations will be incorrect
  
    let count = 0;
    let correctCount = 0;
  
    while (count < questionAmount) {
      if (correctCount < correctEquations) {
        // Generate a correct equation
        firstnumer = getRandomInt(20);
        secondnumber = getRandomInt(20);
  
        // Randomly choose the operator
        const operators = ["X", "+", "-", "/"];
        const operator = operators[getRandomInt(operators.length)];
  
        let equation;
        let evaluated;
  
        // Generate the equation based on the randomly selected operator
        switch (operator) {
          case "X":
            equation = `${firstnumer} X ${secondnumber}`;
            evaluated = firstnumer * secondnumber;
            break;
          case "+":
            equation = `${firstnumer} + ${secondnumber}`;
            evaluated = firstnumer + secondnumber;
            break;
          case "-":
            equation = `${firstnumer} - ${secondnumber}`;
            evaluated = firstnumer - secondnumber;
            break;
          case "/":
            // Ensure that the secondnumber is not 0 to avoid division by 0
            secondnumber = getRandomInt(19) + 1;
            equation = `${firstnumer} / ${secondnumber}`;
            evaluated = firstnumer / secondnumber;
            break;
          default:
            break;
        }
  
        equationobject = { value: `${equation} = ${evaluated}`, evaluated: 'true' };
        equationsArray.push(equationobject);
        count++;
        correctCount++;
      } else {
        // Generate an incorrect equation
        firstnumer = getRandomInt(20);
        secondnumber = getRandomInt(20);
  
        // Randomly choose a different operator than the correct equation
        let incorrectOperator = "";
        do {
          incorrectOperator = operators[getRandomInt(operators.length)];
        } while (incorrectOperator === operator);
  
        let equation;
        let evaluated;
  
        // Generate the incorrect equation based on the randomly selected operator
        switch (incorrectOperator) {
          case "X":
            equation = `${firstnumer} X ${secondnumber}`;
            evaluated = firstnumer * secondnumber + getRandomInt(10) - 5;
            break;
          case "+":
            equation = `${firstnumer} + ${secondnumber}`;
            evaluated = firstnumer + secondnumber + getRandomInt(10) - 5;
            break;
          case "-":
            equation = `${firstnumer} - ${secondnumber}`;
            evaluated = firstnumer - secondnumber + getRandomInt(10) - 5;
            break;
          case "/":
            // Ensure that the secondnumber is not 0 to avoid division by 0
            secondnumber = getRandomInt(19) + 1;
            equation = `${firstnumer} / ${secondnumber}`;
            evaluated = firstnumer / secondnumber + (getRandomInt(10) - 5) / 10;
            break;
          default:
            break;
        }
  
        equationobject = { value: `${equation} = ${evaluated}`, evaluated: 'false' };
        equationsArray.push(equationobject);
        count++;
      }
    }
  
    shuffleArray(equationsArray);
    console.log("Equations =", equationsArray);
  }
  
  
  
function showGamePage(){
    gamePage.hidden = false;
    countDownPage.hidden = true;
}
const itemContainer =document.querySelector(".item-container")
function equationsTODOM()
{
   equationsArray.forEach((equation)=>{
    const item = document.createElement("div");
    item.classList.add("item");
    //Equation Text
    const equationText = document.createElement("h1");
    equationText.textContent = equation.value;
    //append
    item.appendChild(equationText);
    itemContainer.appendChild(item);

   });
}
//dynamically adding correct or incorrect equations
function populateGamePage()
{
    //reset the Dom and set the blank space above
    itemContainer.textContent = '';

    //spacer
    const topSpacer = document.createElement("div");
    topSpacer.classList.add("height-280");

    //selcted item
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selected-item");
    //append
    itemContainer.append(topSpacer,selectedItem);
    createequations();
    equationsTODOM();
    const bottomSpacer = document.createElement("div");
    bottomSpacer.classList.add("height-280");
    itemContainer.append(bottomSpacer);

}
function select(guess){
 console.log("guess array:",playerGuessArray);
 valueY += 80;
 itemContainer.scroll(0,valueY);

 return guess ? playerGuessArray.push('true') : playerGuessArray.push('false');
}
//stop timer, process result
function checktime()
{
    //console.log(timedPlayed);
    if(playerGuessArray.length == questionAmount){
        console.log("guess array=",playerGuessArray)
        clearInterval(timer);
        //check for wrong guesses, add penalty time
        equationsArray.forEach((equation,index)=>{
            if(equation.evaluated == playerGuessArray[index])
            {
                //no penalty
            }
            else{
                penaltytime += 0.5;
            }
        });
        finaltime = timedPlayed +penaltytime;
        console.log("Time :",timedPlayed);
        console.log("Penalty:",penaltytime);
        console.log("FinalTime :",finaltime);
        scoreTODOM();


    }
}

//add a timer of a second to TimePlayed 
function addTime()
{
    timedPlayed +=0.1;
    checktime();

}
//start the timer when the game page is clicked
function startTimer()
{
    timedPlayed = 0;
    penaltytime = 0;
    finaltime = 0;
    timer = setInterval(addTime,100);
    gamePage.removeEventListener('click',startTimer);


}
gamePage.addEventListener('click',startTimer);
function showScorePage()
{
    setTimeout(()=>{
        playagainbutn.hidden = false;
    });
    gamePage.hidden = true;
    scorePage.hidden= false;
}
function scoreTODOM()
{
    finaltimeDisplay = finaltime.toFixed(1);
    besttime = timedPlayed.toFixed(1);
    penaltytime= penaltytime.toFixed(1);
    bestTimeEl.textContent = `Base Time: ${besttime}s`;
    penaltyTimeEl.textContent = `Penalty: ${penaltytime}s`;
    finalTimeEl.textContent = `Final Time: ${finaltimeDisplay}s`;
    updatetheBestscore();
    itemContainer.scrollTo({top:0,behavior:'instant'});
    showScorePage();

}
//reset the game
function playagain()
{
    gamePage.addEventListener('click',startTimer);
    scorePage.hidden = true;
    splashPage.hidden = false;
    equationsArray = [];
    playerGuessArray = [];
    valueY = 0;
    playagainbutn.hidden = true;

}

function getsavebestscore()
{
    if(localStorage.getItem('bestScore'))
    {
        bestScoreArray = JSON.parse(localStorage.bestScore);

    }
    else
    {
        bestScoreArray = [
            { questions: 10 , bestScores: "0.0s"},
            { questions: 25 , bestScores: "0.0s"},
            { questions: 50 , bestScores: "0.0s"},
            { questions:  100 , bestScores: "0.0s"},
        ];
        localStorage.setItem('bestScore',JSON.stringify(bestScoreArray));

    }
    bestScoreToDom();
}
getsavebestscore();
function bestScoreToDom()
{
    bestScores.forEach((bestScores,index)=>{
        const bestScoreEl = bestScores;
        bestScoreEl.textContent = `${bestScoreArray[index].bestScores}`;
    });
}
function updatetheBestscore(){
    bestScoreArray.forEach((score, index) => {
        if (questionAmount == score.questions) {
          const savebestscore = Number(score.bestScores.replace('s', ''));
          if (savebestscore === 0 || savebestscore > finaltime) {
            bestScoreArray[index].bestScores = finaltimeDisplay;
          }
        }
      });
      bestScoreToDom();
      localStorage.setItem('bestScore', JSON.stringify(bestScoreArray));
    }

