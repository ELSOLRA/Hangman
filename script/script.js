import { wordList } from './wordsList.js';

console.log(wordList);
let randomWord='';
let getRandomWord= function () {
randomWord= wordList[ Math.floor(Math.random() * (wordList.length))]
 randomWord = randomWord.toUpperCase();
 randomWord=randomWord.split('');
return randomWord;
}
getRandomWord();
console.log(randomWord);

let wrongLetter = [];
let wrongGuessingCounter= 6;

let buttons = document.querySelectorAll('.keyboard__button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    let buttonValue = button.innerHTML;
    console.log(`${buttonValue}`);
    if (randomWord.includes(buttonValue)) {
        console.log(`${buttonValue}`);
      } else {
        console.log(`${buttonValue} - incorrect`);
        wrongLetter.push(buttonValue);
        wrongGuessingCounter--;
        console.log(wrongGuessingCounter);
      }
    if (wrongGuessingCounter === 0) {
        console.log('Game over!')
      }
  });
});


