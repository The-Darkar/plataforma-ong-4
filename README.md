# 🌐 Plataforma Web Acessível para ONGs – Entrega IV

Este projeto foi desenvolvido como parte da disciplina de **Desenvolvimento Front-End**, com o objetivo de criar uma aplicação web acessível e otimizada para **Organizações Não Governamentais (ONGs)**.  
A proposta é promover inclusão digital, acessibilidade e impacto social através de uma interface moderna e responsiva.

---

## 🎯 Objetivos Gerais
- Consolidar práticas de **versionamento profissional** (GitFlow e versionamento semântico).  
- Implementar **acessibilidade total (WCAG 2.1 Nível AA)**.  
- Otimizar o código para **deploy em ambiente de produção**.  
- Desenvolver documentação técnica completa e clara.  

---

## 🧩 Estrutura do Projeto

plataforma-ong/
├── assets/
│ └── img/
├── css/
│ └── style.css
├── js/
│ └── script.js
├── index.html
├── projetos.html
├── cadastro.html
└── README.md


**Descrição dos arquivos:**
- **index.html** → Página inicial com informações institucionais e formulário de contato.  
- **projetos.html** → Apresenta projetos em andamento e detalhes de impacto social.  
- **cadastro.html** → Formulário de cadastro de voluntários com validação acessível.  
- **style.css** → Define a identidade visual, modo escuro, alto contraste e responsividade.  
- **script.js** → Controla interações (temas, formulários, acessibilidade e otimização).  

---

## ⚙️ Tecnologias Utilizadas
- **HTML5** – Estrutura semântica e suporte a leitores de tela.  
- **CSS3** – Responsividade, contraste adequado e design acessível.  
- **JavaScript (ES6)** – Interatividade, validação e controle de temas.  
- **Git & GitHub** – Versionamento com GitFlow, issues e milestones.  

---

## ♿ Acessibilidade (WCAG 2.1 Nível AA)
O projeto segue as recomendações do **W3C Web Content Accessibility Guidelines (WCAG)**:  
- ✅ Estrutura semântica com `header`, `main`, `footer`, `nav`, `section`, `address`, etc.  
- ✅ Navegação **por teclado (TAB / SHIFT+TAB)**.  
- ✅ **Contraste mínimo 4.5:1** entre fundo e texto.  
- ✅ **Leitores de tela compatíveis** (`aria-label`, `aria-pressed`, `aria-hidden`).  
- ✅ **Modo escuro e alto contraste** com persistência via `localStorage`.  
- ✅ **Link de salto (“Pular para conteúdo”)** no início da página.  

---

## 🚀 Otimização para Produção
- **Minificação** de HTML, CSS e JS (via ferramentas externas, ex: Terser / CSSNano).  
- **Imagens comprimidas** no diretório `assets/img`.  
- **Lazy loading** implementado via atributo `loading="lazy"`.  
- **Cache control** configurável para ambiente de deploy (GitHub Pages ou Vercel).  

---

## 🌱 Versionamento e GitFlow
O projeto segue a metodologia **GitFlow**:

| Branch | Função |
|--------|--------|
| `main` | Versão estável em produção. |
| `develop` | Desenvolvimento contínuo. |
| `feature/*` | Implementação de novas funcionalidades. |
| `release/*` | Preparação de novas versões. |
| `hotfix/*` | Correções emergenciais em produção. |


