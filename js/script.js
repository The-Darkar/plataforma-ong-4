// js/theme-toggle.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleDark = document.getElementById("toggle-dark");
  const toggleContrast = document.getElementById("toggle-contrast");

  // Salva tema no localStorage para manter a preferência do usuário
  const savedTheme = localStorage.getItem("theme");
  const savedContrast = localStorage.getItem("contrast");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleDark.setAttribute("aria-pressed", "true");
  }

  if (savedContrast === "high") {
    document.body.classList.add("high-contrast");
    toggleContrast.setAttribute("aria-pressed", "true");
  }

  // Alternar modo escuro
  toggleDark.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleDark.setAttribute("aria-pressed", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Alternar alto contraste
  toggleContrast.addEventListener("click", () => {
    const isHigh = document.body.classList.toggle("high-contrast");
    toggleContrast.setAttribute("aria-pressed", isHigh);
    localStorage.setItem("contrast", isHigh ? "high" : "normal");
  });

  // Foco visível ao navegar por teclado
  let isUsingKeyboard = false;
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      isUsingKeyboard = true;
      document.body.classList.add("using-keyboard");
    }
  });

  window.addEventListener("mousedown", () => {
    if (isUsingKeyboard) {
      isUsingKeyboard = false;
      document.body.classList.remove("using-keyboard");
    }
  });
});
