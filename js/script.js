document.addEventListener("DOMContentLoaded", () => {

  // Função para aplicar o tema salvo ou padrão
  function aplicarTema() {
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.remove("dark-mode", "alto-contraste");

    const botao = document.getElementById("toggle-tema");

    if (tema === "escuro") {
      document.body.classList.add("dark-mode");
      if (botao) botao.textContent = "Alto Contraste";
    } else if (tema === "alto") {
      document.body.classList.add("alto-contraste");
      if (botao) botao.textContent = "Modo Claro";
    } else {
      if (botao) botao.textContent = "Modo Escuro";
    }
  }

  // Alterna entre os temas em ciclo
  function alternarTema() {
    const temaAtual = localStorage.getItem("tema") || "claro";
    let novoTema;

    if (temaAtual === "claro") novoTema = "escuro";
    else if (temaAtual === "escuro") novoTema = "alto";
    else novoTema = "claro";

    localStorage.setItem("tema", novoTema);
    aplicarTema();
  }

  // Ativa o botão (existe em todas as páginas)
  const botaoTema = document.getElementById("toggle-tema");
  if (botaoTema) botaoTema.addEventListener("click", alternarTema);

  // Aplica o tema salvo no carregamento
  aplicarTema();

  /* ---------------------------------------------------------
     Acessibilidade: foco visível e formulários
     --------------------------------------------------------- */
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

  // Lazy loading de imagens
  document.querySelectorAll("img").forEach(img => img.setAttribute("loading", "lazy"));
});
