// script.js

const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;
let selectedTier = null;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function navigateTo(page, service = null, tier = null) {
  currentPage = page;
  selectedService = service;
  selectedTier = tier;
  renderPage();
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
      { name: "Documentary Editing", media: '<img src="https://placehold.co/400x200?text=Documentary+Editing " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/documentary.mp4\')" class="cursor-pointer">', price: "$15/video" },
      { name: "Wedding Highlights", media: '<img src="https://placehold.co/400x200?text=Wedding+Highlights " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/wedding.mp4\')" class="cursor-pointer">', price: "$25/video" },
      { name: "Faceless Videos", media: '<img src="https://placehold.co/400x200?text=Faceless+Videos " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/faceless.mp4\')" class="cursor-pointer">', price: "$10/video" },
      { name: "Ad Edits", media: '<img src="https://placehold.co/400x200?text=Ad+Edits " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/ad.mp4\')" class="cursor-pointer">', price: "$30/video" },
      { name: "YouTube Automation", media: '<img src="https://placehold.co/400x200?text=YouTube+Automation " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/youtube.mp4\')" class="cursor-pointer">', price: "$20/video" },
      { name: "AI Video Editing", media: '<img src="https://placehold.co/400x200?text=AI+Video+Editing " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/ai.mp4\')" class="cursor-pointer">', price: "$18/video" }
    ],
    graphicDesign: [
      { name: "Logo Design", media: '<img src="https://placehold.co/400x200?text=Logo+Design " alt="Logo Design" />', price: "$20/design" },
      { name: "Social Media Posts", media: '<img src="https://placehold.co/400x200?text=Social+Posts " alt="Social Post" />', price: "$10/post" },
      { name: "Banners & Thumbnails", media: '<img src="https://placehold.co/400x200?text=Banners+%26+Thumbnails " alt="Banner Design" />', price: "$15/design" },
      { name: "Brochure Design", media: '<img src="https://placehold.co/400x200?text=Brochure+Design " alt="Brochure Design" />', price: "$25/design" },
      { name: "Custom Illustration", media: '<img src="https://placehold.co/400x200?text=Illustration " alt="Illustration" />', price: "$30/hour" },
      { name: "Flyer Design", media: '<img src="https://placehold.co/400x200?text=Flyer+Design " alt="Flyer Design" />', price: "$18/design" }
    ]
  }[name] || [];
}

function getPortfolioData(category) {
  return {
    videoEditing: [
      { title: "Tech Startup Documentary", video: "https://www.w3schools.com/html/mov_bbb.mp4 ", description: "Full-length documentary editing with motion graphics and voiceover." },
      { title: "Travel Reel", video: "https://www.w3schools.com/html/mov_bbb.mp4 ", description: "Fast-paced travel highlight reel for social media." },
      { title: "YouTube Shorts Compilation", video: "https://www.w3schools.com/html/mov_bbb.mp4 ", description: "Edited shorts compilation with trending music." }
    ],
    graphicDesign: [
      { title: "E-commerce Logo", preview: "https://placehold.co/400x200?text=Ecommerce+Logo ", description: "Logo for online fashion brand." },
      { title: "YouTube Banner", preview: "https://placehold.co/400x200?text=YouTube+Banner ", description: "YouTube branding design." },
      { title: "Instagram Feed", preview: "https://placehold.co/400x200?text=Instagram+Feed ", description: "Monthly feed templates." }
    ],
    contentWriting: [
      { title: "SEO Blog Post", preview: "https://placehold.co/400x200?text=SEO+Blog+Post ", description: "How to grow a blog organically." },
      { title: "LinkedIn Bio", preview: "https://placehold.co/400x200?text=LinkedIn+Bio ", description: "Creative profile bio writing." },
      { title: "Product Descriptions", preview: "https://placehold.co/400x200?text=Product+Descriptions ", description: "E-commerce product copywriting." }
    ],
    youtubeMonetization: [
      { title: "Channel Audit", preview: "https://placehold.co/400x200?text=Channel+Audit ", description: "Complete channel audit and optimization." },
      { title: "Monetization Tips", preview: "https://placehold.co/400x200?text=Monetization+Tips ", description: "Helped creator monetize after 4K views." },
      { title: "Content Strategy", preview: "https://placehold.co/400x200?text=Content+Strategy ", description: "Monthly upload strategy + titles + tags." }
    ]
  }[category] || [];
}

function getClientStats() {
  return `
    <section class="client-stats mt-12 grid md:grid-cols-3 gap-6 text-center">
      <div class="stat bg-gray-800 p-4 rounded shadow">
        <h3 class="text-3xl font-bold">200+</h3>
        <p>Clients Worldwide</p>
      </div>
      <div class="stat bg-gray-800 p-4 rounded shadow">
        <h3 class="text-3xl font-bold">1000+</h3>
        <p>Videos Edited</p>
      </div>
      <div class="stat bg-gray-800 p-4 rounded shadow">
        <h3 class="text-3xl font-bold">⭐ 4.9</h3>
        <p>Client Rating</p>
      </div>
    </section>
  `;
}

function getAboutMe() {
  return `
    <header class="bg-gray-800 p-6 text-center relative">
      <h1 class="glowing-title mb-2">RizwiElite Production</h1>
      <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
    </header>
    <main class="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
      <div class="bio w-full md:w-3/5">
        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_1pxqjqxv.json" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
        <p>I’m Rizwi Gul, a passionate freelancer delivering premium video editing, design, writing, and YouTube services to clients worldwide.</p>
        <p class="mt-4">Started from scratch in 2020, I’ve helped over 200 creators grow their brand through quality visuals and strategy.</p>
        <ul class="grid grid-cols-2 gap-2 mt-4">
          <li>Fast Delivery</li>
          <li>Affordable Pricing</li>
          <li>High Quality Output</li>
          <li>Dedicated Support</li>
        </ul>
        <p class="quote mt-4 italic text-gray-300">"Let's create something amazing together."</p>
      </div>
    </main>
    ${getClientStats()}
  `;
}

function getContactForm() {
  return `
    <header class="bg-gray-800 p-6 text-center relative">
      <h1 class="text-3xl font-bold">Contact Me</h1>
      <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
    </header>
    <main class="p-6 max-w-md mx-auto">
      <form onsubmit="event.preventDefault(); showConfirmation()" class="space-y-3">
        <input type="text" placeholder="Your Name" required class="w-full px-4 py-2 rounded border bg-gray-700 border-gray-600 text-white" />
        <input type="email" placeholder="Your Email" required class="w-full px-4 py-2 rounded border bg-gray-700 border-gray-600 text-white" />
        <select required class="w-full px-4 py-2 rounded border bg-gray-700 border-gray-600 text-white">
          <option value="">Select Service</option>
          <option value="Video Editing">Video Editing</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="YouTube Monetization">YouTube Monetization</option>
        </select>
        <textarea rows="4" placeholder="Your Message" required class="w-full px-4 py-2 rounded border bg-gray-700 border-gray-600 text-white"></textarea>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Send Message</button>
      </form>
      <div id="confirmation" class="hidden text-center mt-4 p-3 bg-green-800 rounded-md shadow-md">
        Thanks! I’ll respond within 24 hours.
      </div>
      <p class="text-center mt-4 mb-2">Or connect via:</p>
      <div class="contact-button-links flex justify-center gap-3">
        <button class="contact-btn bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded flex items-center gap-2" onclick="openSocial('https://wa.me/+923325318695 ')">
          WhatsApp
        </button>
        <button class="contact-btn bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded flex items-center gap-2" onclick="sendEmail('General Inquiry')">
          Email
        </button>
      </div>
    </main>
  `;
}

function getFooter() {
  return `
    <footer class="bg-gray-800 text-white p-6 mt-12">
      <div class="grid md:grid-cols-3 gap-6">
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
            <button onclick="openSocial('https://youtube.com/ @RizwiEliteProduction')">YouTube</button>
            <button onclick="openSocial('https://linkedin.com/in/rizwielite')">LinkedIn</button>
          </div>
        </div>
      </div>
      <div class="mt-6 text-sm text-gray-400 text-center">
        © 2025 RizwiElite Production. All Rights Reserved.
      </div>
    </footer>
  `;
}

function getDarkModeToggle() {
  return `
    <div class="dark-toggle" onclick="toggleDarkMode()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm9-9a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2zM3 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z"/></svg>
    </div>
  `;
}

function animateCards() {
  gsap.utils.toArray(".service-card").forEach((card, i) => {
    gsap.fromTo(card,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, scrollTrigger: { trigger: card, start: "top 80%" } }
    );
  });
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

function getPortfolioFilters() {
  return `
    <div class="portfolio-filters flex flex-wrap justify-center gap-2 mb-6">
      <button onclick="filterPortfolio('videoEditing')" class="filter-btn bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Video Editing</button>
      <button onclick="filterPortfolio('graphicDesign')" class="filter-btn bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">Graphic Design</button>
      <button onclick="filterPortfolio('contentWriting')" class="filter-btn bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Content Writing</button>
      <button onclick="filterPortfolio('youtubeMonetization')" class="filter-btn bg-red-600 hover:bg-red-700 px-4 py-2 rounded">YouTube Monetization</button>
      <button onclick="filterPortfolio('all')" class="filter-btn bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">All</button>
    </div>
  `;
}

function filterPortfolio(category) {
  const portfolioGrid = document.getElementById("portfolio-grid");
  if (!portfolioGrid) return;

  const data = getPortfolioData(category);

  let html = "";
  if (category === "all") {
    html += Object.keys(getPortfolioData("videoEditing")).map(cat => {
      const items = getPortfolioData(cat);
      return items.map(item => `
        <div class="portfolio-card bg-gray-800 p-4 rounded shadow text-center">
          <h3 class="font-semibold mb-2">${item.title}</h3>
          <div class="mb-2">
            ${item.video ? `<video src="${item.video}" class="w-full rounded" controls></video>` : `<img src="${item.preview}" alt="${item.title}" class="rounded w-full" />`}
          </div>
          <p class="text-sm text-gray-400">${item.description}</p>
        </div>
      `).join('');
    }).join('');
  } else {
    html += data.map(item => `
      <div class="portfolio-card bg-gray-800 p-4 rounded shadow text-center">
        <h3 class="font-semibold mb-2">${item.title}</h3>
        <div class="mb-2">
          ${item.video ? `<video src="${item.video}" class="w-full rounded" controls></video>` : `<img src="${item.preview}" alt="${item.title}" class="rounded w-full" />`}
        </div>
        <p class="text-sm text-gray-400">${item.description}</p>
      </div>
    `).join('');
  }

  portfolioGrid.innerHTML = html;
  animateCards();
}

function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center relative">
        <div id="menuToggle" onclick="toggleMenu()">
          ☰ Menu
          <div id="menuContent" class="menu-content">
            <a onclick="navigateTo('portfolio'); event.stopPropagation()" href="#">Portfolio</a> 
            <a onclick="navigateTo('about'); event.stopPropagation()" href="#">About</a>
            <a onclick="navigateTo('contact'); event.stopPropagation()" href="#">Contact</a>
          </div>
        </div>
        <h1 class="glowing-title mb-2">RizwiElite Production</h1>
      </header>
      <main class="p-6 grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'videoEditing')">
          <h2 class="font-bold">Video Editing</h2>
          <p>$15/video</p>
          <img src="https://placehold.co/300x150?text=Video+Editing " alt="Video Editing" class="my-4 mx-auto" />
          <p class="service-description">Professional editing for YouTube, reels, weddings, documentaries, and more.</p>
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'graphicDesign')">
          <h2 class="font-bold">Graphic Design</h2>
          <p>$20/design</p>
          <img src="https://placehold.co/300x150?text=Graphic+Design " alt="Graphic Design" class="my-4 mx-auto" />
          <p class="service-description">Logo design, banners, thumbnails, branding materials tailored to your needs.</p>
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'contentWriting')">
          <h2 class="font-bold">Content Writing</h2>
          <p>$10/article</p>
          <img src="https://placehold.co/300x150?text=Content+Writing " alt="Content Writing" class="my-4 mx-auto" />
          <p class="service-description">SEO articles, blog posts, scripts, bios, and compelling copywriting services.</p>
        </div>
        <div class="service-card bg-gray-800 p-6 rounded shadow cursor-pointer" onclick="navigateTo('services', 'youtubeMonetization')">
          <h2 class="font-bold">YouTube Monetization</h2>
          <p>$25/channel</p>
          <img src="https://placehold.co/300x150?text=YouTube+Monetization " alt="YouTube Monetization" class="my-4 mx-auto" />
          <p class="service-description">Channel setup, SEO optimization, growth strategy, and monetization assistance.</p>
        </div>
      </main>
      ${getFooter()}
      ${getDarkModeToggle()}
    `;
  } else if (currentPage === "portfolio") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">Portfolio</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
      </header>
      <main class="p-6 max-w-5xl mx-auto">
        ${getPortfolioFilters()}
        <div id="portfolio-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
      </main>
      ${getFooter()}
      ${getDarkModeToggle()}
    `;
  } else if (currentPage === "about") {
    html = getAboutMe() + getFooter() + getDarkModeToggle();
  } else if (currentPage === "contact") {
    html = getContactForm() + getFooter() + getDarkModeToggle();
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

  // Load portfolio on load
  if (currentPage === "portfolio") {
    filterPortfolio("all");
  }
}

function getDarkModeToggle() {
  return `<div class="dark-toggle" onclick="toggleDarkMode()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" fill="#fff"/><circle cx="12" cy="12" r="5" fill="#fbbf24"/></svg>
  </div>`;
}

renderPage();