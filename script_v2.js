function analyze() {
  const input = document.getElementById("contentInput").value;

  if (!input || input.trim() === "") {
    alert("Please paste some content first");
    return;
  }

  const text = input.toLowerCase();

  // ---------------- EMOTIONAL DRIFT ----------------
  let emotion = "Neutral";
  if (text.includes("guarantee") || text.includes("profit") || text.includes("rich")) {
    emotion = "Hype";
  } else if (text.includes("fear") || text.includes("danger") || text.includes("destroy")) {
    emotion = "Fear";
  } else if (text.includes("happy") || text.includes("love") || text.includes("cute")) {
    emotion = "Positive";
  }

  // ---------------- BIAS DETECTION ----------------
  let bias = "Neutral";
  if (text.includes("buy") || text.includes("crypto") || text.includes("course")) {
    bias = "Commercial";
  } else if (text.includes("government") || text.includes("election")) {
    bias = "Political";
  }

  // ---------------- EXPECTATION DRIFT ----------------
  let expectation = "Realistic Expectations";

if (
  text.includes("overnight") ||
  text.includes("guaranteed") ||
  text.includes("quickly") ||
  text.includes("fast") ||
  text.includes("change your life")
) {
  expectation = "Unrealistic Expectations";
}


  // ---------------- REALITY SCORE LOGIC ----------------
  let score = 8;
  if (emotion === "Hype") score -= 3;
if (expectation === "Unrealistic Expectations") score -= 3;
if (bias === "Commercial") score -= 2;

  if (score < 1) score = 1;

  // ---------------- OUTPUT CARDS ----------------
  document.getElementById("emotion").innerText =
    "Emotional Drift: " + emotion;

  document.getElementById("bias").innerText =
    "Bias Detected: " + bias;

  document.getElementById("expectation").innerText =
    "Expectation Drift: " + expectation;

  document.getElementById("truth").innerText =
    "Truth Drift: " + (score < 5 ? "HIGH" : "MODERATE");

  // ---------------- SCORE COUNT-UP ANIMATION (SAFE) ----------------
  let currentScore = 0;
  let scoreText = document.getElementById("scoreText");
  let meter = document.getElementById("meterFill");

  // Reset UI
  meter.style.width = "0%";
  scoreText.innerText = "Reality Score: 0 / 10";

  // Stop previous animation if exists
  if (window.scoreInterval) clearInterval(window.scoreInterval);

  window.scoreInterval = setInterval(() => {
    if (currentScore >= score) {
      clearInterval(window.scoreInterval);
    } else {
      currentScore++;
      scoreText.innerText =
  "Reality Score: " + currentScore + " / 10";

// COLOR LOGIC
scoreText.classList.remove("low-score", "medium-score", "high-score");

if (currentScore <= 3) {
  scoreText.classList.add("low-score");
} else if (currentScore <= 6) {
  scoreText.classList.add("medium-score");
} else {
  scoreText.classList.add("high-score");
}

      meter.style.width = (currentScore * 10) + "%";
    }
  }, 120);

  // ---------------- AI INSIGHT ----------------
  let insight = "Content appears balanced and informative.";

  if (score <= 3) {
    insight = "High emotional and expectation manipulation detected.";
  } else if (score <= 6) {
    insight = "Moderate influence patterns found.";
  }

  document.getElementById("aiInsight").innerText = insight;
  // FINAL TRUST INDICATOR
let trustText = document.getElementById("trustText");
let trustCard = document.getElementById("trustCard");

// reset previous state
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

}

// ---------------- WELCOME TYPING EFFECT ----------------
const welcomeText = "Analyzing how digital content shapes human perception...";
let index = 0;

function typeEffect() {
  if (index < welcomeText.length) {
    document.getElementById("typingText").innerHTML += welcomeText.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

// ---------------- ENTER APP FUNCTION ----------------
function enterApp() {
  document.getElementById("welcomeOverlay").style.display = "none";
}
