(function () {
  let step = 1;

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function showStep(n) {
    step = n;

    qsa(".step").forEach(s => s.classList.remove("active"));
    const current = qs(`.step[data-step="${step}"]`);
    if (current) current.classList.add("active");

    qsa(".stepper-step").forEach((el, idx) => {
      el.classList.toggle("active", idx + 1 === step);
    });

    const prev = qs("#prevBtn");
    const next = qs("#nextBtn");
    const submit = qs("#submitBtn");

    if (prev) prev.style.display = step === 1 ? "none" : "inline-flex";
    if (next) next.style.display = step === 4 ? "none" : "inline-flex";
    if (submit) submit.style.display = step === 4 ? "inline-flex" : "none";
  }

  function validateStep() {
    const current = qs(`.step[data-step="${step}"]`);
    if (!current) return true;

    const required = Array.from(current.querySelectorAll("[required]"));
    for (const el of required) {
      if (el.type === "checkbox" && !el.checked) return false;
      if (el.value.trim() === "") return false;
    }
    return true;
  }

  document.addEventListener("DOMContentLoaded", () => {
    showStep(1);

    const prev = qs("#prevBtn");
    const next = qs("#nextBtn");
    const form = qs("#referralForm");

    if (prev) prev.addEventListener("click", () => showStep(Math.max(1, step - 1)));

    if (next) next.addEventListener("click", () => {
      if (!validateStep()) return;
      showStep(Math.min(4, step + 1));
    });

    if (form) {
      form.addEventListener("submit", () => {
        const msg = qs("#successMsg");
        if (msg) msg.style.display = "block";
      });
    }
  });
})();