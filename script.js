// Año
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => nav.classList.toggle("open"));

// WhatsApp desde mini-form (hero)
document.getElementById("q_send").addEventListener("click", () => {
  const name = document.getElementById("q_name").value.trim();
  const service = document.getElementById("q_service").value;
  const msg = document.getElementById("q_msg").value.trim();

  const base = "https://wa.me/56991201418";
  const text =
    `Hola V&V Construcciones, soy ${name || "un cliente"}. ` +
    `Quiero cotizar: ${service}. ` +
    (msg ? `Detalles: ${msg}` : "");

  window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank");
});

// Contact form -> WhatsApp (con validación simple)
const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("f_name").value.trim();
  const service = document.getElementById("f_service").value;
  const msg = document.getElementById("f_msg").value.trim();

  if (!msg) {
    formHint.textContent = "Escribe un mensaje (ej: comuna, medidas y fecha ideal).";
    return;
  }

  formHint.textContent = "";

  const base = "https://wa.me/56991201418";
  const text =
    `Hola V&V Construcciones, soy ${name || "un cliente"}. ` +
    `Quiero cotizar: ${service}. ` +
    `Detalles: ${msg}`;

  window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank");
});

// Modal imágenes
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll("[data-full]").forEach((btn) => {
  btn.addEventListener("click", () => {
    modalImg.src = btn.getAttribute("data-full");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// Filtros de proyectos
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((f) => {
  f.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("is-active"));
    f.classList.add("is-active");

    const target = f.dataset.filter;

    projects.forEach((p) => {
      const cat = p.dataset.cat;
      const show = (target === "all") || (cat === target);
      p.style.display = show ? "" : "none";
    });
  });
});

// Botón arriba
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Sección activa en menú (scrollspy)
const sections = ["inicio","nosotros","proyectos","noticias","contacto"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll(".nav__link");

function setActiveLink(id){
  navLinks.forEach(a => a.classList.remove("is-active"));
  const link = Array.from(navLinks).find(a => a.getAttribute("href") === `#${id}`);
  if (link) link.classList.add("is-active");
}

window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  let current = "inicio";

  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  setActiveLink(current);
});

// Animación reveal al hacer scroll
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

reveals.forEach(el => obs.observe(el));
