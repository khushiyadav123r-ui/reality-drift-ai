function analyze() {
  const text = document.getElementById("contentInput").value.toLowerCase();
  if (!text) {
    alert("Paste content first");
    return;
  }

  const emotion = detectEmotion(text);
  const bias = detectBias(text);
  const expectation = detectExpectation(text);
  const truth = detectTruth(text);

  document.getElementById("emotion").innerText =
    "Emotional Drift: " + emotion.label + " (" + emotion.score + "%)";

  document.getElementById("bias").innerText =
    "Bias: " + bias;

  document.getElementById("expectation").innerText =
    expectation;

  document.getElementById("truth").innerText =
    "Truth Drift: " + truth;

  const realityScore = calculateRealityScore(emotion.score, expectation);
  document.getElementById("score").innerText =
    "Reality Score: " + realityScore + " / 10";
}

/* ---------- AI-INSPIRED LOGIC ---------- */

function detectEmotion(text) {
  if (text.match(/fear|danger|destroy|loss|threat/))
    return { label: "Fear", score: 82 };

  if (text.match(/guarantee|profit|rich|success|win|million/))
    return { label: "Hype", score: 88 };

  if (text.match(/happy|joy|cute|love|peace/))
    return { label: "Positive", score: 70 };

  if (text.match(/anger|hate|corrupt|scam/))
    return { label: "Anger", score: 76 };

  return { label: "Neutral", score: 30 };
}

function detectBias(text) {
  if (text.match(/buy|sell|offer|crypto|course|money/))
    return "Commercial";

  if (text.match(/government|policy|election|vote/))
    return "Political";

  return "Neutral";
}

function detectExpectation(text) {
  if (text.match(/overnight|guarantee|instant|no effort/))
    return "Expectation Drift: Unrealistic";

  return "Expectation Drift: Realistic";
}

function detectTruth(text) {
  if (text.match(/guarantee|always|never|100%/))
    return "HIGH";

  return "MODERATE";
}

function calculateRealityScore(emotionScore, expectation) {
  let score = 10;

  if (emotionScore > 70) score -= 3;
  if (expectation.includes("Unrealistic")) score -= 4;

  return Math.max(score, 1);
}
