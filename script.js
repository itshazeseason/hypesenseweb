// Smooth scroll for in-page nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Optional: update URL hash without jumping
    history.pushState(null, "", id);
  });
});

// Highlight active section in side nav (simple + static-friendly)
const links = Array.from(document.querySelectorAll(".sidenav__link"));
const sections = links
  .map(l => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = "#" + entry.target.id;

    links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === id));
  });
}, {
  root: null,
  threshold: 0.35
});

sections.forEach(sec => obs.observe(sec));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
