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


// Lägga båda eventlisteners i en function? 
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameOver) {
      handlGuess(button.innerHTML.toUpperCase());
      button.disabled = true;
    }
  });
});


document.addEventListener("keydown", (event) => {
  if (!gameOver) {
    handlGuess(event.key.toUpperCase());

}
});


function handlGuess(guess) {
  if (randomWord.includes(guess) && !correctLetter.includes(guess)) {
    console.log(`${guess}`);
    correctLetter.push(guess);
    updatePlaceholder();
    if (isWordGuessed()) {
      console.log("Congratulations! You guessed the word!");
      gameOver = true;
      disableAllButtons();
    }
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

/*-fortfarande problem med att det virituella inte uppdateras per tangentbrodstryckning.
 -kan fortsätta trycka trots rätt svar. spelet ska avslutas och det ska inte gå att fortsätta gissa. lägga till ett till statement i placeholder(if i=randomword.length) {stanna spelet}

-byta text på guessings left= hur nice hade det inte varit om räknaren istället viasade hjärtan som räknade ner?
*/
