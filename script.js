const app = document.getElementById("app");
let currentPage = "home";
let selectedService = null;

// Navigate Between Pages
function navigateTo(page, service = null) {
  currentPage = page;
  selectedService = service;
  renderPage();
}

// WhatsApp Button Click
function activatePlan(serviceName, tierName = "") {
  const message = encodeURIComponent(`Hi Rizwi, I'm interested in "${serviceName}" ${tierName ? `(${tierName})` : ""}.`);
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

// Get Service Data
function getServiceData(name) {
  switch (name) {
    case 'videoEditing':
      return { title: "Video Editing", standard: "$15/video", medium: "$25/video", premium: "$35/video" };
    case 'graphicDesign':
      return { title: "Graphic Design", standard: "$20/design", medium: "$30/design", premium: "$50/design" };
    case 'contentWriting':
      return { title: "Content Writing", standard: "$10/article", medium: "$15/article", premium: "$20/article" };
    case 'youtubeMonetization':
      return { title: "YouTube Monetization", standard: "$25/channel", medium: "$40/channel", premium: "$60/channel" };
    default:
      return {};
  }
}

// Render Based on Current Page
function renderPage() {
  let html = "";

  if (currentPage === "home") {
    html = `
      <header class="bg-gray-800 p-6 text-center">
        <h1 class="text-2xl font-bold">Rizwi Gul - Freelance Designer & Editor</h1>
        <nav class="mt-4 flex justify-center gap-4">
          <button onclick="navigateTo('services')" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Services</button>
          <button onclick="navigateTo('contact')" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Contact</button>
        </nav>
      </header>
      <main class="p-6 text-center">
        <img src="https://placehold.co/300x300?text=Rizwi+Gul " alt="Profile" class="mx-auto mb-4 rounded-full w-32 h-32 object-cover" />
        <h2 class="text-xl mb-4">Freelance Video Editor | Graphic Designer | YouTube Expert</h2>
        <p>I help creators and businesses grow with quality editing, branding, and strategy.</p>
      </main>
    `;
  }

  else if (currentPage === "services") {
    html = `
      <header class="bg-gray-800 p-6 text-center">
        <h1 class="text-2xl font-bold">My Services</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
      </header>
      <main class="p-6 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'videoEditing')">
          <h2 class="font-bold text-lg">Video Editing</h2>
          <p>$15/video</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'graphicDesign')">
          <h2 class="font-bold text-lg">Graphic Design</h2>
          <p>$20/design</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'contentWriting')">
          <h2 class="font-bold text-lg">Content Writing</h2>
          <p>$10/article</p>
        </div>
        <div class="service-card bg-gray-800 p-4 rounded shadow cursor-pointer" onclick="navigateTo('tiers', 'youtubeMonetization')">
          <h2 class="font-bold text-lg">YouTube Monetization</h2>
          <p>$25/channel</p>
        </div>
      </main>
    `;
  }

  else if (currentPage === "tiers") {
    const data = getServiceData(selectedService);
    html = `
      <header class="bg-gray-800 p-6 text-center">
        <h1 class="text-2xl font-bold">${data.title}</h1>
        <button onclick="navigateTo('services')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back</button>
      </header>
      <main class="p-6 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center">
          <h2 class="font-bold text-lg mb-2">Standard</h2>
          <p>${data.standard}</p>
          <button onclick="activatePlan('${data.title}', 'Standard')" class="mt-4 w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded">WhatsApp</button>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center">
          <h2 class="font-bold text-lg mb-2">Medium</h2>
          <p>${data.medium}</p>
          <button onclick="activatePlan('${data.title}', 'Medium')" class="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">WhatsApp</button>
        </div>
        <div class="tier-card bg-gray-800 p-4 rounded shadow text-center">
          <h2 class="font-bold text-lg mb-2">Premium</h2>
          <p>${data.premium}</p>
          <button onclick="activatePlan('${data.title}', 'Premium')" class="mt-4 w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">WhatsApp</button>
        </div>
      </main>
    `;
  }

  else if (currentPage === "contact") {
    html = `
      <header class="bg-gray-800 p-6 text-center">
        <h1 class="text-2xl font-bold">Contact Me</h1>
        <button onclick="navigateTo('home')" class="mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">Back to Home</button>
      </header>
      <main class="p-6 max-w-md mx-auto">
        <form onsubmit="event.preventDefault(); showConfirmation()" class="space-y-4">
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
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Send Message</button>
        </form>

        <div id="confirmation" class="hidden mt-4 p-3 bg-green-800 text-center rounded">
          Thanks! I’ll reply within 24 hours.
        </div>

        <div class="mt-6 flex justify-center gap-4">
          <button onclick="openSocial('https://wa.me/+923325318695 ')" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.498 14.568c-.37-.184-.864-.367-1.364-.334-2.26-.213-4.568-.94-6.556-2.172-2.195-1.364-3.846-3.27-4.817-5.417-.97-2.148-1.204-4.436-.673-6.63.167-.672.436-1.274.775-1.84.184-.304.367-.608.518-.945l-.033-.017c-.25-.64-.383-1.314-.383-2.017-.017-2.478 1.017-4.854 2.836-6.655C8.656 1.017 11.08 0 13.575 0S18.5 1.017 20.317 2.836 22 8.08 22 10.58c0 .704-.133 1.378-.383 2.017zM12 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp
          </button>
          <button onclick="sendEmail('General Inquiry')" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 14H4V8l8 5 8-5v10z"/><circle cx="12" cy="12" r="2.6"/></svg>
            Email
          </button>
        </div>
      </main>
    `;
  }

  app.innerHTML = html;
}

// Show confirmation after form submission
function showConfirmation() {
  const confirmation = document.getElementById("confirmation");
  if (confirmation) {
    confirmation.classList.remove("hidden");
    setTimeout(() => confirmation.classList.add("hidden"), 3000);
  }
}

// Start App
renderPage();