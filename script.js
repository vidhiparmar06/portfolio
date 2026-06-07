/* ===== NAV SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER ===== */
const hb = document.getElementById('hamburger');
const navLinks = document.getElementById('navlinks');
hb.addEventListener('click', () => {
  hb.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hb.classList.remove('open'); navLinks.classList.remove('open');
}));

/* ===== TYPING ANIMATION ===== */
const phrases = [
  'Full Stack Developer',
  'Frontend Developer',
  'Computer Engineering Student',
  'Problem Solver'
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function tick() {
  const word = phrases[pi];
  typedEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
  let delay = deleting ? 40 : 75;
  if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
  setTimeout(tick, delay);
}
setTimeout(tick, 700);

/* ===== REVEAL ON SCROLL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize();
addEventListener('resize', resize);
for (let i = 0; i < 55; i++) {
  pts.push({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
    r: Math.random() * 1.4 + .4, o: Math.random() * .5 + .15
  });
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,245,90,${p.o})`;
    ctx.fill();
  });
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(200,245,90,${.12 * (1 - d / 110)})`;
        ctx.lineWidth = .5; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

/* ===== CONTACT FORM (mailto fallback; swap for EmailJS later) ===== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim() || 'Portfolio Enquiry';
  const message = document.getElementById('fmessage').value.trim();
  if (!name || !email || !message) { status.textContent = 'Please fill in all required fields.'; return; }
  const body = `From: ${name} <${email}>\n\n${message}`;
  window.location.href = `mailto:vidhiparmar.d@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = '✓ Opening your email client…';
});
