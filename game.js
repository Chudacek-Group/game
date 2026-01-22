const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let paddleHeight = 80;
let paddleWidth = 10;

let leftPaddle = { x: 20, y: canvas.height / 2 - paddleHeight / 2 };
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - paddleHeight / 2 };

let ball = { x: canvas.width / 2, y: canvas.height / 2, size: 10, dx: 4, dy: 4 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePaddles() {
  if (keys["w"]) leftPaddle.y -= 5;
  if (keys["s"]) leftPaddle.y += 5;
  if (keys["ArrowUp"]) rightPaddle.y -= 5;
  if (keys["ArrowDown"]) rightPaddle.y += 5;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y <= 0 || ball.y + ball.size >= canvas.height) ball.dy *= -1;

  if (
    ball.x <= leftPaddle.x + paddleWidth &&
    ball.y + ball.size >= leftPaddle.y &&
    ball.y <= leftPaddle.y + paddleHeight
  ) ball.dx *= -1;

  if (
    ball.x + ball.size >= rightPaddle.x &&
    ball.y + ball.size >= rightPaddle.y &&
    ball.y <= rightPaddle.y + paddleHeight
  ) ball.dx *= -1;

  if (ball.x < 0 || ball.x > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
}

function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
