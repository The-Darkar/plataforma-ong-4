document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll("nav a");

  // Função para carregar páginas internas sem recarregar o site (SPA)
  async function loadPage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Página não encontrada");
      const html = await response.text();

      // Cria um container temporário pra manipular o HTML recebido
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Remove header e footer da página carregada (mantemos os da index)
      temp.querySelectorAll("header, footer").forEach(el => el.remove());

      // Seleciona o conteúdo principal
      const main = temp.querySelector("main, #content") || temp;

      // Atualiza o conteúdo na página atual
      content.innerHTML = main.innerHTML;

      // Reaplica as máscaras e validações após trocar o conteúdo
      initMasks();
    } catch (error) {
      content.innerHTML = `<p>Erro ao carregar a página: ${error.message}</p>`;
    }
  }

  // Evento nos links do menu
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      loadPage(href);
      history.pushState({ page: href }, "", href);
    });
  });

  // Suporte ao botão "voltar" do navegador
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      loadPage("index.html");
    }
  });

  // Função que aplica máscaras e validação nos formulários
  function initMasks() {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
