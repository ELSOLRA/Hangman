import { wordList } from "./wordsList.js";

let buttons = document.querySelectorAll(".keyboard__button");
let gameOver = false;
let wrongLetter = [];
let correctLetter = [];
let wrongGuessingCounter = 6;
let audioWrongAnswer = new Audio("./sounds/wronganswer7.mp3");
let audioVictory = new Audio("./sounds/victory1.mp3");
let audioGameOver = new Audio("./sounds/gameover1.mp3");
let audioCorrect = new Audio("./sounds/correct3.mp3");

function playAudio(audio) {
  audio.play();
}
function playAudioWithDelay(audio, delay) {
  setTimeout(() => {
    audio.play();
  }, delay);
}
let randomWord = "";
let restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
  window.location.reload();
});
let greeting = document.getElementById("greeting");
let placeHolder = document.getElementById("word-placeholder");
let setRandomWord = function (listOfWords) {
  randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
  randomWord = randomWord.toUpperCase();
  randomWord = randomWord.split("");
};
setRandomWord(wordList);

function showGreetingArea(str){
  greeting.style.display='block';
    greeting.innerHTML=str;
};
showGreetingArea("Welcome, guess a letter to start the game ");


buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameOver) {
      handleGuess(button.innerHTML.toUpperCase());
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

function updateFeatures() {
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
      break;
  }
}

function isWordGuessed() {
  return randomWord.every((letter) => correctLetter.includes(letter)); // !!! to check if all letters in the randomWord are in the correctLetter array
}

function handleGuess(guess) {
  greeting.style.display = "none";
  if (randomWord.includes(guess) && !correctLetter.includes(guess)) {
    console.log(`${guess}`);

    correctLetter.push(guess);

    // Add the 'correct-letter' class to the button
    let clickedButton = Array.from(buttons).find(
      (button) => button.innerHTML.toUpperCase() === guess
    );
    if (clickedButton) {
      clickedButton.classList.add("correct-letter"); //samma sak som class ="" i htlm
      clickedButton.disabled = true;
 
    }
    playAudio(audioCorrect);

    setTimeout(() => {
      updatePlaceholder();
    }, 300);

    if (isWordGuessed()) {
       showGreetingArea("You found the word!");
      restartButton.style.display = "block";
      gameOver = true;
      disableAllButtons();
      playAudioWithDelay(audioVictory, 400);
    }
  } else if (!randomWord.includes(guess) && !wrongLetter.includes(guess)) {
    console.log(`${guess} - incorrect`);
    wrongLetter.push(guess);
    wrongGuessingCounter--;
    updateFeatures();
    console.log(wrongGuessingCounter);
    playAudio(audioWrongAnswer);

    if (wrongGuessingCounter === 0) {
      gameIsOver();
    }
  }
}

console.log(correctLetter);

document.addEventListener("keydown", (event) => {
  if (!gameOver) {
    handleGuess(event.key.toUpperCase());
  }
});

function handleKeyDown(event) {
  const pressedKey = event.key.toUpperCase();
  const clickedButton = Array.from(buttons).find(
    (button) => button.innerHTML.toUpperCase() === pressedKey
  );

  if (clickedButton && !clickedButton.disabled && !gameOver) {
    handleGuess(pressedKey);
    clickedButton.disabled = true;
  }
}

document.addEventListener("keydown", handleKeyDown);

function disableAllButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function gameIsOver () {
  console.log("Game over - Six wrong guesses reached.");
  gameOver = true;
  disableAllButtons();
  showGreetingArea(`You lost, the right word was: ${randomWord.join(
    ""
  )}`);
  restartButton.style.display = "block";
  playAudioWithDelay(audioGameOver, 400);

}