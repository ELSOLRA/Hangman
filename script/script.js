import { wordList } from './wordsList.js';



let wrongLetter = [];
let wrongGuessingCounter= 6;
let randomWord='';
let setRandomWord= function (listOfWords) {
 randomWord= listOfWords[ Math.floor(Math.random() * (listOfWords.length))]
 randomWord = randomWord.toUpperCase();
 randomWord=randomWord.split('');
}
setRandomWord(wordList);


let buttons = document.querySelectorAll('.keyboard__button');
let gameOver = false;
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(!gameOver) {
    handlGuess(button.innerHTML.toUpperCase());
    button.disabled = true;
    }
  })
 
})
    function handlGuess (guess) {
        if (randomWord.includes(guess) && wrongGuessingCounter > 0 ) {
            console.log(`${guess}`);
          } else if (!randomWord.includes(guess) && wrongGuessingCounter > 0){
            console.log(`${guess} - incorrect`);
            wrongLetter.push(guess);
            wrongGuessingCounter--;
            console.log(wrongGuessingCounter);
          } else {
            gameOver = true;
            disableAllButtons();
            }
    }
    
document.addEventListener('keydown', event => {
    if(!gameOver) {
    handlGuess(event.key.toUpperCase());
    }
})

function disableAllButtons() {
    buttons.forEach(button => {
      button.disabled = true;
    });
};





