document.addEventListener('DOMContentLoaded', () => {
  const TEMPO_FOCO = 25 * 60; // 25 minutos em segundos
  const TEMPO_DESCANSO_CURTO = 5 * 60; // 5 minutos em segundos
  const TEMPO_DESCANSO_LONGO = 15 * 60; // 15 minutos em segundos
  
  const html = document.querySelector('html');
  const timerDisplay = document.getElementById('timer');
  const buttons = document.querySelectorAll('.app__card-button');
  const startButton = document.getElementById('startButton');
  const relaxModeContainer = document.getElementById('relaxationMode');
  const relaxationAudio = document.getElementById('relaxationAudio');
  const musicToggle = document.getElementById('musicToggle').checked;

  
  let countdown;
  let currentMode = 'foco';

  function startTimer(duration, mode) {
      clearInterval(countdown);
      const start = Date.now();
      const end = start + duration * 1000;
      displayTimeLeft(duration);
      const musicToggle = document.getElementById('musicToggle').checked;

      
      // Inicia ou pausa a música baseado tanto no modo quanto na preferência do usuário
      if (musicToggle && mode !== 'foco') {
        relaxModeContainer.style.display = 'block';
        relaxationAudio.play();
    } else {
        relaxModeContainer.style.display = 'none';
        relaxationAudio.pause();
        relaxationAudio.currentTime = 0;
    }
     

      countdown = setInterval(() => {
          const secondsLeft = Math.round((end - Date.now()) / 1000);
          
          if (secondsLeft < 0) {
              clearInterval(countdown);
              relaxationAudio.pause(); // Para a música quando o tempo acabar
              relaxationAudio.currentTime = 0; // reinicia a música
              return;
          }
          displayTimeLeft(secondsLeft);
      }, 1000);
  }

  function displayTimeLeft(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
      document.title = timerDisplay.textContent;
  }

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          currentMode = this.getAttribute('data-contexto');
          
      });
  });

  startButton.addEventListener('click', () => {
      if (currentMode === 'foco') {
          startTimer(TEMPO_FOCO, currentMode);
      } else if (currentMode === 'short') {
          startTimer(TEMPO_DESCANSO_CURTO, currentMode);
      } else if (currentMode === 'long') {
          startTimer(TEMPO_DESCANSO_LONGO, currentMode);
      }
  });

  // Novo código: para lidar com mudanças na preferência de música durante uma sessão
  document.getElementById('musicToggle').addEventListener('change', (event) => {
    if (!musicToggle.checked) {
        relaxationAudio.pause();
        relaxationAudio.currentTime = 0;
    } else if (currentMode !== 'foco') {
        relaxationAudio.play();
    }
  });
  
  startTimer(TEMPO_FOCO, currentMode);
});
  