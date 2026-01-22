const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

// --- MAPA -----------------------------------------------------

const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

const mapW = map[0].length;
const mapH = map.length;

// --- HRÁČ -----------------------------------------------------

let px = 3.5;
let py = 3.5;
let pa = 0;

const fov = Math.PI / 3;
const moveSpeed = 0.06;
const rotSpeed = 0.04;
const mouseSensitivity = 0.0025;

// --- OVLÁDÁNÍ -------------------------------------------------

const keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Myš – otáčení
document.addEventListener("mousemove", e => {
  if (document.pointerLockElement === canvas) {
    pa += e.movementX * mouseSensitivity;
  }
});

// Kliknutí pro pointer lock
canvas.addEventListener("click", () => {
  canvas.requestPointerLock();
});

// --- FUNKCE ---------------------------------------------------

function isWall(x, y) {
  const mx = Math.floor(x);
  const my = Math.floor(y);
  if (mx < 0 || my < 0 || mx >= mapW || my >= mapH) return true;
  return map[my][mx] === 1;
}

function tryMove(nx, ny) {
  if (!isWall(nx, py)) px = nx;
  if (!isWall(px, ny)) py = ny;
}

function update() {
  // Rotace šipkami
  if (keys["arrowleft"])  pa -= rotSpeed;
  if (keys["arrowright"]) pa += rotSpeed;

  // Vektory pohybu
  let dx = Math.cos(pa) * moveSpeed;
  let dy = Math.sin(pa) * moveSpeed;

  let sdx = Math.cos(pa - Math.PI