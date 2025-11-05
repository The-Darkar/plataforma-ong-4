document.addEventListener("DOMContentLoaded", () => {
  const botaoTema = document.getElementById("toggle-tema");

  function aplicarTema() {
    const tema = localStorage.getItem("tema") || "claro";
    document.body.classList.remove("dark-mode", "alto-contraste");

    if (tema === "escuro") {
      document.body.classList.add("dark-mode");
      if (botaoTema) botaoTema.textContent = "Alto Contraste";
    } else if (tema === "alto") {
      document.body.classList.add("alto-contraste");
      if (botaoTema) botaoTema.textContent = "Modo Claro";
    } else {
      if (botaoTema) botaoTema.textContent = "Modo Escuro";
    }
  }

  function alternarTema() {
    const temaAtual = localStorage.getItem("tema") || "claro";
    let novoTema;
    if (temaAtual === "claro") novoTema = "escuro";
    else if (temaAtual === "escuro") novoTema = "alto";
    else novoTema = "claro";
    localStorage.setItem("tema", novoTema);
    aplicarTema();
  }

  if (botaoTema) botaoTema.addEventListener("click", alternarTema);
  aplicarTema();

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
        } else {
          input.style.border = "1px solid #ccc";
        }
      });
      if (valido) {
        alert("Cadastro enviado com sucesso!");
        form.reset();
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    });
  });

  const telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", () => {
      telefone.value = telefone.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    });
  }

  document.querySelectorAll("img").forEach(img => img.setAttribute("loading", "lazy"));
});
