const head = document.createElement("div");
const pixelCount = 40;
// offers the exponent of the pixel
const squarePixCount = Math.pow(pixelCount, 2);
let speed = 1;
let foodAte = 0;

const game = document.querySelector("#game");
function createFood() {
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

// function snakeSpeed() {
//   console.log("faster");
//   setInterval(snakeSpeed, 1000 / speed);
// }

// snakeSpeed();
