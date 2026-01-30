/* DATE D'AUJOURD'HUI */
const dateEl = document.getElementById("date");
const today = new Date();
dateEl.textContent = today.toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* OUVERTURE */
const openBtn = document.getElementById("open");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const music = document.getElementById("music");

openBtn.onclick = () => {
  screen1.classList.add("hidden");
  screen2.classList.remove("hidden");
  music.play().catch(() => {});
  startConfetti();
  setInterval(createIcon, 900);
};

/* ICÔNES FLOTTANTES */
function createIcon() {
  const icons = ["🕊️", "🌿", "✨", "🌸", "🤍"];
  const el = document.createElement("div");
  el.className = "icon";
  el.textContent = icons[Math.floor(Math.random() * icons.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 6 + Math.random() * 4 + "s";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

/* CONFETTIS DOUX */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const confettis = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 2,
  d: Math.random() * 1.5 + 0.5,
}));

function startConfetti() {
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(120,180,160,0.6)";
    confettis.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      c.y += c.d;
      if (c.y > canvas.height) c.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};
