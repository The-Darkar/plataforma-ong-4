document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");

  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Página não encontrada");
      let html = await response.text();

      const temp = document.createElement("div");
      temp.innerHTML = html;
      temp.querySelectorAll("header, footer").forEach(el => el.remove());
      const main = temp.querySelector("main, #content") || temp;
      content.innerHTML = main.innerHTML;
      initMasks();
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
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

  loadPage("index.html");
});
