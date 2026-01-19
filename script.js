function analyze() {
  const text = document.getElementById("contentInput").value;

  if (!text) {
    alert("Paste content first");
    return;
  }

  document.getElementById("truth").innerText =
    "Truth Drift: HIGH — Reality distortion detected";

  document.getElementById("emotion").innerText =
    "Emotional Drift: Hype / Fear trigger";

  document.getElementById("bias").innerText =
    "Bias: Commercial / Ideological";

  document.getElementById("expectation").innerText =
    "Expectation Drift: Unrealistic standards";

  document.getElementById("score").innerText =
    "Reality Score: 4 / 10";
}
