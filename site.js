(function () {
  function getBasePath() {
    const isGithub = location.hostname.includes("github.io");
    if (!isGithub) return "";
    const parts = location.pathname.split("/").filter(Boolean);
    return parts.length ? "/" + parts[0] : "";
  }

  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const base = getBasePath();
    try {
      const res = await fetch(`${base}/${file}`, { cache: "no-store" });
      if (!res.ok) throw new Error(file);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(`[layout] failed to load ${file}`, err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    inject("site-header", "header.html");
    inject("site-footer", "footer.html");

    const year = document.getElementById("year-current");
    if (year) year.textContent = new Date().getFullYear();
  });
})();