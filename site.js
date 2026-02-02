(function () {
  function getBasePath() {
    const isGithub = location.hostname.includes("github.io");
    if (!isGithub) return "";
    const parts = location.pathname.split("/").filter(Boolean);
    return parts.length ? "/" + parts[0] : "";
  }

  async function inject(targetId, fileName) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const base = getBasePath();
    try {
      const res = await fetch(`${base}/${fileName}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`${fileName} not found`);
      target.innerHTML = await res.text();
    } catch (e) {
      console.error(`[layout] failed to load ${fileName}`, e);
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await inject("site-header", "header.html");
    await inject("site-footer", "footer.html");

    const year = document.getElementById("year-current");
    if (year) year.textContent = new Date().getFullYear();
  });
})();