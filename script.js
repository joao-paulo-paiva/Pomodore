document.addEventListener('DOMContentLoaded', () => {
    const TEMPO_FOCO = 25 * 60; // 25 minutos em segundos
    const TEMPO_DESCANSO_CURTO = 5 * 60; // 5 minutos em segundos
    const TEMPO_DESCANSO_LONGO = 15 * 60; // 15 minutos em segundos
    
    const html = document.querySelector('html');
    const timerDisplay = document.getElementById('timer');
    const buttons = document.querySelectorAll('.app__card-button');
    const startButton = document.getElementById('startButton'); // O botão "Começar"
    const focoBt = document.querySelector('.app__card-button--foco')
    const curtoBt = document.querySelector('.app__card-button--curto')
    const longoBt = document.querySelector('.app__card-button--longo')

    
    focoBt.addEventListener('click', () => {
      html.setAttribute('data-contexto','foco')
    })
    curtoBt.addEventListener('click', () =>{
        html.setAttribute('data-contexto','short')
    })
    longoBt.addEventListener('click', () =>{
        html.setAttribute('data-contexto', 'long')
    })

    let countdown;
    let currentMode = 'foco'; // Modo padrão inicial
  
    function startTimer(duration) {
      clearInterval(countdown); // Limpar contagens regressivas existentes
      const start = Date.now();
      const end = start + duration * 1000;
      displayTimeLeft(duration);
      
      countdown = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);
        
        if (secondsLeft < 0) {
          clearInterval(countdown);
          return;
        }
        displayTimeLeft(secondsLeft);
      }, 1000);
    }
  
    function displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
      document.title = timerDisplay.textContent; // Opcional: também atualiza o título da aba do navegador
    }
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active')); // Remove active de todos os botões
        this.classList.add('active'); // Adiciona active no botão clicado
        currentMode = this.getAttribute('data-contexto'); // Atualiza o modo corrente
      });
    });
  
    startButton.addEventListener('click', () => {
      if (currentMode === 'foco') {
        startTimer(TEMPO_FOCO);
      } else if (currentMode === 'short') {
        startTimer(TEMPO_DESCANSO_CURTO);
      } else if (currentMode === 'long') {
        startTimer(TEMPO_DESCANSO_LONGO);
      }
    });
    
    // Aqui você pode definir se o temporizador deve começar automaticamente ou não
     startTimer(TEMPO_FOCO);
  });
  
  
  