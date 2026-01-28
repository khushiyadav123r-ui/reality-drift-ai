/* ===============================
   CYBER 3D CARD TILT EFFECT
================================ */

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 12) * -1;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


/* ===============================
   ANALYZE BUTTON SCAN EFFECT
================================ */

const analyzeBtn = document.querySelector("button");

if (analyzeBtn) {
  analyzeBtn.addEventListener("click", () => {
    const scan = document.getElementById("scanOverlay");
    if (!scan) return;

    scan.style.animation = "none";
    scan.offsetHeight; // reset
    scan.style.animation = "scan 1.2s linear";
  });
}


/* ===============================
   FLOATING CYBER PARTICLES
================================ */

const particleCanvas = document.createElement("canvas");
particleCanvas.style.position = "fixed";
particleCanvas.style.inset = "0";
particleCanvas.style.pointerEvents = "none";
particleCanvas.style.zIndex = "-1";
document.body.appendChild(particleCanvas);

const ctx = particleCanvas.getContext("2d");

let w, h;
function resizeCanvas() {
  w = particleCanvas.width = window.innerWidth;
  h = particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = Array.from({ length: 40 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.5 + 0.5,
  vx: Math.random() * 0.3,
  vy: Math.random() * 0.3
}));

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,0,0,0.35)";

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x > w) p.x = 0;
    if (p.y > h) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();


/* ===============================
   AI SYSTEM HEARTBEAT GLOW
================================ */

const logBox = document.querySelector(".ai-log-card");
if (logBox) {
  setInterval(() => {
    logBox.style.boxShadow =
      "0 0 20px rgba(255,0,0,0.8)";
    setTimeout(() => {
      logBox.style.boxShadow =
        "0 0 10px rgba(255,0,0,0.4)";
    }, 300);
  }, 2200);
}


/* ===============================
   SAFE GLITCH FLICKER (TEXT)
================================ */

setInterval(() => {
  document.querySelectorAll("h1, h2").forEach(el => {
    el.style.textShadow = `
      2px 0 red,
      -2px 0 cyan
    `;
    setTimeout(() => {
      el.style.textShadow = "";
    }, 120);
  });
}, 5000);
