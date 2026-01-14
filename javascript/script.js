// Aguarda o carregamento completo do DOM para garantir que todos os elementos existam
document.addEventListener("DOMContentLoaded", function () {
  // ===== Sistema de Modais =====

  // Função reutilizável para inicializar uma janela modal
  function initializeModal(triggerId, modalId) {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const closeButton = modal.querySelector(".close");

    if (!trigger || !modal || !closeButton) {
      console.error(
        "Modal ou gatilho não encontrado para:",
        triggerId,
        modalId
      );
      return;
    }

    // Abrir o modal
    trigger.onclick = function (event) {
      event.preventDefault(); // Impede que o link '#' navegue para o topo da página
      modal.style.display = "block";
    };

    // Fechar com o botão 'X'
    closeButton.onclick = function () {
      modal.style.display = "none";
    };

    // Fechar clicando fora
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // Inicializa as janelas modais
  initializeModal("diploma-trigger", "diploma-modal");
  initializeModal("mentoria-trigger", "mentoria-modal");
  initializeModal("php-trigger", "php-modal");
  initializeModal("java-trigger", "java-modal");

  // ===== Sistema de Troca de Idioma =====

  // Idioma atual (padrão: português)
  let idiomaAtual = "pt";

  // Elementos do botão de idioma
  const botaoIdioma = document.getElementById("botao-idioma");
  const textoIdioma = botaoIdioma.querySelector(".texto-idioma");
  const tituloOriginal = document.querySelector("title");

  // Títulos da página em cada idioma
  const titulos = {
    pt: "Currículo - Danillo Teles Carneiro",
    en: "Resume - Danillo Teles Carneiro",
  };

  // Tooltips do botão em cada idioma
  const tooltips = {
    pt: "Switch to English",
    en: "Mudar para Português",
  };

  // Carrega o idioma salvo no localStorage (se existir)
  function carregarPreferenciaIdioma() {
    const idiomaSalvo = localStorage.getItem("idioma-curriculo");
    if (idiomaSalvo && (idiomaSalvo === "pt" || idiomaSalvo === "en")) {
      idiomaAtual = idiomaSalvo;
      aplicarIdioma(idiomaAtual, false); // Aplica sem animação no carregamento inicial
    }
  }

  // Salva a preferência de idioma no localStorage
  function salvarPreferenciaIdioma(idioma) {
    localStorage.setItem("idioma-curriculo", idioma);
  }

  // Aplica o idioma selecionado a todos os elementos traduzíveis
  function aplicarIdioma(idioma, comAnimacao = true) {
    const elementosTraduzíveis = document.querySelectorAll(".traduzivel");

    if (comAnimacao) {
      // Adiciona classe de animação (fade out)
      elementosTraduzíveis.forEach((elemento) => {
        elemento.classList.add("traduzindo");
      });

      // Aguarda a animação de fade out, troca o texto, e faz fade in
      setTimeout(() => {
        trocarTextos(idioma, elementosTraduzíveis);

        // Remove a classe de animação (fade in)
        elementosTraduzíveis.forEach((elemento) => {
          elemento.classList.remove("traduzindo");
        });
      }, 300);
    } else {
      // Sem animação (para carregamento inicial)
      trocarTextos(idioma, elementosTraduzíveis);
    }

    // Atualiza o título da página
    document.title = titulos[idioma];

    // Atualiza o atributo lang do HTML
    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";

    // Atualiza o botão
    atualizarBotaoIdioma(idioma);
  }

  // Troca os textos de todos os elementos traduzíveis
  function trocarTextos(idioma, elementos) {
    elementos.forEach((elemento) => {
      const texto = elemento.getAttribute(`data-${idioma}`);
      if (texto) {
        // Usa innerHTML para preservar tags HTML internas (como <strong>)
        elemento.innerHTML = texto;
      }
    });
  }

  // Atualiza o texto e tooltip do botão de idioma
  function atualizarBotaoIdioma(idiomaAtualizado) {
    // Mostra o idioma OPOSTO (para onde vai mudar ao clicar)
    const idiomaExibido = idiomaAtualizado === "pt" ? "EN" : "PT";
    textoIdioma.textContent = idiomaExibido;

    // Atualiza o tooltip
    botaoIdioma.title = tooltips[idiomaAtualizado];
  }

  // Alterna entre os idiomas
  function alternarIdioma() {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    aplicarIdioma(idiomaAtual, true);
    salvarPreferenciaIdioma(idiomaAtual);
  }

  // Event listener para o botão de idioma
  botaoIdioma.addEventListener("click", alternarIdioma);

  // Carrega a preferência de idioma ao iniciar
  carregarPreferenciaIdioma();
});
