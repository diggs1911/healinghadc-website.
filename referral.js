document.addEventListener("DOMContentLoaded", () => {
  let step = 1;

  const steps = Array.from(document.querySelectorAll(".step"));
  const pills = Array.from(document.querySelectorAll(".stepper-pill"));

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  function show(n) {
    step = n;

    steps.forEach(s => s.classList.remove("is-active"));
    const activeStep = document.querySelector(`.step[data-step="${step}"]`);
    if (activeStep) activeStep.classList.add("is-active");

    pills.forEach((p, idx) => p.classList.toggle("is-active", idx + 1 === step));

    if (prevBtn) prevBtn.style.display = step === 1 ? "none" : "inline-flex";
    if (nextBtn) nextBtn.style.display = step === 4 ? "none" : "inline-flex";
    if (submitBtn) submitBtn.style.display = step === 4 ? "inline-flex" : "none";
  }

  function valid() {
    const activeStep = document.querySelector(`.step[data-step="${step}"]`);
    if (!activeStep) return true;

    const required = Array.from(activeStep.querySelectorAll("[required]"));
    for (const el of required) {
      if (el.type === "checkbox" && !el.checked) return false;
      if (el.value.trim() === "") return false;
    }
    return true;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => show(Math.max(1, step - 1)));
  if (nextBtn) nextBtn.addEventListener("click", () => {
    if (!valid()) return;
    show(Math.min(4, step + 1));
  });

  show(1);
});