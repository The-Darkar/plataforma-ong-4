document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Cria os botões se não existirem
  let controls = document.querySelector(".theme-controls");
  if (!controls) {
    controls = document.createElement("div");
    controls.className = "theme-controls";
    controls.innerHTML = `
      <button id="btn-dark-mode" aria-pressed="false">🌙 Modo Escuro</button>
      <button id="btn-high-contrast" aria-pressed="false">🔳 Alto Contraste</button>
    `;
    document.body.prepend(controls);
  }

  const btnDark = document.getElementById("btn-dark-mode");
  const btnContrast = document.getElementById("btn-high-contrast");

  // Recupera estado salvo
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    btnDark.setAttribute("aria-pressed", "true");
  } else if (savedTheme === "contrast") {
    body.classList.add("high-contrast");
    btnContrast.setAttribute("aria-pressed", "true");
  }

  // Função de ativar/desativar tema
  function toggleTheme(mode) {
    if (mode === "dark") {
      const isActive = body.classList.toggle("dark-mode");
      if (isActive) {
        body.classList.remove("high-contrast");
        btnContrast.setAttribute("aria-pressed", "false");
        btnDark.setAttribute("aria-pressed", "true");
        localStorage.setItem("theme", "dark");
      } else {
        btnDark.setAttribute("aria-pressed", "false");
        localStorage.removeItem("theme");
      }
    } else if (mode === "contrast") {
      const isActive = body.classList.toggle("high-contrast");
      if (isActive) {
        body.classList.remove("dark-mode");
        btnDark.setAttribute("aria-pressed", "false");
        btnContrast.setAttribute("aria-pressed", "true");
        localStorage.setItem("theme", "contrast");
      } else {
        btnContrast.setAttribute("aria-pressed", "false");
        localStorage.removeItem("theme");
      }
    }
  }

  btnDark.addEventListener("click", () => toggleTheme("dark"));
  btnContrast.addEventListener("click", () => toggleTheme("contrast"));
});
