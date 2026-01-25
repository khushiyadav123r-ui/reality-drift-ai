/* ================= TYPING EFFECT ================= */
const welcomeText = "Analyzing how digital content shapes human perception...";
let index = 0;

function typeEffect() {
  const el = document.getElementById("typingText");
  if (!el) return;

  if (index < welcomeText.length) {
    el.innerHTML += welcomeText.charAt(index++);
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

/* ================= OVERLAY CONTROLS ================= */
function enterApp() {
  const welcome = document.getElementById("welcomeOverlay");
  if (welcome) {
    welcome.style.display = "none";
    welcome.style.pointerEvents = "none";
  }
}

function enterHome() {
  const home = document.getElementById("homeOverlay");
  if (home) {
    home.style.display = "none";
    home.style.pointerEvents = "none";
  }
}

/* ================= AI LOG ================= */
function addLog(msg) {
  const log = document.getElementById("logContent");
  if (!log) return;

  const p = document.createElement("p");
  p.innerText = msg;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

/* ================= MAIN ANALYSIS ================= */
function analyze() {
  const input = document.getElementById("contentInput");
  if (!input || input.value.trim() === "") {
    alert("Please paste some content first");
    return;
  }

  document.getElementById("logContent").innerHTML = "";
  addLog("🧠 Initializing AI engine...");

  const text = input.value.toLowerCase();

  let emotion = "Neutral";
  if (text.includes("guarantee") || text.includes("profit")) emotion = "Hype";
  else if (text.includes("fear") || text.includes("danger")) emotion = "Fear";

  addLog("❤️ Emotional Drift → " + emotion);

  let bias = "Neutral";
  if (text.includes("buy") || text.includes("crypto")) bias = "Commercial";
  else if (text.includes("government") || text.includes("election")) bias = "Political";

  addLog("⚠️ Bias Detected → " + bias);

  let expectation = "Realistic";
  if (text.includes("overnight") || text.includes("guaranteed"))
    expectation = "Unrealistic";

  addLog("🎯 Expectation Drift → " + expectation);

  let score = 8;
  if (emotion === "Hype") score -= 3;
  if (bias === "Commercial") score -= 2;
  if (expectation === "Unrealistic") score -= 3;
  if (score < 1) score = 1;

  addLog("📊 Calculating Reality Score...");

  document.getElementById("emotion").innerHTML =
    `<h3>Emotional Drift</h3><p>${emotion}</p>`;
  document.getElementById("bias").innerHTML =
    `<h3>Bias Detection</h3><p>${bias}</p>`;
  document.getElementById("expectation").innerHTML =
    `<h3>Expectation Drift</h3><p>${expectation}</p>`;
  document.getElementById("truth").innerHTML =
    `<h3>Truth Drift</h3><p>${score <= 4 ? "HIGH" : "MODERATE"}</p>`;

  let current = 0;
  const scoreText = document.getElementById("scoreText");
  const meter = document.getElementById("meterFill");

  meter.style.width = "0%";
  scoreText.innerText = "Reality Score: 0 / 10";

  if (window.scoreInterval) clearInterval(window.scoreInterval);

  window.scoreInterval = setInterval(() => {
    if (current >= score) {
      clearInterval(window.scoreInterval);
    } else {
      current++;
      scoreText.innerText = `Reality Score: ${current} / 10`;
      meter.style.width = current * 10 + "%";
    }
  }, 120);

  let insight = "Content appears balanced.";
  if (score <= 3) insight = "High manipulation detected.";
  else if (score <= 6) insight = "Moderate influence detected.";

  document.getElementById("aiInsight").innerText = insight;

  const trustText = document.getElementById("trustText");
  const trustCard = document.getElementById("trustCard");

  trustCard.className = "card trust-card";

  if (score <= 3) {
    trustText.innerText = "❌ Highly Manipulative";
    trustCard.classList.add("trust-danger");
  } else if (score <= 6) {
    trustText.innerText = "⚠️ Use With Caution";
    trustCard.classList.add("trust-warning");
  } else {
    trustText.innerText = "✅ Trustworthy";
    trustCard.classList.add("trust-safe");
  }

  addLog("✅ Analysis complete. Trust level generated.");
  window.onload = () => {
  if (!sessionStorage.getItem("guideShown")) {
    document.getElementById("guideOverlay").style.display = "block";
    document.body.style.overflow = "hidden";

    // Auto scroll to top so arrows always visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

function closeGuide() {
  document.getElementById("guideOverlay").style.display = "none";
  document.body.style.overflow = "auto";
  sessionStorage.setItem("guideShown", "yes");
}


}
