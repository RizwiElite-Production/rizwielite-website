const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;
let selectedTier = null;

function navigateTo(page, service = null, tier = null) {
  currentPage = page;
  selectedService = service;
  selectedTier = tier;
  renderPage();
}

function activatePlan(serviceName, tierName = "") {
  const message = encodeURIComponent(`Hi Rizwi, I'm interested in "${serviceName}" ${tierName ? `(${tierName})` : ""}.`);
  window.open(`https://wa.me/+923325318695?text= ${message}`, "_blank");
}

function sendEmail(subject) {
  const body = encodeURIComponent(`Hi Rizwi, I'm interested in: ${subject}`);
  window.location.href = `mailto:rizwigul@gmail.com?subject=${subject}&body=${body}`;
}

function openSocial(url) {
  window.open(url, '_blank');
}

// Play video manually
function playVideo(element, videoUrl) {
  element.outerHTML = `
    <video controls class="w-full rounded shadow mx-auto" poster="" autoplay>
      <source src="${videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
}

// Service Subcategories
function getServiceData(name) {
  return {
    videoEditing: [
      { name: "Documentary Editing", media: '<img src="https://placehold.co/400x200?text=Documentary+Editing " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/documentary.mp4\')" class="cursor-pointer">', price: "$15/video" },
      { name: "Wedding Highlights", media: '<img src="https://placehold.co/400x200?text=Wedding+Highlights " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/wedding.mp4\')" class="cursor-pointer">', price: "$25/video" },
      { name: "Faceless Videos", media: '<img src="https://placehold.co/400x200?text=Faceless+Videos " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/faceless.mp4\')" class="cursor-pointer">', price: "$10/video" },
      { name: "Ad Edits", media: '<img src="https://placehold.co/400x200?text=Ad+Edits " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/ad.mp4\')" class="cursor-pointer">', price: "$30/video" },
      { name: "YouTube Automation", media: '<img src="https://placehold.co/400x200?text=YouTube+Automation " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/youtube.mp4\')" class="cursor-pointer">', price: "$20/video" },
      { name: "AI Video Editing", media: '<img src="https://placehold.co/400x200?text=AI+Video+Editing " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/ai.mp4\')" class="cursor-pointer">', price: "$18/video" },
      { name: "Explainer Videos", media: '<img src="https://placehold.co/400x200?text=Explainer+Videos " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/explainer.mp4\')" class="cursor-pointer">', price: "$35/video" },
      { name: "Reels/Shorts", media: '<img src="https://placehold.co/400x200?text=Reels+%2F+Shorts " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/reels.mp4\')" class="cursor-pointer">', price: "$12/video" },
      { name: "Event Highlight", media: '<img src="https://placehold.co/400x200?text=Event+Highlight " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/event.mp4\')" class="cursor-pointer">', price: "$40/video" },
      { name: "Corporate Video", media: '<img src="https://placehold.co/400x200?text=Corporate+Video " alt="Video Thumbnail" onclick="playVideo(this, \'/videos/corporate.mp4\')" class="cursor-pointer">', price: "$50/video" }
    ],
    graphicDesign: [
      { name: "Logo Design", media: '<img src="https://placehold.co/400x200?text=Logo+Design " alt="Logo Design" />', price: "$20/design" },
      { name: "Social Media Posts", media: '<img src="https://placehold.co/400x200?text=Social+Posts " alt="Social Post" />', price: "$10/post" },
      { name: "Banners & Thumbnails", media: '<img src="https://placehold.co/400x200?text=Banners+%26+Thumbnails " alt="Banner Design" />', price: "$15/design" },
      { name: "Brochure Design", media: '<img src="https://placehold.co/400x200?text=Brochure+Design " alt="Brochure Design" />', price: "$25/design" },
      { name: "Custom Illustration", media: '<img src="https://placehold.co/400x200?text=Illustration " alt="Illustration" />', price: "$30/hour" },
      { name: "Flyer Design", media: '<img src="https://placehold.co/400x200?text=Flyer+Design " alt="Flyer Design" />', price: "$18/design" },
      { name: "Brand Identity Kit", media: '<img src="https://placehold.co/400x200?text=Brand+Kit " alt="Brand Identity" />', price: "$75/kits" },
      { name: "Infographics", media: '<img src="https://placehold.co/400x200?text=Infographics " alt="Infographics" />', price: "$20/design" },
      { name: "Poster Design", media: '<img src="https://placehold.co/400x200?text=Poster+Design " alt="Poster Design" />', price: "$25/design" },
      { name: "Packaging Design", media: '<img src="https://placehold.co/400x200?text=Packaging+Design " alt="Packaging Design" />', price: "$35/design" }
    ],
    contentWriting: [
      { name: "SEO Articles", media: '<img src="https://placehold.co/400x200?text=SEO+Articles " alt="SEO Articles" />', price: "$10/article" },
      { name: "Blog Writing", media: '<img src="https://placehold.co/400x200?text=Blog+Writing " alt="Blog Writing" />', price: "$12/article" },
      { name: "Product Descriptions", media: '<img src="https://placehold.co/400x200?text=Product+Descriptions " alt="Product Description" />', price: "$8/item" },
      { name: "Copywriting", media: '<img src="https://placehold.co/400x200?text=Copywriting " alt="Copywriting" />', price: "$20/page" },
      { name: "Scripts for Videos", media: '<img src="https://placehold.co/400x200?text=Video+Script " alt="Video Script" />', price: "$15/script" },
      { name: "LinkedIn Bios", media: '<img src="https://placehold.co/400x200?text=LinkedIn+Bios " alt="LinkedIn Bio" />', price: "$10/bio" },
      { name: "Research Articles", media: '<img src="https://placehold.co/400x200?text=Research+Article " alt="Research Article" />', price: "$18/article" },
      { name: "Web Content", media: '<img src="https://placehold.co/400x200?text=Web+Content " alt="Web Content" />', price: "$12/page" },
      { name: "Sales Copy", media: '<img src="https://placehold.co/400x200?text=Sales+Copy " alt="Sales Copy" />', price: "$20/copy" },
      { name: "Case Studies", media: '<img src="https://placehold.co/400x200?text=Case+Study " alt="Case Study" />', price: "$25/study" }
    ],
    youtubeMonetization: [
      { name: "Channel Setup", media: '<img src="https://placehold.co/400x200?text=Channel+Setup " alt="Channel Setup" />', price: "$25/channel" },
      { name: "Growth Strategy", media: '<img src="https://placehold.co/400x200?text=Growth+Strategy " alt="Growth Strategy" />', price: "$30/strategy" },
      { name: "SEO Optimization", media: '<img src="https://placehold.co/400x200?text=SEO+Optimization " alt="SEO Optimization" />', price: "$20/video" },
      { name: "Thumbnail Design", media: '<img src="https://placehold.co/400x200?text=Thumbnail+Design " alt="Thumbnail Design" />', price: "$10/design" },
      { name: "Upload Schedule Planning", media: '<img src="https://placehold.co/400x200?text=Upload+Scheduling " alt="Upload Scheduling" />', price: "$20/month" },
      { name: "Analytics Report", media: '<img src="https://placehold.co/400x200?text=Analytics+Report " alt="Analytics Report" />', price: "$18/report" },
      { name: "Channel Branding", media: '<img src="https://placehold.co/400x200?text=Channel+Branding " alt="Channel Branding" />', price: "$30/service" },
      { name: "Audience Research", media: '<img src="https://placehold.co/400x200?text=Audience+Research " alt="Audience Research" />', price: "$25/research" },
      { name: "Content Strategy", media: '<img src="https://placehold.co/400x200?text=Content+Strategy " alt="Content Strategy" />', price: "$35/plan" },
      { name: "Monetization Guide", media: '<img src="https://placehold.co/400x200?text=Monetization+Guide " alt="Monetization Guide" />', price: "$15/guide" }
    ]
  }[name] || [];
}

// Tiered Pricing per Service
function getTierPrices(service) {
  return {
    videoEditing: {
      standard: "$15/video",
      medium: "$25/video",
      premium: "$35/video"
    }
  }[service] || {};
}

// Testimonials Section
function getTestimonials() {
  return `
    <div class="testimonials mt-12">
      <h2 class="text-2xl font-bold mb-4">What Clients Say</h2>
      <div class="testimonial-card flex items-start gap-4 mb-6">
        <img src="https://placehold.co/60x60 " alt="Client 1" />
        <div>
          <div class="rating text-yellow-400">⭐⭐⭐⭐⭐</div>
          <p>"Rizwi is fast, creative, and always delivers beyond expectations!"</p>
          <p class="client-name mt-2 text-gray-400">— Sarah, Creator</p>
        </div>
      </div>
      <div class="testimonial-card flex items-start gap-4 mb-6">
        <img src="https://placehold.co/60x60 " alt="Client 2" />
        <div>
          <div class="rating text-yellow-400">⭐⭐⭐⭐⭐</div>
          <p>"Professional editing and branding! Will work again soon."</p>
          <p class="client-name mt-2 text-gray-400">— John, Business Owner</p>
        </div>
      </div>
    </div>
  `;
}

// About Me Section
function getAboutMe() {
  return `
    <header class="bg-gray-800 p-6 text-center">
      <h1 class="text-3xl font-bold">About Rizwi Gul</h1>
      <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
    </header>

    <main class="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
      <img src="https://placehold.co/300x300?text=Rizwi+Gul " alt="Profile Picture" class="w-32 h-32 rounded-full object-cover" />
      <div class="bio">
        <p>I’m Rizwi Gul, a passionate freelancer delivering premium video editing, design, writing, and YouTube services to clients worldwide.</p>
        <p class="mt-4">Started from scratch in 2020, I’ve helped over 200 creators grow their brand through quality visuals and strategy.</p>
        <ul class="grid grid-cols-2 gap-2 mt-4">
          <li>Fast Delivery</li>
          <li>Affordable Pricing</li>
          <li>High Quality Output</li>
          <li>Dedicated Support</li>
        </ul>
        <div class="tools mt-4">
          <strong class="block mb-2">Tools:</strong>
          <div class="flex gap-3">
            <img class="tool-icon w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Adobe_Premiere_Pro_CC_icon.svg " alt="Premiere Pro" />
            <img class="tool-icon w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Adobe_Photoshop_Icon.svg " alt="Photoshop" />
            <img class="tool-icon w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Canva_App_Icon.png " alt="Canva" />
          </div>
        </div>
        <p class="quote mt-4 italic text-gray-300">"Let's create something amazing together."</p>
      </div>
    </main>
    
    ${getTestimonials()}
  `;
}

// Contact Form + Buttons
function getContactForm() {
  return `
    <header class="bg-gray-800 p-6 text-center">
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
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.498 14.568c-.37-.184-.864-.367-1.364-.334-2.26-.213-4.568-.94-6.556-2.172-2.195-1.364-3.846-3.27-4.817-5.417-.97-2.148-1.204-4.436-.673-6.63.167-.672.436-1.274.775-1.84.184-.304.367-.608.518-.945l-.033-.017c-.25-.64-.383-1.314-.383-2.017-.017-2.478 1.017-4.854 2.836-6.655C8.656 1.017 11.08 0 13.575 0S18.5 1.017 20.317 2.836s2.836 4.248 2.836 6.743c0 .704-.133 1.378-.383 2.017zM12 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/></svg>
          WhatsApp
        </button>
        <button class="contact-btn bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded flex items-center gap-2" onclick="sendEmail('General Inquiry')">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V8l8 5 8-5v10z"/><circle cx="12" cy="12" r="2.6"/></svg>
          Email
        </button>
      </div>
    </main>
  `;
}

// Footer Section
function getFooter() {
  return `
    <footer class="bg-gray-800 text-white p-6 mt-12">
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <h3 class="font-bold mb-2">Quick Links</h3>
          <ul class="space-y-1">
            <li><button onclick="navigateTo('home')">Home</button></li>
            <li><button onclick="navigateTo('services')">Services</button></li>
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
            <button onclick="openSocial('https://instagram.com/rizwielite.production ')">Instagram</button>
            <button onclick="openSocial('https://youtube.com/ @RizwiEliteProduction')">YouTube</button>
            <button onclick="openSocial('https://linkedin.com/in/rizwielite ')">LinkedIn</button>
          </div>
        </div>
      </div>
      <div class="mt-6 text-sm text-gray-400 text-center">
        © 2025 Rizwi Gul. All Rights Reserved.
      </div>
    </footer>
  `;
}

// Render Based on Current Page
function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">Rizwi Gul - Freelance Designer & Editor</h1>
        <nav class="mt-4">
          <button onclick="navigateTo('services', 'videoEditing')" class="mx-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded">Video Editing</button>
          <button onclick="navigateTo('services', 'graphicDesign')" class="mx-2 bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded">Graphic Design</button>
          <button onclick="navigateTo('services', 'contentWriting')" class="mx-2 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded">Content Writing</button>
          <button onclick="navigateTo('services', 'youtubeMonetization')" class="mx-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded">YouTube Monetization</button>
        </nav>
      </header>

      <main class="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'videoEditing')">
          <h2 class="font-bold">Video Editing</h2>
          <p>$15/video</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('services', 'graphicDesign')">
          <h2 class="font-bold">Graphic Design</h2>
          <p>$20/design</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('services', 'contentWriting')">
          <h2 class="font-bold">Content Writing</h2>
          <p>$10/article</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('services', 'youtubeMonetization')">
          <h2 class="font-bold">YouTube Monetization</h2>
          <p>$25/channel</p>
        </div>
      </main>
      
      ${getFooter()}
    `;
  }

  else if (currentPage === "tiers") {
    const tierPrices = getTierPrices(selectedService);

    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">${selectedService}</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
      </header>

      <main class="p-6 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center cursor-pointer" onclick="navigateTo('services', 'videoEditing', 'standard')">
          <h2 class="font-bold text-lg mb-2">Standard</h2>
          <p>${tierPrices.standard}</p>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center cursor-pointer" onclick="navigateTo('services', 'videoEditing', 'medium')">
          <h2 class="font-bold text-lg mb-2">Medium</h2>
          <p>${tierPrices.medium}</p>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center cursor-pointer" onclick="navigateTo('services', 'videoEditing', 'premium')">
          <h2 class="font-bold text-lg mb-2">Premium</h2>
          <p>${tierPrices.premium}</p>
        </div>
      </main>
      
      ${getFooter()}
    `;
  }

  else if (currentPage === "services") {
    const data = getServiceData(selectedService);

    html = `
      <header class="bg-gray-900 text-white p-6 text-center">
        <h1 class="text-3xl font-bold">${selectedService}</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
      </header>

      <main class="p-6 grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        ${data.map(item => `
          <div class="package-card bg-gray-800 p-4 rounded shadow text-center">
            <h3 class="font-semibold mb-2">${item.name}</h3>
            <div class="mb-2">${item.media}</div>
            <p class="text-sm text-gray-400">${item.price}</p>
          </div>
        `).join('')}
      </main>
      
      ${getFooter()}
    `;
  }

  else if (currentPage === "about") {
    html = getAboutMe() + getFooter();
  }

  else if (currentPage === "contact") {
    html = getContactForm() + getFooter();
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