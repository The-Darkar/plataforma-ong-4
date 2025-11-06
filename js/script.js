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
      
      const newContent = temp.querySelector("main, #content") || temp;
      content.innerHTML = newContent.innerHTML;
      
      initPageSpecificScripts();
      updateNavLinks(url);

    } catch (error) {
      content.innerHTML = `<p class="alert">Erro ao carregar a página: ${error.message}</p>`;
    }
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      
      if (window.location.pathname.endsWith(href)) return;

      loadPage(href);
      history.pushState({ page: href }, "", href);
    });
  });

  window.addEventListener("popstate", (event) => {
    const page = (event.state && event.state.page) ? event.state.page : "index.html";
    loadPage(page);
  });

  function updateNavLinks(url) {
    document.querySelectorAll("nav a").forEach(link => { 
      const linkHref = link.getAttribute("href").split('/').pop();
      const currentUrl = url.split('/').pop();
      
      if (linkHref === currentUrl) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function initPageSpecificScripts() {
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
      initFormValidation(formCadastro, 'success-message');
    }
    
    const formContato = document.getElementById("formContato");
    if (formContato) {
      initFormValidation(formContato, 'contato-success-message');
    }

    const telefone = document.getElementById("telefone");
    if (telefone) {
      initMascaraTelefone(telefone);
    }
  }

  function initMascaraTelefone(telefoneInput) {
    telefoneInput.addEventListener("input", () => {
      let valor = telefoneInput.value.replace(/\D/g, "");
      valor = valor.substring(0, 11);

      if (valor.length > 10) {
        telefoneInput.value = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (valor.length > 6) {
        telefoneInput.value = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else if (valor.length > 2) {
        telefoneInput.value = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      } else if (valor.length > 0) {
        telefoneInput.value = valor.replace(/(\d{0,2})/, "($1");
      }
    });
  }

  function initFormValidation(form, successMessageId) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      clearErrors(form);
      const successMessage = document.getElementById(successMessageId);
      if(successMessage) successMessage.textContent = '';

      if (!form.checkValidity()) {
        showErrors(form);
        form.querySelector('[aria-invalid="true"]').focus();
      } else {
        if(successMessage) successMessage.textContent = "Formulário enviado com sucesso!";
        form.reset();
        form.querySelectorAll('[aria-invalid]').forEach(input => {
          input.setAttribute('aria-invalid', 'false');
        });
      }
    });
  }

  function showErrors(form) {
    form.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
      const field = input;
      const errorId = field.getAttribute('aria-describedby');
      if (!errorId) return;
      
      const errorElement = document.getElementById(errorId);
      if (!field.validity.valid) {
        field.setAttribute('aria-invalid', 'true');
        
        if (field.validity.valueMissing) {
          errorElement.textContent = 'Este campo é obrigatório.';
        } else if (field.validity.typeMismatch) {
          errorElement.textContent = 'Por favor, insira um formato válido.';
        } else if (field.id === 'telefone' && (field.value.replace(/\D/g, "").length < 10)) {
          errorElement.textContent = 'Telefone inválido. Use (XX) XXXXX-XXXX.';
        }
      }
    });
  }

  function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(error => {
      error.textContent = '';
    });
    form.querySelectorAll('[aria-invalid]').forEach(input => {
      input.setAttribute('aria-invalid', 'false');
    });
  }
  
  function initAccessibilityControls() {
    const body = document.body;
    const contrastButton = document.getElementById('toggle-contrast');
    const darkButton = document.getElementById('toggle-darkmode');
    
    function toggleMode(className, button) {
      const isActive = body.classList.toggle(className);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      localStorage.setItem(className, isActive ? 'true' : 'false');
    }

    if (contrastButton) {
      contrastButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode') && darkButton) {
          toggleMode('dark-mode', darkButton);
        }
        toggleMode('high-contrast', contrastButton);
      });
    }

    if (darkButton) {
      darkButton.addEventListener('click', () => {
        if (body.classList.contains('high-contrast') && contrastButton) {
          toggleMode('high-contrast', contrastButton);
        }
        toggleMode('dark-mode', darkButton);
      });
    }

    function loadSavedState() {
      if (localStorage.getItem('high-contrast') === 'true') {
        body.classList.add('high-contrast');
        if (contrastButton) contrastButton.setAttribute('aria-pressed', 'true');
      }
      if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        if (darkButton) darkButton.setAttribute('aria-pressed', 'true');
      }
    }

    loadSavedState();
  }

  initAccessibilityControls();
  initPageSpecificScripts(); 
  
  const initialUrl = window.location.pathname.split('/').pop() || "index.html";
  loadPage(initialUrl);
});
