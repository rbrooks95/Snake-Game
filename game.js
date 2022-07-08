const pixelCount = 40;
// offers the exponent of the pixel
const squarePixCount = Math.pow(pixelCount, 2);

let foodAte = 0;
let highScore = document.querySelector("#top-score");

const game = document.getElementById("game");

const gameBoard = () => {
  for (let i = 1; i <= squarePixCount; ++i) {
    game.innerHTML = `${game.innerHTML} <div class="game-pixel" id="pixel${i}"></div>`;
  }
};
// the data of the updated array of pixels created

const gamePixel = document.getElementsByClassName("game-pixel");

// making the food
let foodPosition = 0;
const createFood = () => {
  gamePixel[foodPosition].classList.remove("food");

  // Create new food
  foodPosition = Math.random();
  // .floor returns the largest integer less than or equal to a given number.

  foodPosition = Math.floor(foodPosition * squarePixCount);
  gamePixel[foodPosition].classList.add("food");
};

// snake head

// for me personally i looked up the key codes for the arrow keys
const leftDir = 37;
const upDir = 38;
const rightDir = 39;
const downDir = 40;

// Set snake direction initially to right
let snakeDirection = rightDir;

const directions = (changed) => {
  // snake changing directions
  if (changed == snakeDirection) return;

  if (changed == leftDir && snakeDirection != rightDir) {
    snakeDirection = changed;
  } else if (changed == upDir && snakeDirection != downDir) {
    snakeDirection = changed;
  } else if (changed == rightDir && snakeDirection != leftDir) {
    snakeDirection = changed;
  } else if (changed == downDir && snakeDirection != upDir) {
    snakeDirection = changed;
  }
};

// Let the starting position of the snake be at the middle of game board
let snakeHead = squarePixCount / 2;

// Initial snake length
let snakeLength = 100;

const snakeMovement = () => {
  switch (snakeDirection) {
    case leftDir:
      --snakeHead;
      const snakeHeadLastPixelLeft =
        snakeHead % pixelCount == pixelCount - 1 || snakeHead < 0;
      if (snakeHeadLastPixelLeft) {
        snakeHead = snakeHead + pixelCount;
      }
      break;
    case upDir:
      snakeHead = snakeHead - pixelCount;
      const SnakeHeadLastUp = snakeHead < 0;
      if (SnakeHeadLastUp) {
        snakeHead = snakeHead + squarePixCount;
      }
      break;
    case rightDir:
      ++snakeHead;
      const snakeHeadLastRight = snakeHead % pixelCount == 0;
      if (snakeHeadLastRight) {
        snakeHead = snakeHead - pixelCount;
      }
      break;
    case downDir:
      snakeHead = snakeHead + pixelCount;
      const snakeHeadLastDown = snakeHead > squarePixCount - 1;
      if (snakeHeadLastDown) {
        snakeHead = snakeHead - squarePixCount;
      }
      break;
    default:
      break;
  }

  let nextSnakeHeadPixel = gamePixel[snakeHead];

  // snake would die if eats itself
  if (nextSnakeHeadPixel.classList.contains("snake-body")) {
    clearInterval(moveSnakeByInterval);
    if (!alert(`Your score is ${foodAte} `)) window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snake-body");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snake-body");
  }, snakeLength);

  if (snakeHead == foodPosition) {
    // Update total food ate
    foodAte++;
    // Update score
    document.getElementById("points-earned").innerHTML = foodAte;
    if (foodAte > highScore) {
      highScore.innerHTML = foodAte;
    }

    // Increase Snake length:
    snakeLength = snakeLength + 100;
    createFood();
  }
};

// Create game board pixels:
gameBoard();

// Create initial food:
createFood();

// Move snake:
var moveSnakeByInterval = setInterval(snakeMovement, 80);

// Call change direction function on keyboard key-down event:
addEventListener("keydown", (e) => directions(e.keyCode));
