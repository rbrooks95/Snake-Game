//pixelCount is the pixels on horizontal or vertical axis of the game board (SQUARE).
const pixelCount = 40;
const squarePixCount = Math.pow(pixelCount, 2);

let foodAte = 0;
let totalDistanceTravelled = 0;

/// THE GAME BOARD:
const game = document.getElementById("game");

const gameBoard = () => {
  // Populate the [#game] div with small div's representing game pixels
  for (let i = 1; i <= squarePixCount; ++i) {
    game.innerHTML = `${game.innerHTML} <div class="game-pixel" id="pixel${i}"></div>`;
  }
};

// This variable always holds the updated array of game pixels created by gameBoard() :
const gamePixel = document.getElementsByClassName("game-pixel");

/// THE FOOD:
let foodPosition = 0;
const createFood = () => {
  // Remove previous food;
  gamePixel[foodPosition].classList.remove("food");

  // Create new food
  foodPosition = Math.random();
  foodPosition = Math.floor(foodPosition * squarePixCount);
  gamePixel[foodPosition].classList.add("food");
};

/// THE SNAKE:

// Direction codes (Keyboard key codes for arrow keys):
const leftDir = 37;
const upDir = 38;
const rightDir = 39;
const downDir = 40;

// Set snake direction initially to right
let snakeDirection = rightDir;

const directions = (changed) => {
  // Change the direction of the snake
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

// Move snake continously by calling this function repeatedly :
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

  // Kill snake if it bites itself:
  if (nextSnakeHeadPixel.classList.contains("snake-body")) {
    // Stop moving the snake
    clearInterval(moveSnakeByInterval);
    if (!alert(`Your score is ${foodAte} `)) window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snake-body");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snake-body");
  }, snakeLength);

  // Update total distance travelled
  //totalDistanceTravelled++;
  // Update in UI:
  //document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

  if (snakeHead == foodPosition) {
    // Update total food ate
    foodAte++;
    // Update in UI:
    document.getElementById("points-earned").innerHTML = foodAte;

    // Increase Snake length:
    snakeLength = snakeLength + 100;
    createFood();
  }
};

/// CALL THE FOLLOWING FUNCTIONS TO RUN THE GAME:

// Create game board pixels:
gameBoard();

// Create initial food:
createFood();

// Move snake:
var moveSnakeByInterval = setInterval(snakeMovement, 80);

// Call change direction function on keyboard key-down event:
addEventListener("keydown", (e) => directions(e.keyCode));

// // ON SCREEN CONTROLLERS:
// const leftButton = document.getElementById("leftButton");
// const rightButton = document.getElementById("rightButton");
// const upButton = document.getElementById("upButton");
// const downButton = document.getElementById("downButton");

// leftButton.onclick = () => snakeDirection(leftDir);
// rightButton.onclick = () => snakeDirection(rightDir);
// upButton.onclick = () => snakeDirection(upDir);
// downButton.onclick = () => snakeDirection(downDir);
