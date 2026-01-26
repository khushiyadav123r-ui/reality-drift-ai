/* ================= CYBER BACKGROUND ================= */
const canvas = document.getElementById("cyberCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
for (let i = 0; i < 140; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5
  });
}

function drawGrid() {
  ctx.strokeStyle = "rgba(0,255,200,0.03)";
  for (let x = 0; x < canvas.width; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 70) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function animateBG() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.fillStyle = "rgba(0,255,200,0.6)";
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  requestAnimationFrame(animateBG);
}
animateBG();

/* ================= AI TERMINAL LOG ================= */
function addLog(text) {
  const log = document.getElementById("aiLog");
  if (!log) return;

  const line = document.createElement("div");
  line.textContent = "> " + text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

/* ================= MOUSE GLOW ================= */
document.addEventListener("mousemove", e => {
  const glow = document.getElementById("mouseGlow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ================= ANALYSIS HOOK ================= */
window.startAnalysisEffects = function(score) {
  addLog("Initializing AI engine...");
  addLog("Parsing linguistic signals...");
  addLog("Evaluating emotional bias...");
  addLog("Computing reality score...");

  if (score <= 3) {
    addLog("⚠ High manipulation detected!");
    document.body.classList.add("alert-mode");
  } else {
    document.body.classList.remove("alert-mode");
    addLog("Analysis stable. Content within safe bounds.");
  }
};
