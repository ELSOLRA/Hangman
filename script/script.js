import { wordList } from "./wordsList.js";

let wrongLetter = [];
let correctLetter = [];
let wrongGuessingCounter = 6;
let randomWord = "";
let placeHolder = document.getElementById("word-placeholder");
let buttons = document.querySelectorAll(".keyboard__button");
let gameOver = false;

let setRandomWord = function (listOfWords) {
  randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
  randomWord = randomWord.toUpperCase();
  randomWord = randomWord.split("");
};
setRandomWord(wordList);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameOver) {
      handlGuess(button.innerHTML.toUpperCase());
      button.disabled = true;
    }
  });
});
console.log(randomWord);
function updatePlaceholder() {
  let placeholderText = "";
  for (let i = 0; i < randomWord.length; i++) {
    if (correctLetter.includes(randomWord[i])) {
      placeholderText += randomWord[i];
    } else {
      placeholderText += "_";
    }
  }
  placeHolder.innerHTML = placeholderText;
}
updatePlaceholder();

function updateHangman() {
  switch (wrongGuessingCounter) {
    case 5:
      document.getElementById("ground").style.display = "block";
      break;
    case 4:
      document.getElementById("scaffold").style.display = "block";
      break;
    case 3:
      document.getElementById("head").style.display = "block";
      break;
    case 2:
      document.getElementById("body").style.display = "block";
      break;
    case 1:
      document.getElementById("arms").style.display = "block";
      break;
    case 0:
      document.getElementById("legs").style.display = "block";
      break;
  }
}

function handlGuess(guess) {
  if (randomWord.includes(guess) && !correctLetter.includes(guess)) {
    console.log(`${guess}`);
    correctLetter.push(guess);
    updatePlaceholder();
  } else if (!randomWord.includes(guess) && !wrongLetter.includes(guess)) {
    console.log(`${guess} - incorrect`);
    wrongLetter.push(guess);
    wrongGuessingCounter--;
    document.getElementById("guess-left").innerText = wrongGuessingCounter;
    updateHangman();
    console.log(wrongGuessingCounter);

    if (wrongGuessingCounter === 0) {
      console.log("Game over - Six wrong guesses reached.");
      gameOver = true;
      disableAllButtons();
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameOver) {
      handlGuess(button.innerHTML.toUpperCase());
      button.disabled = true;
      hideGreeting();
    }
  });
});

console.log(correctLetter);

document.addEventListener("keydown", (event) => {
  //funktionen kommer fungera med "musklick" och "tagebordsklick" den reagerar på virutella tagentbordet
  if (!gameOver) {
    let pressedKey = event.key.toUpperCase(); //Variabeln får värdet på den tangent som spelaren tryckte på. Event key tar värdet på bokstaven i tagentet. toUpperCase(); method för att omvandla all input för bulletproof
    handlGuess(pressedKey); //anropar
    hideGreeting(); //anrop
  }
});

let hideGreeting = () => {
  document.getElementById("greeting").style.display = "none"; //rad 100 tar bort h2
};

function disableAllButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Win or loose, greeting take this sh out
