//const head = document.createElement("div");
const pixelCount = 40;
// offers the exponent of the pixel
const squarePixCount = Math.pow(pixelCount, 2);
//let speed = 1;
let foodAte = 0;

const game = document.querySelector("#game");

function gameBoard() {
  for (let i = 1; i <= squarePixCount; ++i) {
    game.innerHTML = `${game.innerHTML} <div class="game-pixel" id="pixel${i}"></div>`;
  }
}
// the data of the updated array of pixels created
const gamePixel = document.querySelector(".game-pixel");

// making the food
let foodPosition = 0;
function createfood() {
  gamePixel[foodPosition].classList.remove("food");

  foodPosition = Math.random();
  // .floor returns the largest integer less than or equal to a given number.
  foodPosition = Math.floor(foodPosition * squarePixCount);
  gamePixel[foodPosition].classList.add("food");
}

// snake head
// for me personally i looked up the key codes for the arrow keys
const leftDir = 37;
const rightDir = 39;
const upDir = 38;
const downDir = 40;

let snakeDirection = rightDir;
// snake changing directions
function directions(changed) {
  if (changed == snakeDirection) return;

  if (changed == leftDir && snakeDirection != rightDir) {
    snakeDirection = changed;
  } else if (changed == upDir && snakeDirection != downDir) {
    snakeDirection = changed;
  } else if (changed == rightDir && snakeDirection != leftDir) {
    snakeCurrentDirection = changed;
  } else if (changed == downDir && snakeCurrentDirection != UP_DIR) {
    snakeDirection = changed;
  }
}

let snakeLength = 1000;

let snakeHead = pixelCount / 2;

function snakeMovement() {
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
      SnakeHead = SnakeHead - pixel;
      const SnakeHeadLastUp = snakeHead < 0;
      if (SnakeHeadLastUp) {
        snakeHead = snakeHead + squarePixCount;
      }
      break;
    case RIGHT_DIR:
      ++currentSnakeHeadPosition;
      const snakeHeadLastRight = snakeHead % pixelCount == 0;
      if (snakeHeadLastRight) {
        snakeHead = snakeHead - pixelCount;
      }
      break;
    case downDir:
      snakeHead = snakeHead + pixelCount;
      const snakeHeadLastDown = currentSnakeHeadPosition > squarePixCount - 1;
      if (snakeHeadLastDown) {
        snakeHead = snakeHead - squarePixCount;
      }
      break;
    default:
      break;
  }
  let nextSnakeHeadPix = gamePixel[snakeHead];

  // snake would die if eats itself
  if (nextSnakeHeadPix.classList.contains("snake-body")) {
    clearInterval(moveSnakeInterval);
    if (!alert(`You score is ${foodAte}`)) window.location.reload();
  }

  nextSnakeHeadPix.classList.add("snake-body");

  setTimeout(() => {
    nextSnakeHeadPix.classList.remove("snake-body");
  }, snakeLength);

  if (snakeHead == foodPosition) {
    foodAte++;
    document.getElementById("pointsEarned").innerHTML = foodAte;

    // increasing the snake length
    snakeLength += 100;

    createfood();
  }
}
gameBoard();
createfood();

let moveSnakeByInterval = setInterval(snakeMovement, 80);

addEventListener("keydown", (e) => snakeDirection(e.keyCode));
