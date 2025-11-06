document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");
  const toggleBtn = document.getElementById("toggle-modo");

  function applyAccessibilityFeedback(message) {
    let liveRegion = document.getElementById("live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.classList.add("sr-only");
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
  }

  async function loadPage(url) {
    try {
      applyAccessibilityFeedback("Carregando conteúdo...");
      const response = await fetch(url);
      if (!response.ok) throw new Error("Página não encontrada");
      const html = await response.text();

      const temp = document.createElement("div");
      temp.innerHTML = html;
      temp.querySelectorAll("header, footer").forEach(el => el.remove());
      const main = temp.querySelector("main, #content") || temp;
      content.innerHTML = main.innerHTML;
      initMasks();
      applyAccessibilityFeedback("Conteúdo carregado com sucesso.");
      const firstFocusable = content.querySelector("a, button, input, textarea");
      if (firstFocusable) firstFocusable.focus();
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
      applyAccessibilityFeedback("Erro ao carregar conteúdo.");
    }
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      loadPage(href);
      history.pushState({ page: href }, "", href);
    });
  });

  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      loadPage("index.html");
    }
  });

  function initMasks() {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) {
      cpf.addEventListener("input", () => {
        cpf.value = cpf.value.replace(/\D/g, "")
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      });
    }

    if (telefone) {
      telefone.addEventListener("input", () => {
        telefone.value = telefone.value.replace(/\D/g, "")
          .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      });
    }

    if (cep) {
      cep.addEventListener("input", () => {
        cep.value = cep.value.replace(/\D/g, "")
          .replace(/(\d{5})(\d{3})/, "$1-$2");
      });
    }

    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          alert("Por favor, preencha todos os campos corretamente!");
        }
      });
    }
  }

  function toggleModo() {
    const body = document.body;
    const isEscuro = body.classList.toggle("modo-escuro");
    const isContraste = body.classList.toggle("alto-contraste");
    toggleBtn.setAttribute("aria-pressed", isEscuro || isContraste);
    localStorage.setItem("modo", JSON.stringify({ escuro: isEscuro, contraste: isContraste }));
  }

  toggleBtn.addEventListener("click", toggleModo);

  function restoreModo() {
    const saved = JSON.parse(localStorage.getItem("modo"));
    if (saved) {
      if (saved.escuro) document.body.classList.add("modo-escuro");
      if (saved.contraste) document.body.classList.add("alto-contraste");
      toggleBtn.setAttribute("aria-pressed", saved.escuro || saved.contraste);
    }
  }

  restoreModo();
  loadPage("index.html");
});
