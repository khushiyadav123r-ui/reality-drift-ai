const canvas = document.getElementById("cyberCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ---- PARTICLES ---- */
const particles = [];
const COUNT = 120;

for (let i = 0; i < COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2 + 0.5
  });
}

/* ---- GRID ---- */
function drawGrid() {
  ctx.strokeStyle = "rgba(0,255,200,0.03)";
  ctx.lineWidth = 1;

  const gap = 60;
  for (let x = 0; x < w; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  for (let y = 0; y < h; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

/* ---- ANIMATION LOOP ---- */
function animate() {
  ctx.clearRect(0, 0, w, h);

  drawGrid();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.fillStyle = "rgba(0,255,200,0.6)";
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  requestAnimationFrame(animate);
}

animate();

/* ---- GLITCH FLASH ---- */
setInterval(() => {
  ctx.fillStyle = "rgba(0,255,200,0.04)";
  ctx.fillRect(0, 0, w, h);
}, 4000);

