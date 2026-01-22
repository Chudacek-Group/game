const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Myš – otáčení
document.addEventListener("mousemove", e => {
  if (document.pointerLockElement === canvas) {
    pa += e.movementX * 0.0025; // citlivost
  }
});
function update() {
  // Rotace šipkami
  if (keys["arrowleft"])  pa -= rotSpeed;
  if (keys["arrowright"]) pa += rotSpeed;

  // Pohyb dopředu/dozadu
  let dx = Math.cos(pa) * moveSpeed;
  let dy = Math.sin(pa) * moveSpeed;

  // W = dopředu
  if (keys["w"]) {
    if (!isWall(px + dx, py)) px += dx;
    if (!isWall(px, py + dy)) py += dy;
  }

  // S = dozadu
  if (keys["s"]) {
    if (!isWall(px - dx, py)) px -= dx;
    if (!isWall(px, py - dy)) py -= dy;
  }

  // A = strafe doleva
  let sdx = Math.cos(pa - Math.PI/2) * moveSpeed;
  let sdy = Math.sin(pa - Math.PI/2) * moveSpeed;

  if (keys["a"]) {
    if (!isWall(px + sdx, py)) px += sdx;
    if (!isWall(px, py + sdy)) py += sdy;
  }

  // D = strafe doprava
  if (keys["d"]) {
    if (!isWall(px - sdx, py)) px -= sdx;
    if (!isWall(px, py - sdy)) py -= sdy;
  }

  // Šipky nahoru/dolů stále fungují
  if (keys["arrowup"]) {
    if (!isWall(px + dx, py)) px += dx;
    if (!isWall(px, py + dy)) py += dy;
  }
  if (keys["arrowdown"]) {
    if (!isWall(px - dx, py)) px -= dx;
    if (!isWall(px, py - dy)) py -= dy;
  }
}
