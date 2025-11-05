document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");

  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Página não encontrada");
      const html = await response.text();
      content.innerHTML = html;
      applyPreferences();
      initInteractions();
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      loadPage(href);
      history.pushState({ page: href }, "", href);
    });
  });

  window.addEventListener("popstate", event => {
    if (event.state && event.state.page) loadPage(event.state.page);
    else loadPage("index.html");
  });

  function applyPreferences() {
    const modo = localStorage.getItem("modo") || "claro";
    document.body.classList.remove("dark-mode", "alto-contraste");
    if (modo === "escuro") document.body.classList.add("dark-mode");
    if (modo === "alto") document.body.classList.add("alto-contraste");

    const btnTema = document.getElementById("toggle-tema");
    if (btnTema) {
      updateButtonLabel(btnTema, modo);
      btnTema.addEventListener("click", () => {
        const atual = localStorage.getItem("modo") || "claro";
        let proximo;
        if (atual === "claro") proximo = "escuro";
        else if (atual === "escuro") proximo = "alto";
        else proximo = "claro";
        localStorage.setItem("modo", proximo);
        document.body.classList.remove("dark-mode", "alto-contraste");
        if (proximo === "escuro") document.body.classList.add("dark-mode");
        if (proximo === "alto") document.body.classList.add("alto-contraste");
        updateButtonLabel(btnTema, proximo);
      });
    }
  }

  function updateButtonLabel(btn, modo) {
    if (modo === "claro") btn.textContent = "Modo Escuro";
    else if (modo === "escuro") btn.textContent = "Alto Contraste";
    else btn.textContent = "Modo Claro";
  }

  function initInteractions() {
    const elementosFocus = document.querySelectorAll("a, button, input, textarea, select");
    elementosFocus.forEach(el => {
      el.addEventListener("focus", () => el.classList.add("focus-visible"));
      el.addEventListener("blur", () => el.classList.remove("focus-visible"));
    });

    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input[required], textarea[required]");
        let valido = true;
        inputs.forEach(input => {
          if (!input.value.trim()) {
            valido = false;
            input.style.border = "2px solid red";
            input.setAttribute("aria-invalid", "true");
          } else {
            input.style.border = "1px solid #ccc";
            input.setAttribute("aria-invalid", "false");
          }
        });
        if (valido) {
          alert("Mensagem enviada com sucesso! 🎉");
          form.reset();
        } else {
          alert("Por favor, preencha todos os campos obrigatórios.");
        }
      });
    });

    const imagens = document.querySelectorAll("img");
    imagens.forEach(img => img.setAttribute("loading", "lazy"));
  }

  applyPreferences();
  initInteractions();
  loadPage("index.html");
});
