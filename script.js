const tap = document.querySelector(".tap");
const touch = document.getElementById("touch");
const surprise = document.getElementById("surprise");
const music = document.getElementById("music");

/* DATE = AUJOURD’HUI */
const today = new Date();
const options = { day: "numeric", month: "long", year: "numeric" };
document.getElementById("date").innerText =
  "📅 " + today.toLocaleDateString("fr-FR", options);

/* ICÔNES FLOTTANTES */
function createIcon() {
  const icons = ["🔬", "🏺", "📚", "🌌", "✨"];
  const el = document.createElement("div");
  el.className = "icon";
  el.innerText = icons[Math.floor(Math.random() * icons.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDuration = 5 + Math.random() * 4 + "s";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 9000);
}

/* CONFETTIS */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let confettis = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 4 + 2,
  d: Math.random() * 2 + 1,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 215, 0,0.7)";
  confettis.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(drawConfetti);
}

/* CLIC POUR SURPRISE */
tap.onclick = () => {
  touch.style.display = "none";
  surprise.classList.remove("hidden");
  music.play();
  drawConfetti();
  setInterval(createIcon, 700);
};
