/* ---------------- WELCOME TYPING EFFECT ---------------- */
const welcomeText = "Analyzing how digital content shapes human perception...";
let index = 0;

function typeEffect() {
  const typingEl = document.getElementById("typingText");
  if (!typingEl) return;

  if (index < welcomeText.length) {
    typingEl.innerHTML += welcomeText.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

/* ---------------- ENTER APP (WELCOME OVERLAY) ---------------- */
function enterApp() {
  const overlay = document.getElementById("welcomeOverlay");
  if (overlay) overlay.style.display = "none";
}

/* ---------------- ENTER HOME (HOMEPAGE OVERLAY) ---------------- */
function enterHome() {
  const home = document.getElementById("homeOverlay");
  if (home) home.style.display = "none";

  const analyzeBtn = document.getElementById("analyzeBtn");
  if (analyzeBtn) analyzeBtn.disabled = false;
}

/* ---------------- MAIN ANALYSIS FUNCTION ---------------- */
function analyze() {
  document.getElementById("logContent").innerHTML = "";
addLog("🧠 Initializing analysis engine...");

  const inputEl = document.getElementById("contentInput");

  if (!inputEl || inputEl.value.trim() === "") {
    alert("Please paste some content first");
    return;
  }
const hint = document.getElementById("assistantHint");
if (hint) {
  hint.innerText = "🧠 Analyzing content for emotion, bias, and reality drift...";
}

  const text = inputEl.value.toLowerCase();

  /* -------- EMOTIONAL DRIFT -------- */
  let emotion = "Neutral";
  if (text.includes("guarantee") || text.includes("profit") || text.includes("rich")) {
    emotion = "Hype";
  } else if (text.includes("fear") || text.includes("danger") || text.includes("destroy")) {
    emotion = "Fear";
  } else if (text.includes("love") || text.includes("happy")) {
    emotion = "Positive";
  }
  addLog("❤️ Emotional signals analyzed → " + emotion);


  /* -------- BIAS DETECTION -------- */
  let bias = "Neutral";
  if (text.includes("buy") || text.includes("course") || text.includes("crypto")) {
    bias = "Commercial";
  } else if (text.includes("government") || text.includes("election")) {
    bias = "Political";
  }
addLog("⚠️ Bias patterns detected → " + bias);

  /* -------- EXPECTATION DRIFT -------- */
  let expectation = "Realistic Expectations";
  if (
    text.includes("overnight") ||
    text.includes("guaranteed") ||
    text.includes("fast") ||
    text.includes("change your life")
  ) {
    expectation = "Unrealistic Expectations";
  }
  addLog("🎯 Expectation realism evaluated → " + expectation);


  /* -------- REALITY SCORE -------- */
  let score = 8;
  if (emotion === "Hype") score -= 3;
  if (bias === "Commercial") score -= 2;
  if (expectation === "Unrealistic Expectations") score -= 3;
  if (score < 1) score = 1;
  addLog("📊 Calculating Reality Score...");


  /* -------- OUTPUT TEXT -------- */
  document.getElementById("emotion").innerHTML =
    `<h3>Emotional Drift</h3><p>${emotion}</p>`;

  document.getElementById("bias").innerHTML =
    `<h3>Bias Detection</h3><p>${bias}</p>`;

  document.getElementById("expectation").innerHTML =
    `<h3>Expectation Drift</h3><p>${expectation}</p>`;

  document.getElementById("truth").innerHTML =
    `<h3>Truth Drift</h3><p>${score <= 4 ? "HIGH" : "MODERATE"}</p>`;

  /* -------- SCORE ANIMATION -------- */
  let current = 0;
  const scoreText = document.getElementById("scoreText");
  const meterFill = document.getElementById("meterFill");

  meterFill.style.width = "0%";
  scoreText.innerText = "Reality Score: 0 / 10";

  if (window.scoreInterval) clearInterval(window.scoreInterval);

  window.scoreInterval = setInterval(() => {
    if (current >= score) {
      clearInterval(window.scoreInterval);
    } else {
      current++;
      scoreText.innerText = `Reality Score: ${current} / 10`;
      meterFill.style.width = current * 10 + "%";
    }
  }, 120);

  /* -------- AI INSIGHT -------- */
  let insight = "Content appears balanced and informative.";
  if (score <= 3) {
    insight = "High emotional and expectation manipulation detected.";
  } else if (score <= 6) {
    insight = "Moderate influence patterns found.";
  }
  document.getElementById("aiInsight").innerText = insight;

  /* -------- TRUST INDICATOR -------- */
  const trustText = document.getElementById("trustText");
  const trustCard = document.getElementById("trustCard");

  trustCard.classList.remove("trust-safe", "trust-warning", "trust-danger");

  if (score <= 3) {
    trustText.innerText = "❌ Highly Manipulative Content";
    trustCard.classList.add("trust-danger");
  } else if (score <= 6) {
    trustText.innerText = "⚠️ Use With Caution";
    trustCard.classList.add("trust-warning");
  } else {
    trustText.innerText = "✅ Generally Trustworthy";
    trustCard.classList.add("trust-safe");
  }
  addLog("✅ Analysis complete. Trust level generated.");

  if (hint) {
  hint.innerText = "✅ Analysis complete. Review each card to understand the results.";
}

  // FIRST TIME GUIDE (SHOW ONCE)
window.onload = () => {
  const guide = document.getElementById("guideOverlay");

  if (guide && !sessionStorage.getItem("guideShown")) {
    guide.style.display = "flex";
    guide.style.pointerEvents = "auto";
    document.body.style.overflow = "hidden";
  }
};

function closeGuide() {
  const guide = document.getElementById("guideOverlay");

  if (guide) {
    guide.style.display = "none";
    guide.style.pointerEvents = "none";
  }

  document.body.style.overflow = "auto";
  sessionStorage.setItem("guideShown", "yes");
}
const hint = document.getElementById("assistantHint");
if (hint) {
  hint.innerText = "💡 Tip: Try pasting a news article, ad copy, or viral post.";
}
  function addLog(message) {
  const log = document.getElementById("logContent");
  if (!log) return;

  const p = document.createElement("p");
  p.textContent = message;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}




}
