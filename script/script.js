/*import{wordList} from './wordsList.js';*/
const wordList = [
    "Apple","Banana","Carrot","Dog","Elephant","Frog","Guitar","Hat","Cream","Jellyfish","Kangaroo","Lemon","Monkey", "Penguin", "Queen", "Rainbow","Sunflower","Turtle","Umbrella","Violin","Watermelon","Xylophone","Yogurt","Zebra",
   ];
let randomWord='';
let getRandomWord= function () {
randomWord= wordList[ Math.floor(Math.random() * (wordList.length))]
 randomWord=randomWord.split('');
return randomWord;
}
getRandomWord(wordList);
console.log(randomWord);
let wrongLetter = [];
let wrongGuessingCounter= 6;
let buttons = document.querySelectorAll('.keyboard__button');
let buttonValue;
buttons.forEach(button => {
    buttonValue=button.innerHTML;  
});


