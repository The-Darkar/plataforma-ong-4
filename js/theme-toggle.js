document.addEventListener("DOMContentLoaded", () => {
  // seleciona botões existentes
  const darkBtn = document.getElementById("btn-dark-mode");
  const contrastBtn = document.getElementById("btn-contrast");

  let currentTheme = localStorage.getItem("theme") || "light";

  applyTheme(currentTheme);

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      if (currentTheme === "dark") currentTheme = "light";
      else currentTheme = "dark";
      localStorage.setItem("theme", currentTheme);
      applyTheme(currentTheme);
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      if (currentTheme === "contrast") currentTheme = "light";
      else currentTheme = "contrast";
      localStorage.setItem("theme", currentTheme);
      applyTheme(currentTheme);
    });
  }

  function applyTheme(theme) {
    document.body.classList.remove("dark-mode", "high-contrast");

    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else if (theme === "contrast") {
      document.body.classList.add("high-contrast");
    }
  }
});
