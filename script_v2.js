function analyze() {
  const input = document.getElementById("contentInput").value;

  if (!input || input.trim() === "") {
    alert("Please paste some content first");
    return;
  }

  const text = input.toLowerCase();

  // Emotion
  let emotion = "Neutral";
  if (text.includes("guarantee") || text.includes("profit") || text.includes("rich")) {
    emotion = "Hype";
  } else if (text.includes("fear") || text.includes("danger") || text.includes("destroy")) {
    emotion = "Fear";
  } else if (text.includes("happy") || text.includes("love") || text.includes("cute")) {
    emotion = "Positive";
  }

  // Bias
  let bias = "Neutral";
  if (text.includes("buy") || text.includes("crypto") || text.includes("course")) {
    bias = "Commercial";
  } else if (text.includes("government") || text.includes("election")) {
    bias = "Political";
  }

  // Expectation
  let expectation = "Realistic Expectations";
  if (text.includes("overnight") || text.includes("guaranteed")) {
    expectation = "Unrealistic Expectations";
  }

  // Reality Score
  let score = 8;
  if (emotion === "Hype") score -= 3;
  if (expectation === "Unrealistic Expectations") score -= 4;
  if (score < 1) score = 1;

  // Output
  document.getElementById("emotion").innerText =
    "Emotional Drift: " + emotion;

  document.getElementById("bias").innerText =
    "Bias Detected: " + bias;

  document.getElementById("expectation").innerText =
    "Expectation Drift: " + expectation;

  document.getElementById("truth").innerText =
    "Truth Drift: " + (score < 5 ? "HIGH" : "MODERATE");

  // SCORE COUNT-UP ANIMATION
let currentScore = 0;
let scoreText = document.getElementById("scoreText");
let meter = document.getElementById("meterFill");

let interval = setInterval(() => {
  if (currentScore >= score) {
    clearInterval(interval);
  } else {
    currentScore++;
    scoreText.innerText =
      "Reality Score: " + currentScore + " / 10";
    meter.style.width = (currentScore * 10) + "%";
  }
}, 120);


document.getElementById("meterFill").style.width =
  (score * 10) + "%";


  // AI INSIGHT
  let insight = "Content appears balanced and informative.";

  if (score <= 3) {
    insight = "High emotional and expectation manipulation detected.";
  } else if (score <= 6) {
    insight = "Moderate influence patterns found.";
  }

  document.getElementById("aiInsight").innerText = insight;
}

// WELCOME TYPING EFFECT
const text = "Analyzing how digital content shapes human perception...";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

function enterApp() {
  document.getElementById("welcomeOverlay").style.display = "none";
}

