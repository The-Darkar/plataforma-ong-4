# 🌐 Plataforma Web para ONGs – ONG Esperança

Este projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Front-End**, com o objetivo principal de criar uma plataforma digital para Organizações Não Governamentais (ONGs). O foco do desenvolvimento está na aplicação prática de **HTML5 semântico, CSS3 responsivo** e **JavaScript moderno**, com ênfase rigorosa na **Acessibilidade Web (WCAG)**.

## 🚀 Diferenciais e Foco Técnico

| Recurso | Descrição |
| :--- | :--- |
| **Acessibilidade (WCAG 2.1)** | Implementação de navegação por teclado (`skip-link`), uso correto de atributos `aria-*`, e validação de formulários com feedback acessível. |
| **Design Acessível** | Implementação de **Modo de Alto Contraste** e **Modo Escuro (Dark Mode)** para atender aos critérios de contraste (WCAG 1.4.3). |
| **SPA (Single Page Application)** | Navegação dinâmica entre páginas (`index.html`, `projetos.html`, `cadastro.html`) utilizando a API `History` e `fetch`, proporcionando uma experiência fluida sem recarregar o navegador. |
| **Validação e Máscaras** | Validação customizada e acessível de todos os campos. Implementação de máscaras para **Telefone**, **CPF** e **CEP** em tempo real. |

## 📌 Objetivos Acadêmicos Atendidos
* Criar uma estrutura HTML5 **semântica** e **acessível** (`<header>`, `<main role="main">`, `aria-label`).
* Desenvolver um design **totalmente responsivo** utilizando CSS3.
* Implementar a lógica de navegação SPA com manipulação assíncrona do DOM.
* Centralizar toda a lógica (validação e interação) no arquivo `script.js`, **eliminando scripts inline**.

## 🧩 Estrutura do Projeto
A organização dos arquivos segue o padrão de desenvolvimento Front-End:

plataforma-ong-3/ ├── assets/ │   └── img/ # Imagens e mídia do projeto ├── css/ │   └── style.css # Estilos principais e responsividade │   └── theme.css # Estilos para os modos de acessibilidade (Contraste/Escuro) ├── js/ │   └── script.js # Lógica SPA, Máscaras e Validação Acessível ├── index.html # Página Inicial ├── projetos.html # Detalhes dos Projetos └── cadastro.html # Formulário de Voluntariado

## 🧪 Tecnologias Utilizadas
* **HTML5**: Estrutura semântica e acessível.
* **CSS3**: Flexbox, Media Queries e Variáveis CSS para temas.
* **JavaScript (ES6+)**: Manipulação do DOM, `fetch`, API `History`, e `localStorage` para persistência dos modos de acessibilidade.

---
