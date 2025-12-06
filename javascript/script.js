// Aguarda o carregamento completo do DOM para garantir que todos os elementos existam
document.addEventListener('DOMContentLoaded', function() {

    // Função reutilizável para inicializar uma janela modal
    function initializeModal(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const closeButton = modal.querySelector('.close');

        if (!trigger || !modal || !closeButton) {
            console.error("Modal ou gatilho não encontrado para:", triggerId, modalId);
            return;
        }

        // Abrir o modal
        trigger.onclick = function(event) {
            event.preventDefault(); // Impede que o link '#' navegue para o topo da página
            modal.style.display = "block";
        }

        // Fechar com o botão 'X'
        closeButton.onclick = function() {
            modal.style.display = "none";
        }

        // Fechar clicando fora
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // Inicializa as janelas modais
    initializeModal('diploma-trigger', 'diploma-modal');
    initializeModal('mentoria-trigger', 'mentoria-modal');
    initializeModal('php-trigger', 'php-modal');
    initializeModal('java-trigger', 'java-modal');

});