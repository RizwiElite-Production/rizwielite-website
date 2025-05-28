const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;

const services = {
  videoEditing: [
    { name: "Documentary Editing", price: "$15/video" },
    { name: "Wedding Highlights", price: "$25/video" },
    { name: "Faceless Videos", price: "$10/video" },
    { name: "Advertisement Edits", price: "$30/video" },
    { name: "YouTube Automation", price: "$20/video" },
    { name: "AI Video Editing", price: "$18/video" },
    { name: "Explainer Videos", price: "$35/video" },
    { name: "Reels/Shorts", price: "$12/video" },
    { name: "Event Highlight Edits", price: "$40/video" }
  ],
  graphicDesign: [
    { name: "Logo Design", price: "$20/design" },
    { name: "Social Media Posts", price: "$10/post" },
    { name: "Banners & Thumbnails", price: "$15/design" },
    { name: "Brochure Design", price: "$25/design" },
    { name: "Custom Illustration", price: "$30/hour" },
    { name: "Flyer Design", price: "$18/design" },
    { name: "Brand Identity Kit", price: "$75/kits" }
  ],
  contentWriting: [
    { name: "SEO Articles (500 words)", price: "$10/article" },
    { name: "Blog Writing", price: "$12/article" },
    { name: "Product Descriptions", price: "$8/item" },
    { name: "Copywriting (ads/sales copy)", price: "$20/page" },
    { name: "Scripts for Videos", price: "$15/script" },
    { name: "LinkedIn Bios", price: "$10/bio" },
    { name: "Research Articles", price: "$18/article" }
  ],
  youtubeMonetization: [
    { name: "Channel Setup", price: "$25/channel" },
    { name: "Growth Strategy", price: "$30/strategy" },
    { name: "SEO Optimization", price: "$20/video" },
    { name: "Monetization Guide", price: "$15/guide" },
    { name: "Thumbnail Design", price: "$10/design" },
    { name: "Upload Schedule Planning", price: "$20/month" },
    { name: "Analytics Report", price: "$18/report" }
  ]
};

function navigateTo(page, service = null) {
  currentPage = page;
  selectedService = service;
  renderPage();
  closeMobileMenu();
}

function showMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector(".menu-content").classList.add("show");
  }, 10);
}

function closeMobileMenu() {
  document.querySelector(".menu-content").classList.remove("show");
  setTimeout(() => {
    document.getElementById("mobileMenu").classList.add("hidden");
  }, 300);
}

function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html += `
      <div class="hero">
        <div class="content">
          <h1>RizwiElite Production</h1>
          <p>Professional Freelance Services That Deliver Real Results</p>
          <button class="btn-primary" onclick="navigateTo('services')">Explore My Services</button>
        </div>
      </div>

      <div class="container">
        <div class="services-grid">
          <div class="service-card" onclick="navigateTo('services', 'videoEditing')">
            <img src="https://placehold.co/400x200?text=Video+Editing " alt="Video Editing">
            <div class="service-card-body">
              <h3>Video Editing</h3>
              <p>Click to view subcategories</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'graphicDesign')">
            <img src="https://placehold.co/400x200?text=Graphic+Design " alt="Graphic Design">
            <div class="service-card-body">
              <h3>Graphic Design</h3>
              <p>Click to view subcategories</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'contentWriting')">
            <img src="https://placehold.co/400x200?text=Content+Writing " alt="Content Writing">
            <div class="service-card-body">
              <h3>Content Writing</h3>
              <p>Click to view subcategories</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'youtubeMonetization')">
            <img src="https://placehold.co/400x200?text=YouTube+Monetization " alt="YouTube Monetization">
            <div class="service-card-body">
              <h3>YouTube Monetization</h3>
              <p>Click to view subcategories</p>
            </div>
          </div>
        </div>

        <div class="about">
          <img src="https://placehold.co/300x300 " alt="Profile">
          <h2>About Rizwi Gul</h2>
          <p>I'm Rizwi Gul, a passionate freelancer with expertise in video editing, graphic design, content writing, and YouTube monetization.</p>
          <ul>
            <li>Fast Delivery</li>
            <li>Affordable Pricing</li>
            <li>High Quality Output</li>
            <li>Dedicated Support</li>
          </ul>
        </div>

        <div class="cta">
          <h2>Contact Me For Professional Services</h2>
          <button class="btn-contact" onclick="navigateTo('contact')">Contact Me</button>
        </div>
      </div>
    `;
  } else if (currentPage === "services") {
    const serviceName = selectedService;
    const serviceTitleMap = {
      videoEditing: "Video Editing",
      graphicDesign: "Graphic Design",
      contentWriting: "Content Writing",
      youtubeMonetization: "YouTube Monetization"
    };
    const items = services[serviceName];

    html += `
      <button class="back-btn" onclick="navigateTo('services')">← Back to Services</button>
      <div class="container">
        <h1 class="service-detail">${serviceTitleMap[serviceName]}</h1>
        <div class="cards">
    `;

    items.forEach(item => {
      html += `
        <div class="card">
          <img src="https://placehold.co/400x200?text= ${encodeURIComponent(item.name)}" alt="${item.name}">
          <div class="card-body">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <div class="button-wrapper">
              <button class="btn-activate">Activate Plan</button>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  } else if (currentPage === "contact") {
    html += `
      <button class="back-btn" onclick="navigateTo('home')">← Back to Home</button>
      <div class="contact-form-container">
        <h1>Contact Me</h1>
        <div class="contact-info">
          <p>📧 <a href="mailto:rizwigul@gmail.com">rizwigul@gmail.com</a></p>
          <p>📱 <a href="https://wa.me/+923325318695 " target="_blank">+92 332 5318695</a></p>
        </div>
        <form class="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div class="footer">
        <p>© 2025 RizwiElite Production</p>
        <div>
          <a href="#" onclick="navigateTo('home')">Home</a> |
          <a href="#" onclick="navigateTo('services')">Services</a> |
          <a href="#" onclick="navigateTo('contact')">Contact</a>
        </div>
      </div>
    `;
  }

  app.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  window.navigateTo = navigateTo;
  window.showMobileMenu = showMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  renderPage();

  const hamburger = document.createElement("div");
  hamburger.className = "hamburger";
  hamburger.innerText = "☰";
  hamburger.onclick = showMobileMenu;
  document.body.appendChild(hamburger);
});