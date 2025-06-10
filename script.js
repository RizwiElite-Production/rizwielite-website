class RizwiEliteApp {
  constructor() {
    this.currentPage = "home";
    this.selectedService = null;
    this.isDarkMode = localStorage.getItem("darkMode") === "true";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.init3DBackground();
    this.initParticles();
    this.initCustomCursor();
    this.renderPage();
    this.hidePreloader();
  }

  hidePreloader() {
    gsap.to("#preloader", {
      opacity: 0,
      duration: 0.5,
      delay: 1,
      onComplete: () => {
        document.getElementById("preloader").style.display = "none";
      }
    });
  }

  setupEventListeners() {
    window.addEventListener("popstate", () => {
      const state = history.state || {};
      this.currentPage = state.page || "home";
      this.selectedService = state.service || null;
      this.renderPage();
    });
  }

  handleResize() {
    if (this.threeJS) {
      this.threeJS.camera.aspect = window.innerWidth / window.innerHeight;
      this.threeJS.camera.updateProjectionMatrix();
      this.threeJS.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // 3D Background
  init3DBackground() {
    const canvas = document.getElementById("bgCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      emissive: 0x0,
      specular: 0x7c3aed,
      shininess: 30,
      transparent: true,
      opacity: 0.8
    });
    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    this.threeJS = { scene, camera, renderer };
  }

  // Particle.js
  initParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#3b82f6" },
        shape: { type: "circle", stroke: { width: 0, color: "#000" } },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.3, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // Custom Cursor
  initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  navigateTo(page, service = null) {
    this.currentPage = page;
    this.selectedService = service;
    history.pushState({ page, service }, "", `#${page}${service ? `/${service}` : ''}`);
    this.renderPage();
    gsap.to(window, { duration: 0.5, scrollTo: 0 });
  }

  renderPage() {
    let html = '';
    switch (this.currentPage) {
      case "home":
        html = this.renderHomePage();
        break;
      case "services":
        html = this.renderServicesPage();
        break;
      case "portfolio":
        html = this.renderPortfolioPage();
        break;
      case "about":
        html = this.renderAboutPage();
        break;
      case "contact":
        html = this.renderContactPage();
        break;
      default:
        html = this.renderHomePage();
    }

    document.getElementById("app").innerHTML = this.renderNavMenu() + html;
    this.initPageFeatures();
  }

  renderNavMenu() {
    return `
      <nav class="nav-menu">
        <div class="nav-container">
          <div class="nav-inner">
            <a href="#" onclick="app.navigateTo('home')" class="logo">RizwiElite</a>
            <div class="menu-links">
              <button onclick="app.navigateTo('home')">Home</button>
              <button onclick="app.navigateTo('services')">Services</button>
              <button onclick="app.navigateTo('portfolio')">Portfolio</button>
              <button onclick="app.navigateTo('about')">About</button>
              <button onclick="app.navigateTo('contact')">Contact</button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  renderHomePage() {
    return `
      <section class="hero min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20">
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0"></div>
        <div class="relative z-10 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Premium <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Creative Services</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transforming your vision into stunning visual content.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button onclick="app.navigateTo('services')" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Explore Services
            </button>
            <button onclick="app.navigateTo('contact')" class="border-2 border-blue-500 hover:bg-blue-500/10 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Get in Touch
            </button>
          </div>
        </div>
        <div class="absolute bottom-10 left-0 right-0 flex justify-center">
          <div class="animate-bounce w-8 h-8 border-4 border-blue-500 rounded-full" style="border-bottom-color: transparent;"></div>
        </div>
      </section>

      <section class="py-20 px-4 bg-gray-950">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">My Services</h2>
          <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">Professional solutions tailored to your creative needs</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${this.renderServiceCard("Video Editing", "$15/video", "Edit your footage into compelling stories", "videoEditing")}
            ${this.renderServiceCard("Graphic Design", "$20/design", "Stunning visuals for your brand", "graphicDesign")}
            ${this.renderServiceCard("Content Writing", "$10/article", "Engaging written content", "contentWriting")}
            ${this.renderServiceCard("YouTube Strategy", "$25/session", "Grow your channel effectively", "youtubeMonetization")}
          </div>
        </div>
      </section>

      ${this.renderFooter()}
      ${this.renderChatbot()}
      ${this.renderDarkModeToggle()}
    `;
  }

  renderServiceCard(title, price, description, serviceType) {
    return `
      <div class="service-card" onclick="app.navigateTo('services', '${serviceType}')">
        <div class="card-content">
          <div class="card-icon"><svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg></div>
          <h3 class="card-title">${title}</h3>
          <p class="card-price">${price}</p>
          <p class="card-desc">${description}</p>
        </div>
      </div>
    `;
  }

  renderServicesPage() {
    if (!this.selectedService) {
      return this.renderAllServicesPage();
    }

    const servicePages = {
      videoEditing: this.renderVideoEditingPage(),
      graphicDesign: this.renderGraphicDesignPage(),
      contentWriting: this.renderContentWritingPage(),
      youtubeMonetization: this.renderYouTubeStrategyPage()
    };

    return servicePages[this.selectedService] || "<h1>Service Not Found</h1>";
  }

  renderAllServicesPage() {
    return `
      <section class="py-20 px-4 bg-gray-950 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl font-bold text-center mb-4 gradient-text">All Services</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            ${this.renderServiceCard("Video Editing", "$15/video", "Edit your footage into compelling stories", "videoEditing")}
            ${this.renderServiceCard("Graphic Design", "$20/design", "Stunning visuals for your brand", "graphicDesign")}
            ${this.renderServiceCard("Content Writing", "$10/article", "Engaging written content", "contentWriting")}
            ${this.renderServiceCard("YouTube Strategy", "$25/session", "Grow your channel effectively", "youtubeMonetization")}
          </div>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderVideoEditingPage() {
    return `
      <section class="py-20 px-4 bg-gray-950 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <button onclick="app.navigateTo('services')" class="mb-6 text-blue-400 underline">&larr; Back to Services</button>
          <h2 class="text-4xl font-bold mb-6">🎥 Video Editing</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            ${this.renderTierCard("Standard", "$15", "3 Days", "1 Revision", "Basic cuts & transitions", "whatsapp://send?phone=03325318695")}
            ${this.renderTierCard("Medium", "$30", "2 Days", "3 Revisions", "Color grading + basic effects", "mailto:rizwigul@gmail.com")}
            ${this.renderTierCard("Premium", "$50", "1 Day", "Unlimited Revisions", "Full cinematic edit + sound design", "whatsapp://send?phone=03325318695")}
          </div>
          <h3 class="text-2xl font-semibold mb-4">Editing Styles</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            ${this.renderStyleCard("Cinematic", "https://placehold.co/600x400?text=Cinematic+Edit", "whatsapp://send?phone=03325318695")}
            ${this.renderStyleCard("Documentary", "https://placehold.co/600x400?text=Docu+Style", "mailto:rizwigul@gmail.com")}
            ${this.renderStyleCard("Vlog", "https://placehold.co/600x400?text=Vlog+Edit", "whatsapp://send?phone=03325318695")}
            ${this.renderStyleCard("Wedding", "https://placehold.co/600x400?text=Wedding+Video", "mailto:rizwigul@gmail.com")}
            ${this.renderStyleCard("Promotional", "https://placehold.co/600x400?text=Promo+Video", "whatsapp://send?phone=03325318695")}
          </div>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderTierCard(title, price, delivery, revisions, features, link) {
    return `
      <div class="tier-card">
        <h4 class="tier-title">${title}</h4>
        <p class="tier-price">${price} / project</p>
        <ul class="space-y-2 text-gray-400 mb-6">
          <li>✅ ${delivery}</li>
          <li>✅ ${revisions}</li>
          <li>✅ ${features}</li>
        </ul>
        <button onclick="window.open('${link}', '_blank')" class="book-btn">Book Now</button>
      </div>
    `;
  }

  renderStyleCard(name, imageUrl, link) {
    return `
      <div class="style-card">
        <img src="${imageUrl}" alt="${name}" class="style-img">
        <div class="style-footer">
          <span>${name}</span>
          <button onclick="window.open('${link}', '_blank')" class="style-book">Book</button>
        </div>
      </div>
    `;
  }

  renderPortfolioPage() {
    return `
      <section class="py-20 px-4 bg-gray-950 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <button onclick="history.back()" class="mb-6 text-blue-400 underline">&larr; Back</button>
          <h2 class="text-4xl font-bold text-center mb-4 gradient-text">Portfolio</h2>
          <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">Showcasing our best work across multiple industries</p>
          <div class="portfolio-grid">
            ${this.renderPortfolioItem("Tech Documentary", "videoEditing", "https://placehold.co/600x400?text=Tech+Documentary")}
            ${this.renderPortfolioItem("Brand Logo", "graphicDesign", "https://placehold.co/600x400?text=Brand+Logo")}
            ${this.renderPortfolioItem("Travel Video", "videoEditing", "https://placehold.co/600x400?text=Travel+Video")}
            ${this.renderPortfolioItem("Social Media Kit", "graphicDesign", "https://placehold.co/600x400?text=Social+Media+Kit")}
          </div>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderPortfolioItem(title, category, imageUrl) {
    return `
      <div class="portfolio-item">
        <img src="${imageUrl}" alt="${title}" class="w-full h-64 object-cover">
        <div class="portfolio-overlay">
          <h3 class="text-white font-bold text-xl">${title}</h3>
          <span class="text-blue-300 text-sm">${category.replace(/([A-Z])/g, ' $1').trim()}</span>
          <button class="view-btn">View Project</button>
        </div>
      </div>
    `;
  }

  renderAboutPage() {
    return `<section class="py-20 px-4 bg-gray-950 min-h-screen">About Us</section>`;
  }

  renderContactPage() {
    return `<section class="py-20 px-4 bg-gray-950 min-h-screen">Contact Us</section>`;
  }

  renderFooter() {
    return `
      <footer class="bg-gray-900/50 py-12 px-4 border-t border-gray-800">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><h3 class="text-xl font-bold gradient-text">RizwiElite</h3></div>
          <div><h4 class="font-bold mb-4">Services</h4><ul class="space-y-2"><li><button onclick="app.navigateTo('services', 'videoEditing')">Video Editing</button></li></ul></div>
          <div><h4 class="font-bold mb-4">Quick Links</h4><ul class="space-y-2"><li><button onclick="app.navigateTo('home')">Home</button></li></ul></div>
          <div><h4 class="font-bold mb-4">Connect</h4></div>
        </div>
      </footer>
    `;
  }

  renderChatbot() {
    return `
      <div id="chatbot" class="hidden">
        <div class="bg-gray-800 p-3 flex justify-between items-center">
          <span class="font-semibold">Chat with Us</span>
          <button onclick="app.toggleChatbot()" class="text-gray-400 hover:text-white">×</button>
        </div>
        <div id="chatbotMessages" class="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
          <div class="message">Hello! How can I help?</div>
        </div>
        <form id="chatbotForm" class="border-t border-gray-700 p-2 flex">
          <input type="text" placeholder="Type your message..." class="flex-1 bg-transparent outline-none text-white" />
          <button type="submit" class="ml-2 text-blue-400">Send</button>
        </form>
      </div>
      <div class="chatbot-toggle" onclick="app.toggleChatbot()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span>Need Help?</span>
      </div>
    `;
  }

  toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("hidden");
  }

  renderDarkModeToggle() {
    return `
      <button id="darkModeToggle" onclick="app.toggleDarkMode()" class="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 text-yellow-400 hover:bg-gray-700 transition-colors">
        <svg id="darkModeIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    `;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle("dark-mode", this.isDarkMode);
    localStorage.setItem("darkMode", this.isDarkMode);
    const icon = document.getElementById("darkModeIcon");
    icon.innerHTML = this.isDarkMode ?
      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />` :
      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
  }

  openSocial(url) {
    window.open(url, '_blank');
  }

  initPageFeatures() {
    if (this.currentPage === "contact") {
      document.getElementById("contactForm")?.addEventListener("submit", e => {
        e.preventDefault();
        alert("Thank you for contacting us!");
        e.target.reset();
      });
    }
  }
}

const app = new RizwiEliteApp();