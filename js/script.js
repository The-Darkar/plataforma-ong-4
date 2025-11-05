// Executa o script apenas após o carregamento completo da página
document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     Alternância de temas (modo escuro e alto contraste)
     --------------------------------------------------------- */
  const btnTema = document.getElementById("toggle-tema");
  const btnContraste = document.getElementById("toggle-contraste");

  // Recupera preferências salvas no navegador
  const temaSalvo = localStorage.getItem("tema");
  const contrasteSalvo = localStorage.getItem("contraste");

  if (temaSalvo === "escuro") document.body.classList.add("dark-mode");
  if (contrasteSalvo === "alto") document.body.classList.add("alto-contraste");

  // Alterna modo escuro
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const modoAtivo = document.body.classList.contains("dark-mode");
      localStorage.setItem("tema", modoAtivo ? "escuro" : "claro");
      btnTema.setAttribute("aria-pressed", modoAtivo);
    });
  }

  // Alterna modo de alto contraste
  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      document.body.classList.toggle("alto-contraste");
      const contrasteAtivo = document.body.classList.contains("alto-contraste");
      localStorage.setItem("contraste", contrasteAtivo ? "alto" : "normal");
      btnContraste.setAttribute("aria-pressed", contrasteAtivo);
    });
  }

  /* ---------------------------------------------------------
     Acessibilidade: navegação por teclado
     --------------------------------------------------------- */
  // Permite navegação com TAB entre elementos clicáveis
  const elementosFocus = document.querySelectorAll("a, button, input, textarea, select");
  elementosFocus.forEach(el => {
    el.addEventListener("focus", () => el.classList.add("focus-visible"));
    el.addEventListener("blur", () => el.classList.remove("focus-visible"));
  });

  /* ---------------------------------------------------------
     Validação simples de formulário (cadastro e contato)
     --------------------------------------------------------- */
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault(); // impede o envio real para teste local
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

  /* ---------------------------------------------------------
     Otimização: Lazy loading para imagens
     --------------------------------------------------------- */
  const imagens = document.querySelectorAll("img");
  imagens.forEach(img => {
    img.setAttribute("loading", "lazy");
  });
});
