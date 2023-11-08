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
buttons.forEach(button => {
  button.addEventListener('click', () => {
    let buttonLetter = button.innerHTML;
    console.log(`${buttonLetter}`);
    if (randomWord.includes(buttonLetter)) {
        console.log(`${buttonLetter}`);
      } else {
        console.log(`${buttonLetter} - incorrect`);
        wrongLetter.push(buttonLetter);
        wrongGuessingCounter--;
        console.log(wrongGuessingCounter);
      }
    if (wrongGuessingCounter === 0) {
        console.log('Game over!')
      }
  });
});







