document.addEventListener("DOMContentLoaded", () => {
  const botaoTema = document.getElementById("toggle-tema");

  // mantém o estado atual no body via data-attribute (somente durante a sessão)
  function aplicarTema(tema) {
    document.body.classList.remove("dark-mode", "alto-contraste");
    document.body.removeAttribute("data-modo");

    if (tema === "escuro") {
      document.body.classList.add("dark-mode");
      document.body.setAttribute("data-modo", "escuro");
      if (botaoTema) botaoTema.textContent = "Alto Contraste";
    } else if (tema === "alto") {
      document.body.classList.add("alto-contraste");
      document.body.setAttribute("data-modo", "alto");
      if (botaoTema) botaoTema.textContent = "Padrão";
    } else {
      // padrão
      if (botaoTema) botaoTema.textContent = "Modo Escuro";
      document.body.setAttribute("data-modo", "padrao");
    }
  }

  function alternarTema() {
    const atual = document.body.getAttribute("data-modo") || "padrao";
    const proximo = atual === "padrao" ? "escuro" : (atual === "escuro" ? "alto" : "padrao");
    aplicarTema(proximo);
  }

  // inicia SEM aplicar tema salvo: sempre padrão
  aplicarTema("padrao");

  if (botaoTema) {
    // remove listeners antigos (se houver) e reaplica um único listener seguro
    botaoTema.replaceWith(botaoTema.cloneNode(true));
    const novoBtn = document.getElementById("toggle-tema");
    if (novoBtn) novoBtn.addEventListener("click", alternarTema);
  }

  /* Validação simples de formulários (preservando seu comportamento) */
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
      let valido = true;
      inputs.forEach(input => {
        if (!input.value || !input.value.trim()) {
          valido = false;
          input.style.border = "2px solid red";
          input.setAttribute("aria-invalid", "true");
        } else {
          input.style.border = "1px solid #ccc";
          input.setAttribute("aria-invalid", "false");
        }
      });

      if (valido) {
        alert("Cadastro/Contato enviado com sucesso!");
        form.reset();
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    });
  });

  /* Máscara de telefone (se existir campo telefone) */
  const telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", () => {
      telefone.value = telefone.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        .substring(0, 15);
    });
  }

  /* Lazy loading em todas as imagens */
  document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });
});
