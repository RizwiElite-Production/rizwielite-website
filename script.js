const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;

function navigateTo(page, service = null) {
  currentPage = page;
  selectedService = service;
  renderPage();
}

function showMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const content = menu.querySelector(".menu-content");
  menu.classList.remove("hidden");
  setTimeout(() => content.classList.add("show"), 10);
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const content = menu.querySelector(".menu-content");
  content.classList.remove("show");
  setTimeout(() => menu.classList.add("hidden"), 300);
}

function activatePlan(serviceName) {
  const message = encodeURIComponent(`Hi, I'm interested in "${serviceName}".`);
  window.open(`https://wa.me/+923325318695?text= ${message}`, "_blank");
}

function sendEmail(subject) {
  const body = encodeURIComponent(`Hi Rizwi, I'm interested in: ${subject}`);
  window.location.href = `mailto:rizwigul@gmail.com?subject=${subject}&body=${body}`;
}

function getServiceData(name) {
  return {
    videoEditing: [
      { name: "Documentary Editing", price: "$15/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Your browser does not support the video tag.</video>' },
      { name: "Wedding Highlights", price: "$25/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Faceless Videos", price: "$10/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Advertisement Edits", price: "$30/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "YouTube Automation", price: "$20/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "AI Video Editing", price: "$18/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Explainer Videos", price: "$35/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Reels/Shorts", price: "$12/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Event Highlight Edits", price: "$40/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' },
      { name: "Corporate Video Editing", price: "$50/video", media: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4">Video</video>' }
    ],
    graphicDesign: [
      { name: "Logo Design", price: "$20/design", media: '<img src="https://placehold.co/400x200?text=Logo+Design " alt="Logo Design">' },
      { name: "Social Media Posts", price: "$10/post", media: '<img src="https://placehold.co/400x200?text=Social+Posts " alt="Social Media Posts">' },
      { name: "Banners & Thumbnails", price: "$15/design", media: '<img src="https://placehold.co/400x200?text=Banners+%26+Thumbnails " alt="Banners & Thumbnails">' },
      { name: "Brochure Design", price: "$25/design", media: '<img src="https://placehold.co/400x200?text=Brochure+Design " alt="Brochure Design">' },
      { name: "Custom Illustration", price: "$30/hour", media: '<img src="https://placehold.co/400x200?text=Illustration " alt="Custom Illustration">' },
      { name: "Flyer Design", price: "$18/design", media: '<img src="https://placehold.co/400x200?text=Flyer+Design " alt="Flyer Design">' },
      { name: "Brand Identity Kit", price: "$75/kits", media: '<img src="https://placehold.co/400x200?text=Brand+Kit " alt="Brand Identity Kit">' },
      { name: "Infographics", price: "$20/design", media: '<img src="https://placehold.co/400x200?text=Infographics " alt="Infographics">' },
      { name: "Poster Design", price: "$25/design", media: '<img src="https://placehold.co/400x200?text=Poster+Design " alt="Poster Design">' },
      { name: "Packaging Design", price: "$35/design", media: '<img src="https://placehold.co/400x200?text=Packaging+Design " alt="Packaging Design">' }
    ],
    contentWriting: [
      { name: "SEO Articles", price: "$10/article", media: '<img src="https://placehold.co/400x200?text=SEO+Articles " alt="SEO Articles">' },
      { name: "Blog Writing", price: "$12/article", media: '<img src="https://placehold.co/400x200?text=Blog+Writing " alt="Blog Writing">' },
      { name: "Product Descriptions", price: "$8/item", media: '<img src="https://placehold.co/400x200?text=Product+Descriptions " alt="Product Descriptions">' },
      { name: "Copywriting", price: "$20/page", media: '<img src="https://placehold.co/400x200?text=Copywriting " alt="Copywriting">' },
      { name: "Scripts for Videos", price: "$15/script", media: '<img src="https://placehold.co/400x200?text=Video+Script " alt="Video Script">' },
      { name: "LinkedIn Bios", price: "$10/bio", media: '<img src="https://placehold.co/400x200?text=LinkedIn+Bios " alt="LinkedIn Bio">' },
      { name: "Research Articles", price: "$18/article", media: '<img src="https://placehold.co/400x200?text=Research+Article " alt="Research Article">' },
      { name: "Web Content", price: "$12/page", media: '<img src="https://placehold.co/400x200?text=Web+Content " alt="Web Content">' },
      { name: "Sales Copy", price: "$20/copy", media: '<img src="https://placehold.co/400x200?text=Sales+Copy " alt="Sales Copy">' },
      { name: "Case Studies", price: "$25/study", media: '<img src="https://placehold.co/400x200?text=Case+Study " alt="Case Study">' }
    ],
    youtubeMonetization: [
      { name: "Channel Setup", price: "$25/channel", media: '<img src="https://placehold.co/400x200?text=Channel+Setup " alt="Channel Setup">' },
      { name: "Growth Strategy", price: "$30/strategy", media: '<img src="https://placehold.co/400x200?text=Growth+Strategy " alt="Growth Strategy">' },
      { name: "SEO Optimization", price: "$20/video", media: '<img src="https://placehold.co/400x200?text=SEO+Optimization " alt="SEO Optimization">' },
      { name: "Monetization Guide", price: "$15/guide", media: '<img src="https://placehold.co/400x200?text=Monetization+Guide " alt="Monetization Guide">' },
      { name: "Thumbnail Design", price: "$10/design", media: '<img src="https://placehold.co/400x200?text=Thumbnail+Design " alt="Thumbnail Design">' },
      { name: "Upload Schedule Planning", price: "$20/month", media: '<img src="https://placehold.co/400x200?text=Upload+Scheduling " alt="Upload Scheduling">' },
      { name: "Analytics Report", price: "$18/report", media: '<img src="https://placehold.co/400x200?text=Analytics+Report " alt="Analytics Report">' },
      { name: "Channel Branding", price: "$30/service", media: '<img src="https://placehold.co/400x200?text=Channel+Branding " alt="Channel Branding">' },
      { name: "Audience Research", price: "$25/research", media: '<img src="https://placehold.co/400x200?text=Audience+Research " alt="Audience Research">' },
      { name: "Content Strategy", price: "$35/plan", media: '<img src="https://placehold.co/400x200?text=Content+Strategy " alt="Content Strategy">' }
    ]
  }[name] || [];
}

function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html += `
      <div class="hamburger" onclick="showMobileMenu()">☰</div>
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
              <p>View full range of editing styles</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'graphicDesign')">
            <img src="https://placehold.co/400x200?text=Graphic+Design " alt="Graphic Design">
            <div class="service-card-body">
              <h3>Graphic Design</h3>
              <p>Visual design for brands & content</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'contentWriting')">
            <img src="https://placehold.co/400x200?text=Content+Writing " alt="Content Writing">
            <div class="service-card-body">
              <h3>Content Writing</h3>
              <p>High-quality writing for all needs</p>
            </div>
          </div>
          <div class="service-card" onclick="navigateTo('services', 'youtubeMonetization')">
            <img src="https://placehold.co/400x200?text=YouTube+Monetization " alt="YouTube Monetization">
            <div class="service-card-body">
              <h3>YouTube Monetization</h3>
              <p>Grow and monetize your channel</p>
            </div>
          </div>
        </div>

        <div class="about">
          <img src="https://placehold.co/300x300 " alt="Rizwi Gul Logo">
          <h2>About Rizwi Gul</h2>
          <p>I'm Rizwi Gul, a passionate freelancer delivering premium video editing, design, writing, and YouTube services.</p>
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
    const items = getServiceData(serviceName);

    html += `
      <button class="back-btn" onclick="navigateTo('home')">← Back to Home</button>
      <div class="container">
        <h1 class="service-detail">${serviceName}</h1>
        <div class="cards">
    `;

    items.forEach(item => {
      html += `
        <div class="card">
          <div class="media">${item.media}</div>
          <div class="card-body">
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <div class="button-wrapper">
              <button class="btn-activate" onclick="activatePlan('${item.name}')">Activate Plan</button>
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
        <p class="text-center mb-4">How would you like to contact me?</p>
        <div class="contact-button-links">
          <button class="contact-btn" onclick="activatePlan('General Inquiry')">WhatsApp</button>
          <button class="contact-btn email" onclick="sendEmail('General Inquiry')">Email</button>
        </div>
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
  window.activatePlan = activatePlan;
  window.sendEmail = sendEmail;
  renderPage();

  const hamburger = document.createElement("div");
  hamburger.className = "hamburger";
  hamburger.innerText = "☰";
  hamburger.onclick = showMobileMenu;
  document.body.appendChild(hamburger);
});