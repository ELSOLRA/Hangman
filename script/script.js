import { wordList } from "./wordsList.js";



let buttons = document.querySelectorAll(".keyboard__button");
let gameOver = false;
let wrongLetter = [];
let correctLetter = [];
let wrongGuessingCounter = 6;
let randomWord = "";
let restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
  window.location.reload();
});
let greeting = document.getElementById("greeting");
greeting.innerHTML = "Welcome, to start the game - guess on a letter";
let placeHolder = document.getElementById("word-placeholder");
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
      document.getElementById("hearts").innerHTML =
        "&hearts; &hearts; &hearts; &hearts; &hearts;";
      break;
    case 4:
      document.getElementById("scaffold").style.display = "block";
      document.getElementById("hearts").innerHTML =
        "&hearts; &hearts; &hearts; &hearts;";
      break;
    case 3:
      document.getElementById("head").style.display = "block";
      document.getElementById("hearts").innerHTML =
        "&hearts; &hearts; &hearts;";
      break;
    case 2:
      document.getElementById("body").style.display = "block";
      document.getElementById("hearts").innerHTML = "&hearts; &hearts;";
      break;
    case 1:
      document.getElementById("arms").style.display = "block";
      document.getElementById("hearts").innerHTML = "&hearts;";
      break;
    case 0:
      document.getElementById("legs").style.display = "block";
      document.getElementById("hearts").innerHTML = " ";
      greeting.innerHTML = `You lost, the right word was: ${randomWord.join(
        ""
      )}`;
      restartButton.style.display = "block";
      greeting.style.display = "block";
      break;
  }
}

function isWordGuessed() {
  return randomWord.every((letter) => correctLetter.includes(letter)); // !!! to check if all letters in the randomWord are in the correctLetter array
}

function handlGuess(guess) {
  greeting.style.display = "none";
  if (randomWord.includes(guess) && !correctLetter.includes(guess)) {
    console.log(`${guess}`);
    correctLetter.push(guess);
    updatePlaceholder();
    if (isWordGuessed()) {
      greeting.innerHTML='You found the word!';
      greeting.style.display='block';
      restartButton.style.display = "block";
      gameOver = true;
      disableAllButtons();
    }
  } else if (!randomWord.includes(guess) && !wrongLetter.includes(guess)) {
    console.log(`${guess} - incorrect`);
    wrongLetter.push(guess);
    wrongGuessingCounter--;
    updateHangman();
    console.log(wrongGuessingCounter);

    if (wrongGuessingCounter === 0) {
      console.log("Game over - Six wrong guesses reached.");
      gameOver = true;
      disableAllButtons();
    }
  }
}

console.log(correctLetter);

document.addEventListener("keydown", (event) => {
  if (!gameOver) {
    handlGuess(event.key.toUpperCase());
  }
});

function handleKeyDown(event) {
  const pressedKey = event.key.toUpperCase();
  const clickedButton = Array.from(buttons).find(
    (button) => button.innerHTML.toUpperCase() === pressedKey
  );

  if (clickedButton && !clickedButton.disabled && !gameOver) {
    handlGuess(pressedKey);
    clickedButton.disabled = true;
  }
}

document.addEventListener("keydown", handleKeyDown);

function disableAllButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Win or loose, greeting take this sh out
