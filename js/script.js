/**
 * EMELTO SAS — Comportamiento del sitio
 * Navbar al hacer scroll, formulario de contacto y utilidades de accesibilidad.
 */
(function () {
  "use strict";

  const navbar = document.querySelector(".navbar-emelto");
  const yearNode = document.getElementById("year");
  const btnTop = document.getElementById("btnTop");
  const contactForm = document.getElementById("formContacto");

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    if (navbar) {
      navbar.classList.toggle("is-scrolled", scrolled);
    }
    if (btnTop) {
      btnTop.style.display = window.scrollY > 420 ? "inline-flex" : "none";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactForm.classList.add("was-validated");

      if (!contactForm.checkValidity()) {
        return;
      }

      const alertBox = document.getElementById("formAlert");
      const data = new FormData(contactForm);
      const nombre = data.get("nombre");

      if (alertBox) {
        alertBox.className = "alert alert-success mt-3";
        alertBox.setAttribute("role", "status");
        alertBox.textContent =
          "Gracias, " +
          nombre +
          ". Recibimos su solicitud de visita técnica. Un asesor de EMELTO SAS se comunicará en horario hábil.";
        alertBox.classList.remove("d-none");
      }

      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }
})();
