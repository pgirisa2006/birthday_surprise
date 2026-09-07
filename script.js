// EDIT HERE: Set your desired secret password
const SECRET_PASSWORD = "candyandcheesecake";


function goToPage(pageNumber) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  document.getElementById(`page${pageNumber}`).classList.add("active");
}

/* Page 1 Password Check */
function checkPassword() {
  const input = document.getElementById("passInput");
  const feedback = document.getElementById("errorFeedback");
  const card = document.querySelector(".glass-card");

  if (input.value.trim().toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
    feedback.style.color = "#4caf50";
    feedback.textContent = "Kandupidichitiya🫣";
    
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });

    setTimeout(() => goToPage(2), 1200);
  } else {
    feedback.style.color = "#ff5271";
    feedback.textContent = "Illiye bow bow 😌";
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 400);
  }
}

/* Page 2 Jar Interaction */
/* Page 2: Jar Click Listener */
// ==========================================
// PAGE TRANSITION FUNCTION
// ==========================================
function goToPage(pageNumber) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  const targetPage = document.getElementById(`page${pageNumber}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// ==========================================
// PAGE 2: SCRATCH CARD INITIALIZATION
// ==========================================
function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Set internal canvas display dimensions
  canvas.width = 280;
  canvas.height = 200;

  // Fill canvas with metallic scratchable surface
  ctx.fillStyle = '#f8bbd0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add decorative overlay text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2);

  let isDrawing = false;

  function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Erase the canvas overlay to reveal the coupon underneath
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mouse Listeners
  canvas.addEventListener('mousedown', (e) => { 
    isDrawing = true; 
    scratch(e); 
  });
  canvas.addEventListener('mousemove', scratch);
  window.addEventListener('mouseup', () => { 
    isDrawing = false; 
  });

  // Touch Listeners for Mobile Compatibility
  canvas.addEventListener('touchstart', (e) => { 
    isDrawing = true; 
    scratch(e); 
  });
  canvas.addEventListener('touchmove', scratch);
  window.addEventListener('touchend', () => { 
    isDrawing = false; 
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initScratchCard();
});

/* Lightbox Modal */
function openLightbox(src, caption) {
  const modal = document.getElementById("lightbox");
  document.getElementById("modalImg").src = src;
  document.getElementById("modalCaption").textContent = caption;
  modal.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

/* Background Hearts Physics */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.7 + 0.3;
    this.symbol = ["❤️", "✨", "🌸"][Math.floor(Math.random() * 3)];
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

for (let i = 0; i < 25; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();