/* =========================================================
   PORTFÓLIO — script.js
   Cada bloco abaixo está comentado para facilitar o entendimento.
   ========================================================= */

/* ---------------------------------------------------------
   1. LISTA DE PROJETOS
   Edite/adicione objetos neste array para atualizar os cards
   da seção "Meus Projetos" — o HTML é gerado automaticamente.
   --------------------------------------------------------- */
const projetos = [
  {
    nome: "Nome do Projeto 1",
    descricao: "Breve descrição do que o projeto faz e qual problema ele resolve.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/seu-usuario/seu-projeto-1",
    projeto: "https://seu-projeto-1.com"
  },
  {
    nome: "Nome do Projeto 2",
    descricao: "Breve descrição do que o projeto faz e qual problema ele resolve.",
    tecnologias: ["JavaScript", "API"],
    github: "https://github.com/seu-usuario/seu-projeto-2",
    projeto: "https://seu-projeto-2.com"
  },
  {
    nome: "Nome do Projeto 3",
    descricao: "Breve descrição do que o projeto faz e qual problema ele resolve.",
    tecnologias: ["HTML", "CSS"],
    github: "https://github.com/seu-usuario/seu-projeto-3",
    projeto: "https://seu-projeto-3.com"
  }
];

/* ---------------------------------------------------------
   2. GERAR OS CARDS DE PROJETO A PARTIR DO ARRAY
   --------------------------------------------------------- */
function renderizarProjetos() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  // para cada projeto do array, criamos um card e adicionamos na grade
  projetos.forEach((projeto) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    // ícone simples com as iniciais do nome do projeto
    const iniciais = projeto.nome
      .split(" ")
      .map((palavra) => palavra[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    // tags de tecnologias
    const tagsHtml = projeto.tecnologias
      .map((tech) => `<span class="tech-pill">${tech}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-icon" aria-hidden="true">${iniciais}</div>
      <h3 class="project-name">${projeto.nome}</h3>
      <p class="project-desc">${projeto.descricao}</p>
      <div class="project-tech">${tagsHtml}</div>
      <div class="project-actions">
        <a class="btn btn-primary btn-small" href="${projeto.projeto}" target="_blank" rel="noopener noreferrer">Ver projeto</a>
        <a class="btn btn-outline btn-small" href="${projeto.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    `;

    grid.appendChild(card);
  });

  // depois de criar os cards, ativamos a observação para a animação de entrada
  observarElementosReveal();
}

/* ---------------------------------------------------------
   3. MENU MOBILE (HAMBÚRGUER)
   --------------------------------------------------------- */
function configurarMenuMobile() {
  const botao = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    botao.classList.toggle("open", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
  });

  // fecha o menu automaticamente ao clicar em um link (útil no celular)
  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botao.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   4. ROLAGEM SUAVE PARA OS LINKS DO MENU
   (o CSS "scroll-behavior: smooth" já ajuda, isso reforça
   o comportamento e funciona mesmo em navegadores mais antigos)
   --------------------------------------------------------- */
function configurarRolagemSuave() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = document.querySelector(link.getAttribute("href"));
      if (!destino) return;

      evento.preventDefault();
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---------------------------------------------------------
   5. SOMBRA NO CABEÇALHO AO ROLAR A PÁGINA
   --------------------------------------------------------- */
function configurarCabecalhoComScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}

/* ---------------------------------------------------------
   6. DESTACAR O LINK DO MENU CORRESPONDENTE À SEÇÃO VISÍVEL
   --------------------------------------------------------- */
function configurarLinkAtivo() {
  const secoes = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!secoes.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const idAtual = entrada.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${idAtual}`);
        });
      });
    },
    { rootMargin: "-50% 0px -45% 0px" }
  );

  secoes.forEach((secao) => observer.observe(secao));
}

/* ---------------------------------------------------------
   7. ANIMAÇÃO DE ENTRADA DOS ELEMENTOS AO APARECEREM NA TELA
   Elementos com a classe "reveal" ganham a classe
   "reveal-visible" (definida no CSS) quando entram na viewport.
   --------------------------------------------------------- */
function observarElementosReveal() {
  const elementos = document.querySelectorAll(".reveal:not(.reveal-visible)");
  if (!elementos.length) return;

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal-visible");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((elemento) => observer.observe(elemento));
}

/* ---------------------------------------------------------
   INICIALIZAÇÃO
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderizarProjetos();
  configurarMenuMobile();
  configurarRolagemSuave();
  configurarCabecalhoComScroll();
  configurarLinkAtivo();
  observarElementosReveal();
});
