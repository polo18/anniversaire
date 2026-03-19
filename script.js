const dateEl = document.getElementById('date');
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const openBtn = document.getElementById('open');
const audioToggle = document.getElementById('audioToggle');
const music = document.getElementById('music');
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

const today = new Date();
dateEl.textContent = today.toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const stars = [];
const particles = [];
let particleTimerStarted = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function buildStars() {
  stars.length = 0;
  const total = Math.max(90, Math.floor(window.innerWidth / 14));

  for (let i = 0; i < total; i += 1) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.002 + 0.001,
    });
  }
}

function spawnParticles() {
  const symbols = ['*', '+', '.'];
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    size: Math.random() * 18 + 14,
    speedY: Math.random() * 0.9 + 0.5,
    drift: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.35,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
  });

  if (particles.length > 28) {
    particles.shift();
  }
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.alpha += Math.sin(Date.now() * star.speed) * 0.002;
    ctx.beginPath();
    ctx.fillStyle = `rgba(241, 210, 139, ${Math.max(0.15, Math.min(star.alpha, 0.95))})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.font = '18px serif';
  ctx.textAlign = 'center';

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.y -= particle.speedY;
    particle.x += particle.drift;
    particle.alpha -= 0.0025;

    ctx.globalAlpha = Math.max(particle.alpha, 0);
    ctx.fillStyle = '#f1d28b';
    ctx.font = `${particle.size}px serif`;
    ctx.fillText(particle.symbol, particle.x, particle.y);

    if (particle.alpha <= 0 || particle.y < -40) {
      particles.splice(i, 1);
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawScene);
}

function updateAudioButton() {
  if (!audioToggle) {
    return;
  }

  audioToggle.textContent = music.paused ? 'Lire la musique' : 'Pause la musique';
}

function playMusic() {
  if (!music) {
    return;
  }

  music.play().then(updateAudioButton).catch(() => {
    updateAudioButton();
  });
}

function revealCard() {
  screen1.classList.add('hidden');
  screen2.classList.remove('hidden');

  if (!particleTimerStarted) {
    particleTimerStarted = true;
    window.setInterval(spawnParticles, 900);
  }

  playMusic();
}

openBtn.addEventListener('click', revealCard);
openBtn.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    revealCard();
  }
});

if (audioToggle && music) {
  audioToggle.addEventListener('click', () => {
    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      updateAudioButton();
    }
  });

  music.addEventListener('play', updateAudioButton);
  music.addEventListener('pause', updateAudioButton);
  updateAudioButton();
}

resizeCanvas();
buildStars();
drawScene();

window.addEventListener('resize', () => {
  resizeCanvas();
  buildStars();
});
