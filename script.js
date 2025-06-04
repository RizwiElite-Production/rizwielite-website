// script.js

const app = document.getElementById("app") || document.createElement("div");
let currentPage = "home";
let selectedService = null;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function navigateTo(page, service = null) {
  currentPage = page;
  selectedService = service;
  renderPage();
  if (currentPage === "portfolio") initPortfolioFilterButtons();
}

function activatePlan(serviceName, tierName = "") {
  const message = encodeURIComponent(`Hi Rizwi, I'm interested in "${serviceName}" ${tierName ? `(${tierName})` : ""}.`);
  window.open(`https://wa.me/+923325318695?text=${message}`, "_blank");
}

function sendEmail(subject) {
  const body = encodeURIComponent(`Hi Rizwi, I'm interested in: ${subject}`);
  window.location.href = `mailto:rizwigul@gmail.com?subject=${subject}&body=${body}`;
}

function openSocial(url) {
  window.open(url, '_blank');
}

function playVideo(element, videoUrl) {
  element.outerHTML = `
    <video controls class="w-full rounded shadow mx-auto" poster="" autoplay>
      <source src="${videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
}

function getServiceData(name) {
  return {
    videoEditing: [
      { name: "Documentary Editing", media: '<img src="https://placehold.co/400x200?text=Documentary+Editing" alt="Thumbnail">', price: "$15/video" },
      { name: "Wedding Highlights", media: '<img src="https://placehold.co/400x200?text=Wedding+Highlights" alt="Thumbnail">', price: "$25/video" },
      { name: "Faceless Videos", media: '<img src="https://placehold.co/400x200?text=Faceless+Videos" alt="Thumbnail">', price: "$10/video" }
    ],
    graphicDesign: [
      { name: "Logo Design", media: '<img src="https://placehold.co/400x200?text=Logo+Design" alt="Logo">', price: "$20/design" },
      { name: "Social Media Posts", media: '<img src="https://placehold.co/400x200?text=Social+Posts" alt="Post">', price: "$10/post" },
      { name: "Banners & Thumbnails", media: '<img src="https://placehold.co/400x200?text=Banners+%26+Thumbnails" alt="Banner">', price: "$15/design" }
    ]
  }[name] || [];
}

function getPortfolioData(category) {
  return {
    videoEditing: [
      { title: "Tech Startup Documentary", preview: "https://placehold.co/400x200?text=Startup+Doc", description: "Full documentary editing." },
      { title: "Travel Reel", preview: "https://placehold.co/400x200?text=Travel+Reel", description: "Fast-paced travel highlight reel." }
    ],
    graphicDesign: [
      { title: "E-commerce Logo", preview: "https://placehold.co/400x200?text=Ecommerce+Logo", description: "Logo for online fashion brand." },
      { title: "YouTube Banner", preview: "https://placehold.co/400x200?text=YouTube+Banner", description: "YouTube branding design." }
    ]
  }[category] || [];
}

function getClientStats() {
  return `
    <section class="client-stats mt-12 grid md:grid-cols-3 gap-6 text-center px-4">
      <div class="stat bg-gray-800 p-4 rounded shadow">Clients: 200+</div>
      <div class="stat bg-gray-800 p-4 rounded shadow">Videos: 1000+</div>
      <div class="stat bg-gray-800 p-4 rounded shadow">⭐ 4.9 Rating</div>
    </section>
  `;
}

function getAboutMe() {
  return `
    <header class="bg-black p-6 text-center relative">
      <h1 class="glowing-title mb-2">RizwiElite Production</h1>
      <button onclick="navigateTo('home')" class="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">Back to Home</button>
    </header>
    <main class="p-4 space-y-4">
      <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_1pxqjqxv.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
      <p>I’m Rizwi Gul, a passionate freelancer delivering premium video editing, design, writing, and YouTube services to clients worldwide.</p>
      <p>Started from scratch in 2020, I’ve helped over 200 creators grow their brand through quality visuals and strategy.</p>
      <ul class="grid grid-cols-2 gap-2 text-center">
        <li>Fast Delivery</li>
        <li>Affordable Pricing</li>
        <li>High Quality Output</li>
        <li>Dedicated Support</li>
      </ul>
    </main>
    ${getClientStats()}
  `;
}

function getContactForm() {
  return `
    <header class="bg-black p-6 text-center">
      <h1 class="glowing-title mb-2">Contact Me</h1>
      <button onclick="navigateTo('home')" class="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">Back to Home</button>
    </header>
    <main class="p-4 space-y-3">
      <form onsubmit="event.preventDefault(); showConfirmation()" class="space-y-3">
        <input type="text" placeholder="Your Name" required class="w-full px-4 py-2 rounded border bg-gray-900 border-gray-700" />
        <input type="email" placeholder="Your Email" required class="w-full px-4 py-2 rounded border bg-gray-900 border-gray-700" />
        <select required class="w-full px-4 py-2 rounded border bg-gray-900 border-gray-700">
          <option value="">Select Service</option>
          <option value="Video Editing">Video Editing</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="YouTube Monetization">YouTube Monetization</option>
        </select>
        <textarea rows="4" placeholder="Your Message" required class="w-full px-4 py-2 rounded border bg-gray-900 border-gray-700"></textarea>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white transition px-4 py-2 rounded">Send Message</button>
      </form>
      <div id="confirmation" class="hidden text-center p-3 bg-green-800 text-green-200 rounded-md">
        Thanks! I’ll respond within 24 hours.
      </div>
      <p class="text-center">Or connect via:</p>
      <div class="flex justify-center gap-3">
        <button onclick="openSocial('https://wa.me/+923325318695')" class="contact-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">WhatsApp</button>
        <button onclick="sendEmail('General Inquiry')" class="contact-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Email</button>
      </div>
    </main>
  `;
}

function getFooter() {
  return `
    <footer class="mt-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 class="font-bold mb-2">Quick Links</h3>
          <ul class="space-y-1">
            <li><button onclick="navigateTo('home')">Home</button></li>
            <li><button onclick="navigateTo('services')">Services</button></li>
            <li><button onclick="navigateTo('portfolio')">Portfolio</button></li>
            <li><button onclick="navigateTo('about')">About Me</button></li>
            <li><button onclick="navigateTo('contact')">Contact</button></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2">Contact Info</h3>
          <ul class="space-y-1">
            <li>Email: rizwigul@gmail.com</li>
            <li>WhatsApp: +92 332 5318695</li>
            <li>Location: Pakistan</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2">Follow Me</h3>
          <div class="flex gap-2">
            <button onclick="openSocial('https://instagram.com/rizwielite.production')">Instagram</button>
            <button onclick="openSocial('https://youtube.com/@RizwiEliteProduction')">YouTube</button>
            <button onclick="openSocial('https://linkedin.com/in/rizwielite')">LinkedIn</button>
          </div>
        </div>
      </div>
      <div class="mt-6 text-xs text-center">© 2025 RizwiElite Production. All Rights Reserved.</div>
    </footer>
  `;
}

function getDarkModeToggle() {
  return `
    <div class="dark-toggle" onclick="toggleDarkMode()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/><circle cx="12" cy="12" r="5" fill="#fbbf24"/></svg> 
    </div>
  `;
}

function getChatbotButton() {
  return `
    <div class="chatbot-toggle" onclick="toggleChatbot()">💬 Get a Quote</div>
    <div id="chatbotModal" class="chatbot-modal">
      <h3 class="mb-2">Get a Free Quote</h3>
      <select id="quoteService" class="mb-2">
        <option value="Video Editing">Video Editing</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Content Writing">Content Writing</option>
        <option value="YouTube Monetization">YouTube Monetization</option>
      </select>
      <input type="text" id="quoteName" placeholder="Your Name" class="mb-2" />
      <input type="email" id="quoteEmail" placeholder="Your Email" class="mb-2" />
      <textarea id="quoteDetails" placeholder="Tell me about your project..." class="mb-2"></textarea>
      <button onclick="generateQuote()">Submit</button>
    </div>
  `;
}

function generateQuote() {
  const service = document.getElementById("quoteService").value;
  const name = document.getElementById("quoteName").value;
  const email = document.getElementById("quoteEmail").value;
  const details = document.getElementById("quoteDetails").value;

  const message = encodeURIComponent(`Hi Rizwi, I'm interested in "${service}".\n\nName: ${name}\nEmail: ${email}\nDetails: ${details}`);

  window.open(`https://wa.me/+923325318695?text=${message}`, "_blank");
}

function showConfirmation() {
  const confirmation = document.getElementById("confirmation");
  if (confirmation) {
    confirmation.classList.remove("hidden");
    setTimeout(() => confirmation.classList.add("hidden"), 3000);
  }
}

function toggleMenu() {
  const menu = document.getElementById("menuContent");
  menu.classList.toggle("show");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function initDarkMode() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
}

function initPortfolioFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function filterPortfolio(category) {
  const portfolioGrid = document.getElementById("portfolio-grid");
  if (!portfolioGrid) return;

  let html = "";
  if (category === "all") {
    html += Object.values(getPortfolioData()).flat().map(item => `
      <div class="portfolio-card bg-gray-800 p-4 rounded shadow text-center">
        <h3 class="font-semibold mb-2">${item.title}</h3>
        <img src="${item.preview}" alt="${item.title}" class="rounded w-full mb-2" />
        <p class="text-sm text-gray-400">${item.description}</p>
      </div>
    `).join('');
  } else {
    html += getPortfolioData(category).map(item => `
      <div class="portfolio-card bg-gray-800 p-4 rounded shadow text-center">
        <h3 class="font-semibold mb-2">${item.title}</h3>
        <img src="${item.preview}" alt="${item.title}" class="rounded w-full mb-2" />
        <p class="text-sm text-gray-400">${item.description}</p>
      </div>
    `).join('');
  }

  portfolioGrid.innerHTML = html;
}

function animateCards() {
  gsap.utils.toArray(".service-card").forEach((card, i) => {
    gsap.fromTo(card,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: card, start: "top 80%" } }
    );
  });
}

function toggleChatbot() {
  const modal = document.getElementById("chatbotModal");
  modal.classList.toggle("show");
}

function init3DBackground() {
  const canvas = document.getElementById("bgCanvas");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create Stars
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 500;
  const starsVertices = new Float32Array(starsCount * 3);
  for (let i = 0; i < starsCount * 3; i++) {
    starsVertices[i] = (Math.random() - 0.5) * 20;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsVertices, 3));
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  camera.position.z = 3;

  function animateStars() {
    requestAnimationFrame(animateStars);
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animateStars();
}

function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html = `
      <header class="bg-black text-white p-6 text-center relative">
        <div id="menuToggle" onclick="toggleMenu()">☰ Menu</div>
        <div id="menuContent" class="menu-content"></div>
        <h1 class="glowing-title mb-2">RizwiElite Production</h1>
      </header>
      <main class="p-6 grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'videoEditing')">
          <h2 class="font-bold">Video Editing</h2>
          <p>$15/video</p>
          <img src="https://placehold.co/300x150?text=Video+Editing" alt="Video Editing" class="my-4 mx-auto" />
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'graphicDesign')">
          <h2 class="font-bold">Graphic Design</h2>
          <p>$20/design</p>
          <img src="https://placehold.co/300x150?text=Graphic+Design" alt="Graphic Design" class="my-4 mx-auto" />
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'contentWriting')">
          <h2 class="font-bold">Content Writing</h2>
          <p>$10/article</p>
          <img src="https://placehold.co/300x150?text=Content+Writing" alt="Content Writing" class="my-4 mx-auto" />
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'youtubeMonetization')">
          <h2 class="font-bold">YouTube Monetization</h2>
          <p>$25/channel</p>
          <img src="https://placehold.co/300x150?text=YouTube+Monetization" alt="YouTube Monetization" class="my-4 mx-auto" />
        </div>
      </main>
      ${getFooter()}
      ${getDarkModeToggle()}
      ${getChatbotButton()}
    `;
  } else if (currentPage === "portfolio") {
    html = `
      <header class="bg-black text-white p-6 text-center">
        <h1 class="text-3xl font-bold">Portfolio</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">Back to Home</button>
      </header>
      <main class="p-6 max-w-5xl mx-auto">
        <div class="portfolio-filters flex flex-wrap justify-center gap-2 mb-6">
          <button onclick="filterPortfolio('videoEditing')" class="filter-btn bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Video Editing</button>
          <button onclick="filterPortfolio('graphicDesign')" class="filter-btn bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Graphic Design</button>
          <button onclick="navigateTo('portfolio')" class="filter-btn bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">All</button>
        </div>
        <div id="portfolio-grid" class="grid md:grid-cols-3 gap-6"></div>
      </main>
      ${getFooter()}
      ${getDarkModeToggle()}
      ${getChatbotButton()}
    `;
  } else if (currentPage === "about") {
    html = getAboutMe() + getFooter() + getDarkModeToggle() + getChatbotButton();
  } else if (currentPage === "contact") {
    html = getContactForm() + getFooter() + getDarkModeToggle() + getChatbotButton();
  }

  app.innerHTML = html;

  // Init dark mode
  initDarkMode();

  // Show menu links dynamically
  const menuContent = document.getElementById("menuContent");
  if (menuContent) {
    menuContent.innerHTML = `
      <a onclick="navigateTo('portfolio'); event.stopPropagation()" href="#">Portfolio</a> 
      <a onclick="navigateTo('about'); event.stopPropagation()" href="#">About</a>
      <a onclick="navigateTo('contact'); event.stopPropagation()" href="#">Contact</a>
    `;
  }

  // Animate cards
  animateCards();

  // Load portfolio
  if (currentPage === "portfolio") {
    filterPortfolio("all");
  }
}

// Initialize Dark Mode
function initDarkMode() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
}

// Show Confirmation
function showConfirmation() {
  const confirmation = document.getElementById("confirmation");
  if (confirmation) {
    confirmation.classList.remove("hidden");
    setTimeout(() => confirmation.classList.add("hidden"), 3000);
  }
}

// Generate Quote
function generateQuote() {
  const service = document.getElementById("quoteService").value;
  const name = document.getElementById("quoteName").value;
  const email = document.getElementById("quoteEmail").value;
  const details = document.getElementById("quoteDetails").value;

  const message = encodeURIComponent(`Hi Rizwi, I'm interested in "${service}".\n\nName: ${name}\nEmail: ${email}\nDetails: ${details}`);
  window.open(`https://wa.me/+923325318695?text=${message}`, "_blank");
}

// Initialize Portfolio Filter Buttons
function initPortfolioFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Initialize Custom Cursor
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('.service-card, .filter-btn, .portfolio-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.backgroundColor = 'rgba(0, 120, 255, 0.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'rgba(0, 120, 255, 0.2)';
    });
  });
}

// Start App
renderPage();
init3DBackground();
initCustomCursor();