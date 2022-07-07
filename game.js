//const head = document.createElement("div");
const pixelCount = 40;
// offers the exponent of the pixel
const squarePixCount = Math.pow(pixelCount, 2);
//let speed = 1;
let foodAte = 0;

const game = document.querySelector("#game");

function gameBoard() {
  for (let i = 1; i <= squarePixCount; i++) {
    game.innerHTML = `${game.innerHTML} <div class="game-pixel" id="pixel${i}"></div>`;
  }
}
// the data of the updated array of pixels created
const gamePixel = document.querySelector(".game-pixel");

// making the food
let foodPosition = 0;
function createFood() {
  gamePixel[foodPosition].classList.remove("food");

  foodPosition = Math.random();
  // .floor returns the largest integer less than or equal to a given number.
  foodPosition = Math.floor(foodPosition * pixelCount);
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
  let nextSnakeHeadPix = game[snakeHead];

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

    createFood();
  }
}
gameBoard();
createFood();

let moveSnakeByInterval = setInterval(snakeMovement, 80);

addEventListener("keydown", (e) => snakeDirection(e.keyCode));

const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

/// THE GAME BOARD:
const gameContainer = document.getElementById("gameContainer");

const createGameBoardPixels = () => {
  // Populate the [#gameContainer] div with small div's representing game pixels
  for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};

// This variable always holds the updated array of game pixels created by createGameBoardPixels() :
const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

/// THE FOOD:
let currentFoodPostion = 0;
const createFood = () => {
  // Remove previous food;
  gameBoardPixels[currentFoodPostion].classList.remove("food");

  // Create new food
  currentFoodPostion = Math.random();
  currentFoodPostion = Math.floor(
    currentFoodPostion * SQUARE_OF_GAME_PIXEL_COUNT
  );
  gameBoardPixels[currentFoodPostion].classList.add("food");
};

/// THE SNAKE:

// Direction codes (Keyboard key codes for arrow keys):
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Set snake direction initially to right
let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = (newDirectionCode) => {
  // Change the direction of the snake
  if (newDirectionCode == snakeCurrentDirection) return;

  if (newDirectionCode == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == UP_DIR && snakeCurrentDirection != DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (
    newDirectionCode == RIGHT_DIR &&
    snakeCurrentDirection != LEFT_DIR
  ) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection != UP_DIR) {
    snakeCurrentDirection = newDirectionCode;
  }
};

// Let the starting position of the snake be at the middle of game board
let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;

// Initial snake length
let snakeLength = 1000;

// Move snake continously by calling this function repeatedly :
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == GAME_PIXEL_COUNT - 1 ||
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      }
      break;
    case UP_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsUp =
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    case RIGHT_DIR:
      ++currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsRight =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      }
      break;
    case DOWN_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsDown =
        currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
      if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    default:
      break;
  }

  let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

  // Kill snake if it bites itself:
  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    // Stop moving the snake
    clearInterval(moveSnakeInterval);
    if (
      !alert(
        `You have ate ${totalFoodAte} food by travelling ${totalDistanceTravelled} blocks.`
      )
    )
      window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);

  // Update total distance travelled
  totalDistanceTravelled++;
  // Update in UI:
  document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

  if (currentSnakeHeadPosition == currentFoodPostion) {
    // Update total food ate
    totalFoodAte++;
    // Update in UI:
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;

    // Increase Snake length:
    snakeLength += 100;
    createFood();
  }
};

/// CALL THE FOLLOWING FUNCTIONS TO RUN THE GAME:

// Create game board pixels:
createGameBoardPixels();

// Create initial food:
createFood();

// Move snake:
let moveSnakeInterval = setInterval(moveSnake, 80);

// Call change direction function on keyboard key-down event:
addEventListener("keydown", (e) => changeDirection(e.keyCode));
