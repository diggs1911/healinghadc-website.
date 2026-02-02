(function () {
  function basePath() {
    // Works on custom domain and GitHub project pages
    // Example:
    //  - https://healinghadc.org/caring-hearts.html  -> ""
    //  - https://username.github.io/healinghadc-website./caring-hearts.html -> "/healinghadc-website."
    const parts = window.location.pathname.split("/").filter(Boolean);

    // If you are using a custom domain, site sits at root.
    // If you are using GitHub project pages, first part is the repo name.
    // Heuristic: if path has at least 2 segments or hostname includes github.io, treat first as base.
    const isGithubIo = window.location.hostname.includes("github.io");
    if (isGithubIo && parts.length > 0) return "/" + parts[0];

    return "";
  }

  async function inject(targetId, file) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const root = basePath();
    const url = `${root}/${file}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (e) {
      console.error("[layout] failed:", e);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    inject("site-header", "header.html");
    inject("site-footer", "footer.html");
    const yearCurrent = document.getElementById("year-current");
if (yearCurrent) {
  yearCurrent.textContent = new Date().getFullYear();
}
  });
})();