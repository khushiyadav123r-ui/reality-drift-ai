function analyze() {
  const input = document.getElementById("contentInput").value.toLowerCase();
  if (!input) {
    alert("Paste some content first");
    return;
  }
  let emotion = "Neutral";
  if (input.includes("guarantee") || input.includes("rich")) emotion = "Hype";
  if (input.includes("fear") || input.includes("danger")) emotion = "Fear";

  let bias = "Neutral";
  if (input.includes("buy") || input.includes("course")) bias = "Commercial";

  let expectation = "Realistic";
  if (input.includes("overnight") || input.includes("guaranteed"))
    expectation = "Unrealistic";

  let score = 8;
  if (emotion === "Hype") score -= 3;
  if (bias === "Commercial") score -= 2;
  if (expectation === "Unrealistic") score -= 3;
  if (score < 1) score = 1;
  document.getElementById("emotion").innerHTML =
    `<h3>Emotional Drift</h3><p>${emotion}</p>`;
  document.getElementById("bias").innerHTML =
    `<h3>Bias Detection</h3><p>${bias}</p>`;
  document.getElementById("expectation").innerHTML =
    `<h3>Expectation Drift</h3><p>${expectation}</p>`;
  document.getElementById("truth").innerHTML =
    `<h3>Truth Drift</h3><p>${score <= 4 ? "HIGH" : "MODERATE"}</p>`;

  document.getElementById("aiInsight").innerText =
    score <= 3 ? "High manipulation detected." :
    score <= 6 ? "Moderate influence patterns found." :
    "Content appears balanced and informative.";

  const trustCard = document.getElementById("trustCard");
  const trustText = document.getElementById("trustText");

  trustCard.className = "card centered";
  if (score <= 3) {
    trustText.innerText = "❌ Highly Manipulative";
    trustCard.classList.add("trust-danger");
  } else if (score <= 6) {
    trustText.innerText = "⚠️ Use With Caution";
    trustCard.classList.add("trust-warning");
  } else {
    trustText.innerText = "✅ Generally Trustworthy";
    trustCard.classList.add("trust-safe");
  }

  let current = 0;
  const meterFill = document.getElementById("meterFill");
  const scoreText = document.getElementById("scoreText");
  meterFill.style.width = "0%";
  const interval = setInterval(() => {
    current++;
    scoreText.innerText = `Reality Score: ${current} / 10`;
    meterFill.style.width = current * 10 + "%";
    if (current >= score) clearInterval(interval);
  }, 120);
}
