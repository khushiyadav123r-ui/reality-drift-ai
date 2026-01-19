const HF_TOKEN = "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";

async function analyze() {
  const text = document.getElementById("contentInput").value;
  if (!text) {
    alert("Paste content first");
    return;
  }

  setLoading(true);

  async function query(model, text) {
  const noise = Math.random().toString(36).substring(7);

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
        "x-use-cache": "false"
      },
      method: "POST",
      body: JSON.stringify({
        inputs: text + " " + noise
      }),
    }
  );

  return await response.json();
}


  const top3 = emotions[0].slice(0, 3);

  const emotionText = top3
    .map(e => `${e.label} (${(e.score * 100).toFixed(1)}%)`)
    .join(", ");

  document.getElementById("emotion").innerText =
    "Emotional Drift: " + emotionText;

  const hypeScore = top3.find(e => e.label === "joy" || e.label === "fear");
  const driftLevel = hypeScore && hypeScore.score > 0.6 ? "HIGH" : "MODERATE";

  document.getElementById("truth").innerText =
    "Truth Drift: " + driftLevel;

  document.getElementById("bias").innerText =
    detectBias(text);

  const exp = detectExpectation(text);
  document.getElementById("expectation").innerText = exp;

  const realityScore = exp.includes("Unrealistic") ? 3 : 7;

  document.getElementById("score").innerText =
    "Reality Score: " + realityScore + " / 10";

  setLoading(false);
}


  setLoading(true);

  const emotion = await query(
    "j-hartmann/emotion-english-distilroberta-base",
    text
  );

  const sentiment = emotion[0][0].label;
  const score = emotion[0][0].score;

  document.getElementById("emotion").innerText =
    "Emotional Drift: " + sentiment + " (" + score.toFixed(2) + ")";

  document.getElementById("truth").innerText =
    "Truth Drift: " + (score > 0.7 ? "HIGH" : "MODERATE");

  document.getElementById("bias").innerText =
    detectBias(text);

  document.getElementById("expectation").innerText =
    detectExpectation(text);

  document.getElementById("score").innerText =
    "Reality Score: " + Math.round((1 - score) * 10) + " / 10";

  setLoading(false);
}

async function query(model, text) {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    }
  );
  return await response.json();
}

function detectBias(text) {
  if (/buy|sell|offer|profit|money|crypto/i.test(text))
    return "Bias: Commercial";
  if (/vote|government|policy|election/i.test(text))
    return "Bias: Political";
  return "Bias: Neutral";
}

function detectExpectation(text) {
  if (/overnight|guaranteed|instant|millionaire/i.test(text))
    return "Expectation Drift: Unrealistic";
  return "Expectation Drift: Normal";
}

function setLoading(state) {
  document.getElementById("score").innerText =
    state ? "Analyzing Reality..." : "";
}
