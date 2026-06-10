/* ============================================================
   ISABELA & VITOR HUGO — script.js
   ============================================================ */

/* ---- Contador de namoro ---- */

const INICIO = new Date('2025-12-13T00:00:00');

function atualizarContador() {
  const agora = new Date();
  const diff  = agora - INICIO;

  if (diff < 0) return;

  const totalSeg  = Math.floor(diff / 1000);
  const totalMin  = Math.floor(totalSeg  / 60);
  const totalHora = Math.floor(totalMin  / 60);
  const totalDias = Math.floor(totalHora / 24);

  const seg   = totalSeg  % 60;
  const min   = totalMin  % 60;
  const horas = totalHora % 24;

  /* Cálculo de anos e meses completos */
  let anos  = agora.getFullYear() - INICIO.getFullYear();
  let meses = agora.getMonth()    - INICIO.getMonth();

  if (meses < 0) {
    anos  -= 1;
    meses += 12;
  }

  /* Dias restantes após os meses completos */
  const baseRef = new Date(INICIO);
  baseRef.setFullYear(baseRef.getFullYear() + anos);
  baseRef.setMonth(baseRef.getMonth() + meses);
  const diasRestantes = Math.floor((agora - baseRef) / (1000 * 60 * 60 * 24));

  set('c-anos',  String(anos).padStart(2, '0'));
  set('c-meses', String(meses).padStart(2, '0'));
  set('c-dias',  String(diasRestantes).padStart(2, '0'));
  set('c-horas', String(horas).padStart(2, '0'));
  set('c-min',   String(min).padStart(2, '0'));
  set('c-seg',   String(seg).padStart(2, '0'));
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

atualizarContador();
setInterval(atualizarContador, 1000);

/* ---- Lightbox da galeria ---- */

const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbClose    = document.getElementById('lb-close');
const galeriaItens = document.querySelectorAll('.galeria-item img');

galeriaItens.forEach(function(img) {
  img.addEventListener('click', function() {
    if (this.classList.contains('img-erro')) return;
    lbImg.src = this.src;
    lbImg.alt = this.alt;
    lightbox.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  });
});

lbClose.addEventListener('click', fecharLightbox);

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharLightbox();
});

function fecharLightbox() {
  lightbox.classList.remove('ativo');
  document.body.style.overflow = '';
  lbImg.src = '';
}

/* ---- Animação de entrada nos momentos ---- */

const momentos = document.querySelectorAll('.momento-content');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  momentos.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

/* ============================================================
   PLAYER DE MÚSICA
   ============================================================ */

class MusicPlayer {
  constructor() {
    this.audios = {};
    this.currentAudio = null;
    this.currentCard = null;
    this.init();
  }

  init() {
    // Encontrar todos os botões de play
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(btn => {
      const audioId = btn.getAttribute('data-audio');
      const audio = document.getElementById(audioId);
      
      if (audio) {
        this.audios[audioId] = audio;
        
        // Adicionar evento de clique
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.togglePlay(audioId, btn);
        });
        
        // Quando a música terminar
        audio.addEventListener('ended', () => {
          this.stopPlayback(btn);
        });
      }
    });
    
    // Botão para parar todas as músicas
    const stopAllBtn = document.getElementById('stopAllBtn');
    if (stopAllBtn) {
      stopAllBtn.addEventListener('click', () => this.stopAll());
    }
  }
  
  togglePlay(audioId, button) {
    const audio = this.audios[audioId];
    const card = button.closest('.musica-card');
    
    if (!audio) return;
    
    // Se tem outra música tocando
    if (this.currentAudio && this.currentAudio !== audio) {
      this.stopPlayback(this.getButtonFromAudio(this.currentAudio));
    }
    
    // Tocar ou pausar
    if (audio.paused) {
      audio.play().catch(err => {
        console.log('Erro ao tocar: ', err);
        this.showNotification('⚠️ Clique na página para permitir o áudio', 'erro');
      });
      this.setPlayingState(button, card, true);
      this.currentAudio = audio;
      this.currentCard = card;
      this.updateGlobalPlayer(card, 'tocando agora ♪');
    } else {
      audio.pause();
      this.setPlayingState(button, card, false);
      this.currentAudio = null;
      this.currentCard = null;
      this.hideGlobalPlayer();
    }
  }
  
  stopPlayback(button) {
    if (!button) return;
    
    const audioId = button.getAttribute('data-audio');
    const audio = this.audios[audioId];
    const card = button.closest('.musica-card');
    
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.setPlayingState(button, card, false);
    }
  }
  
  stopAll() {
    Object.values(this.audios).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    document.querySelectorAll('.play-btn').forEach(btn => {
      this.setPlayingState(btn, btn.closest('.musica-card'), false);
    });
    
    this.currentAudio = null;
    this.currentCard = null;
    this.hideGlobalPlayer();
    this.showNotification('⏹ Todas as músicas foram paradas', 'info');
  }
  
  setPlayingState(button, card, isPlaying) {
    const playIcon = button.querySelector('.play-icon');
    const pauseIcon = button.querySelector('.pause-icon');
    const buttonText = button.childNodes[button.childNodes.length - 1];
    
    if (isPlaying) {
      button.classList.add('playing');
      if (card) card.classList.add('playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'inline';
      if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
        buttonText.textContent = ' pausar';
      }
    } else {
      button.classList.remove('playing');
      if (card) card.classList.remove('playing');
      if (playIcon) playIcon.style.display = 'inline';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
        buttonText.textContent = ' tocar';
      }
    }
  }
  
  getButtonFromAudio(audio) {
    for (let [id, aud] of Object.entries(this.audios)) {
      if (aud === audio) {
        return document.querySelector(`.play-btn[data-audio="${id}"]`);
      }
    }
    return null;
  }
  
  updateGlobalPlayer(card, status) {
    const globalPlayer = document.getElementById('globalPlayer');
    const tituloElem = document.querySelector('.global-musica-titulo');
    const statusElem = document.querySelector('.global-musica-status');
    
    if (globalPlayer && tituloElem && statusElem && card) {
      const titulo = card.querySelector('.musica-titulo')?.textContent;
      const artista = card.querySelector('.musica-artista')?.textContent;
      
      tituloElem.textContent = `${titulo} - ${artista}`;
      statusElem.textContent = status;
      globalPlayer.style.display = 'flex';
    }
  }
  
  hideGlobalPlayer() {
    const globalPlayer = document.getElementById('globalPlayer');
    if (globalPlayer) {
      globalPlayer.style.display = 'none';
    }
  }
  
  showNotification(message, type = 'info') {
    // Criar notificação flutuante
    const notification = document.createElement('div');
    notification.className = `music-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'erro' ? '#c9707a' : '#8b3a4a'};
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      font-size: 0.85rem;
      z-index: 10000;
      animation: slideUp 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Adicionar animações CSS dinamicamente
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
document.head.appendChild(styleSheet);

// Inicializar o player quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  const player = new MusicPlayer();
});
