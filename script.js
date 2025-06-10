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
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      alpha: true,
      antialias: true
    });
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

  // Navigation
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

  // Page Rendering
  renderPage() {
    let html = '';
    switch(this.currentPage) {
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

  // Individual Pages

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
          <p class="text-gray-300 mb-6">I'm Rizwi, a passionate creative professional with over 5 years of experience in video editing, graphic design, and content creation.</p>
          <p class="text-gray-300 mb-6">My mission is to help creators and businesses elevate their visual presence through high-quality, engaging content that tells their story effectively.</p>
          <p class="text-gray-300">Whether you're an influencer, small business, or corporate entity — I bring your vision to life with precision and creativity.</p>
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
          <p class="text-gray-400 text-center max-w-2xl mx-auto mb-12">Have a project in mind? Let's discuss how we can bring your vision to life.</p>
          <form id="contactForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Your Name" required class="bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500">
              <input type="email" name="email" placeholder="Your Email" required class="bg-gray-900 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500">
            </div>
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
          <div>
            <h3 class="text-xl font-bold mb-4 gradient-text">RizwiElite</h3>
            <p class="text-gray-400">Premium creative services to elevate your brand and content.</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Services</h4>
            <ul class="space-y-2">
              <li><button onclick="app.navigateTo('services', 'videoEditing')" class="text-gray-400 hover:text-blue-400 transition-colors">Video Editing</button></li>
              <li><button onclick="app.navigateTo('services', 'graphicDesign')" class="text-gray-400 hover:text-blue-400 transition-colors">Graphic Design</button></li>
              <li><button onclick="app.navigateTo('services', 'contentWriting')" class="text-gray-400 hover:text-blue-400 transition-colors">Content Writing</button></li>
              <li><button onclick="app.navigateTo('services', 'youtubeMonetization')" class="text-gray-400 hover:text-blue-400 transition-colors">YouTube Strategy</button></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><button onclick="app.navigateTo('home')" class="text-gray-400 hover:text-blue-400 transition-colors">Home</button></li>
              <li><button onclick="app.navigateTo('portfolio')" class="text-gray-400 hover:text-blue-400 transition-colors">Portfolio</button></li>
              <li><button onclick="app.navigateTo('about')" class="text-gray-400 hover:text-blue-400 transition-colors">About</button></li>
              <li><button onclick="app.navigateTo('contact')" class="text-gray-400 hover:text-blue-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Connect</h4>
            <div class="flex space-x-4 mb-4">
              <button onclick="app.openSocial('https://instagram.com/rizwielite.production')" class="text-gray-400 hover:text-pink-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </button>
              <button onclick="app.openSocial('https://youtube.com/@RizwiEliteProduction')" class="text-gray-400 hover:text-red-500 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </button>
              <button onclick="app.openSocial('https://linkedin.com/in/rizwielite')" class="text-gray-400 hover:text-blue-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268"/>
              </svg>
              </button>
            </div>
          </div>
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
          <div class="bg-blue-600 text-white p-2 rounded-lg self-start max-w-xs">Hello! How can I assist you today?</div>
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
      document.getElementById("contactForm").addEventListener("submit", this.handleFormSubmit.bind(this));
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    console.log("Form Data:", data);
    e.target.reset();
  }
}

const app = new RizwiEliteApp();
