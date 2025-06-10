// Main App Controller
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
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (this.threeJS) {
      this.threeJS.camera.aspect = window.innerWidth / window.innerHeight;
      this.threeJS.camera.updateProjectionMatrix();
      this.threeJS.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // 3D Background with Three.js
  init3DBackground() {
    const canvas = document.getElementById("bgCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
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

  // Particle.js Background
  initParticles() {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#3b82f6"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#3b82f6",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": true,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
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
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }

  navigateTo(page, service = null) {
    this.currentPage = page;
    this.selectedService = service;
    this.renderPage();
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
      ease: "power2.inOut"
    });
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
    document.getElementById("app").innerHTML = html;
    this.initPageFeatures();
  }

  renderHomePage() {
    return `
      <section class="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0"></div>
        <div class="relative z-10 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Premium <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Creative Services</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transforming your vision into stunning visual content.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button onclick="app.navigateTo('services')" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Services
            </button>
            <button onclick="app.navigateTo('contact')" class="bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>
        <div class="absolute bottom-10 left-0 right-0 flex justify-center">
          <div class="animate-bounce w-8 h-8 border-4 border-blue-500 rounded-full" style="border-bottom-color: transparent;"></div>
        </div>
      </section>
      ${this.renderFooter()}
      ${this.renderChatbot()}
      ${this.renderDarkModeToggle()}
    `;
  }

  renderServicesPage() {
    return `
      <section class="py-20 px-4 bg-gray-950">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-center mb-4 gradient-text">Our Services</h2>
          <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">Professional solutions tailored to your creative needs</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${this.renderServiceCard("Video Editing", "$15/video", "Edit your footage into compelling stories", "videoEditing")}
            ${this.renderServiceCard("Graphic Design", "$20/design", "Stunning visuals for your brand", "graphicDesign")}
            ${this.renderServiceCard("Content Writing", "$10/article", "Engaging written content", "contentWriting")}
            ${this.renderServiceCard("YouTube Strategy", "$25/session", "Grow your channel effectively", "youtubeMonetization")}
          </div>
          <div class="mt-16 text-center">
            <button onclick="app.navigateTo('contact')" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderPortfolioPage() {
    return `
      <section class="py-20 px-4 bg-gray-950">
        <div class="max-w-6xl mx-auto">
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

  renderAboutPage() {
    return `
      <section class="py-20 px-4 bg-gray-950">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-center mb-4 gradient-text">About Me</h2>
          <p class="text-gray-300 mb-6">I'm Rizwi, a passionate creative professional with over 5 years of experience.</p>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderContactPage() {
    return `
      <section class="py-20 px-4 bg-gray-950">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-center mb-4 gradient-text">Get In Touch</h2>
          <form id="contactForm" class="space-y-6">
            <input type="text" name="name" placeholder="Your Name" required class="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500">
            <input type="email" name="email" placeholder="Your Email" required class="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500">
            <textarea name="message" rows="5" placeholder="Your Message" required class="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500"></textarea>
            <button type="submit" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Send Message
            </button>
          </form>
        </div>
        ${this.renderFooter()}
        ${this.renderChatbot()}
        ${this.renderDarkModeToggle()}
      </section>
    `;
  }

  renderFooter() {
    return `
      <footer class="bg-gray-900/50 py-12 px-4 border-t border-gray-800 mt-20">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><h3 class="text-xl font-bold mb-4 gradient-text">RizwiElite</h3></div>
          <div><h4 class="font-bold mb-4">Services</h4><ul class="space-y-2"><li><button onclick="app.navigateTo('services', 'videoEditing')">Video Editing</button></li></ul></div>
          <div><h4 class="font-bold mb-4">Quick Links</h4><ul class="space-y-2"><li><button onclick="app.navigateTo('home')">Home</button></li></ul></div>
          <div><h4 class="font-bold mb-4">Connect</h4></div>
        </div>
      </footer>
    `;
  }

  renderChatbot() {
    return `
      <div id="chatbot" class="fixed bottom-20 right-6 w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl z-40 hidden flex-col">
        <div class="bg-gray-800 p-3 flex justify-between items-center">
          <span class="font-semibold">Chat with Us</span>
          <button onclick="app.toggleChatbot()" class="text-gray-400 hover:text-white">×</button>
        </div>
        <div id="chatbotMessages" class="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
          <div class="bg-blue-600 text-white p-2 rounded-lg self-start max-w-xs">Hello! How can I help?</div>
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
      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />` :
      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
  }

  openSocial(url) {
    window.open(url, '_blank');
  }

  initPageFeatures() {
    if (this.currentPage === "contact") {
      document.getElementById("contactForm").addEventListener("submit", e => {
        e.preventDefault();
        alert("Thank you for contacting us!");
        e.target.reset();
      });
    }
  }
}

const app = new RizwiEliteApp();
