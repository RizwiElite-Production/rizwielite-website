const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;
let selectedTier = null;

// Navigate Between Pages
function navigateTo(page, service = null, tier = null) {
  currentPage = page;
  selectedService = service;
  selectedTier = tier;
  renderPage();
}

// WhatsApp Button Click
function activatePlan(serviceName, tierName = "") {
  const message = encodeURIComponent(`Hi, I'm interested in "${serviceName}" ${tierName ? `(${tierName})` : ""}.`);
  window.open(`https://wa.me/+923325318695?text= ${message}`, "_blank");
}

// Email Button Click
function sendEmail(subject) {
  const body = encodeURIComponent(`Hi Rizwi, I'm interested in: ${subject}`);
  window.location.href = `mailto:rizwigul@gmail.com?subject=${subject}&body=${body}`;
}

// Open Social Links
function openSocial(url) {
  window.open(url, '_blank');
}

// Mock Data for Services
function getServiceData(name) {
  switch (name) {
    case 'videoEditing':
      return [
        { name: "Documentary Editing", price: "$15/video" },
        { name: "Wedding Highlights", price: "$25/video" },
        { name: "Faceless Videos", price: "$10/video" },
        { name: "Ad Edits", price: "$30/video" },
        { name: "YouTube Automation", price: "$20/video" },
        { name: "AI Video Editing", price: "$18/video" },
        { name: "Explainer Videos", price: "$35/video" },
        { name: "Reels/Shorts", price: "$12/video" },
        { name: "Event Highlight", price: "$40/video" },
        { name: "Corporate Video", price: "$50/video" }
      ];
    case 'graphicDesign':
      return [
        { name: "Logo Design", price: "$20/design" },
        { name: "Social Posts", price: "$10/post" },
        { name: "Banners & Thumbnails", price: "$15/design" },
        { name: "Brochure Design", price: "$25/design" },
        { name: "Illustration", price: "$30/hour" },
        { name: "Flyer Design", price: "$18/design" },
        { name: "Brand Kit", price: "$75/kits" },
        { name: "Infographics", price: "$20/design" },
        { name: "Poster Design", price: "$25/design" },
        { name: "Packaging Design", price: "$35/design" }
      ];
    case 'contentWriting':
      return [
        { name: "SEO Articles", price: "$10/article" },
        { name: "Blog Writing", price: "$12/article" },
        { name: "Product Descriptions", price: "$8/item" },
        { name: "Copywriting", price: "$20/page" },
        { name: "Video Scripts", price: "$15/script" },
        { name: "LinkedIn Bios", price: "$10/bio" },
        { name: "Research Articles", price: "$18/article" },
        { name: "Web Content", price: "$12/page" },
        { name: "Sales Copy", price: "$20/copy" },
        { name: "Case Studies", price: "$25/study" }
      ];
    case 'youtubeMonetization':
      return [
        { name: "Channel Setup", price: "$25/channel" },
        { name: "Growth Strategy", price: "$30/strategy" },
        { name: "SEO Optimization", price: "$20/video" },
        { name: "Thumbnail Design", price: "$10/design" },
        { name: "Upload Scheduling", price: "$20/month" },
        { name: "Analytics Report", price: "$18/report" },
        { name: "Channel Branding", price: "$30/service" },
        { name: "Audience Research", price: "$25/research" },
        { name: "Content Strategy", price: "$35/plan" },
        { name: "Monetization Guide", price: "$15/guide" }
      ];
    default:
      return [];
  }
}

// Tier Prices per Service
function getTierPrices(service) {
  return {
    videoEditing: {
      standard: "$15/video",
      medium: "$25/video",
      premium: "$35/video"
    },
    graphicDesign: {
      standard: "$20/design",
      medium: "$30/design",
      premium: "$50/design"
    },
    contentWriting: {
      standard: "$10/article",
      medium: "$15/article",
      premium: "$20/article"
    },
    youtubeMonetization: {
      standard: "$25/channel",
      medium: "$40/channel",
      premium: "$60/channel"
    }
  }[service] || {};
}

// Testimonials Section
function getTestimonials() {
  return `
    <div class="testimonials">
      <h2>What Clients Say</h2>
      <div class="testimonial-card">
        <img src="https://placehold.co/60x60 " alt="Client 1" />
        <p>"Rizwi is fast, creative, and always delivers beyond expectations!"</p>
        <p class="client-name">— Sarah, Creator</p>
      </div>
      <div class="testimonial-card">
        <img src="https://placehold.co/60x60 " alt="Client 2" />
        <p>"Professional editing and branding! Will work again soon."</p>
        <p class="client-name">— John, Business Owner</p>
      </div>
    </div>
  `;
}

// About Me Section
function getAboutMe() {
  return `
    <div class="about">
      <img src="https://placehold.co/300x300?text=Rizwi+Gul " alt="Rizwi Gul Logo" />
      <div class="bio">
        <h2>About Rizwi Gul</h2>
        <p>I’m Rizwi Gul, a passionate freelancer delivering premium video editing, design, writing, and YouTube services to clients worldwide.</p>
        <p>Started from scratch in 2020, I’ve helped over 200 creators grow their brand through quality visuals and strategy.</p>
        <ul>
          <li>Fast Delivery</li>
          <li>Affordable Pricing</li>
          <li>High Quality Output</li>
          <li>Dedicated Support</li>
        </ul>
        <div class="tools mt-4">
          <strong>Tools:</strong>
          <img class="tool-icon inline-block mr-2" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Adobe_Premiere_Pro_CC_icon.svg " alt="Premiere Pro" />
          <img class="tool-icon inline-block mr-2" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Adobe_Photoshop_Icon.svg " alt="Photoshop" />
          <img class="tool-icon inline-block" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Canva_App_Icon.png " alt="Canva" />
        </div>
        <p class="quote italic text-gray-300 mt-4">"Let's create something amazing together."</p>
      </div>
    </div>
  `;
}

// Contact Form + Buttons
function getContactForm() {
  return `
    <div class="contact-form-container p-6 max-w-md mx-auto bg-gray-800 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Contact Me</h1>
      <form onsubmit="event.preventDefault(); showConfirmation()" class="contact-form space-y-3">
        <input type="text" placeholder="Your Name" required class="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white" />
        <input type="email" placeholder="Your Email" required class="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white" />
        <select required class="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white">
          <option value="">Select Service</option>
          <option value="Video Editing">Video Editing</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Content Writing">Content Writing</option>
          <option value="YouTube Monetization">YouTube Monetization</option>
        </select>
        <textarea rows="4" placeholder="Your Message" required class="w-full px-4 py-2 rounded border border-gray-600 bg-gray-700 text-white"></textarea>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded">Send Message</button>
      </form>

      <div id="confirmation" class="hidden text-center mt-4 p-3 bg-green-800 rounded-md shadow-md">
        Thanks! I’ll respond within 24 hours.
      </div>

      <p class="text-center mt-4 mb-2">Or connect via:</p>
      <div class="contact-button-links flex justify-center gap-3">
        <button class="contact-btn bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded flex items-center gap-2" onclick="openSocial('https://wa.me/+923325318695 ')">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 10.5c-.37-.18-.86-.37-1.36-.33-2.26-.22-4.57-.94-6.56-2.17-2.19-1.36-3.85-3.27-4.81-5.42-.97-2.15-1.2-4.44-.67-6.63.17-.67.44-1.27.78-1.84.18-.3.36-.61.52-.94l-.03-.02c-.25-.64-.38-1.31-.38-2.02-.02-2.48 1.02-4.85 2.84-6.65 1.82-1.8 4.25-2.82 6.74-2.82s4.92 1 6.74 2.82S20 14.85 20 17.35c0 .7-.13 1.38-.38 2.02zM12 22c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z"/></svg>
          WhatsApp
        </button>
        <button class="contact-btn bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded flex items-center gap-2" onclick="sendEmail('General Inquiry')">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10z"/><circle cx="12" cy="12" r="2.6"/></svg>
          Email
        </button>
      </div>
    </div>
  `;
}

// Render the Page Based on Current State
function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">Rizwi Gul - Freelance Designer & Editor</h1>
        <nav class="mt-4">
          <button onclick="navigateTo('services')" class="mx-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Services</button>
          <button onclick="navigateTo('contact')" class="mx-2 bg-gray-700 hover:bg-gray-600 transition px-4 py-2 rounded">Contact</button>
        </nav>
      </header>

      <main class="p-6">
        <section class="about-section">${getAboutMe()}</section>
        <section class="testimonials-section">${getTestimonials()}</section>
      </main>
    `;
  }

  else if (currentPage === "services") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">My Services</h1>
        <nav class="mt-4">
          <button onclick="navigateTo('home')" class="mx-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Back to Home</button>
        </nav>
      </header>

      <main class="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'videoEditing')">
          <h2 class="font-bold">Video Editing</h2>
          <p>$15/video</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'graphicDesign')">
          <h2 class="font-bold">Graphic Design</h2>
          <p>$20/design</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'contentWriting')">
          <h2 class="font-bold">Content Writing</h2>
          <p>$10/article</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'youtubeMonetization')">
          <h2 class="font-bold">YouTube Monetization</h2>
          <p>$25/channel</p>
        </div>
      </main>
    `;
  }

  else if (currentPage === "tiers") {
    const tiers = getTierPrices(selectedService);
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">${selectedService}</h1>
        <nav class="mt-4">
          <button onclick="navigateTo('services')" class="mx-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Back to Services</button>
        </nav>
      </header>

      <main class="p-6 grid md:grid-cols-3 gap-4">
        <div class="tier-card bg-gray-800 p-4 rounded shadow">
          <h2 class="font-bold mb-2">Standard</h2>
          <p>${tiers.standard}</p>
          <button onclick="activatePlan('${selectedService}', 'Standard')" class="mt-4 w-full bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded">Activate</button>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow">
          <h2 class="font-bold mb-2">Medium</h2>
          <p>${tiers.medium}</p>
          <button onclick="activatePlan('${selectedService}', 'Medium')" class="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 transition px-4 py-2 rounded">Activate</button>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow">
          <h2 class="font-bold mb-2">Premium</h2>
          <p>${tiers.premium}</p>
          <button onclick="activatePlan('${selectedService}', 'Premium')" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded">Activate</button>
        </div>
      </main>
    `;
  }

  else if (currentPage === "contact") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">Contact Me</h1>
        <nav class="mt-4">
          <button onclick="navigateTo('home')" class="mx-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Back to Home</button>
        </nav>
      </header>

      <main class="p-6">
        ${getContactForm()}
      </main>
    `;
  }

  app.innerHTML = html;
}

// Show Confirmation After Submitting Form
function showConfirmation() {
  const confirmation = document.getElementById("confirmation");
  if (confirmation) {
    confirmation.classList.remove("hidden");
    setTimeout(() => confirmation.classList.add("hidden"), 3000);
  }
}

// Start App
renderPage();