
import {auth} from "./script.js"
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// List of pages that require authentication
const protectedPages = [
  'home.html',
  'subjects.html',
  'chapters.html',
  'questions.html',
  'authonly.html'
];

const body = document.body;

onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname.split('/').pop();
  
  if (user) {
    // ✅ User is signed in
    const nameElement = document.getElementById("name");
    if (nameElement) {
      nameElement.innerText = "Welcome " + (user.displayName || "Someone with no name");
    }
  } else {
    // ❌ Not signed in
    if (protectedPages.includes(currentPage)) {
      // Create beautiful unauthorized overlay
      const coverPage = document.createElement("div");
      coverPage.className = "fixed inset-0 bg-gradient-to-br from-purple-900/95 to-red-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4";
      
      const contentBox = document.createElement("div");
      contentBox.className = "bg-white/10 rounded-2xl p-1 max-w-md w-full backdrop-blur-md transform hover:scale-105 transition-all duration-300 cursor-pointer";
      
      const content = document.createElement("div");
      content.className = "bg-gradient-to-br from-purple-600 to-red-500 rounded-xl p-8 text-center";
      
      const icon = document.createElement("div");
      icon.innerHTML = `
        <svg class="w-16 h-16 mx-auto mb-6 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m0 0h4m-4 0v2m4-2v2M9 7h6m0 0v2m0-2h2m-2 0zm0 0H9m0 0H7m2 0v2m0-2zm0 0h6M7 7h2m0 0v2m8-2v2m0-2h2M9 7V5m0 2v2m8-2V5m0 2v2"/>
        </svg>
      `;
      
      const message = document.createElement("div");
      message.className = "space-y-4";
      message.innerHTML = `
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Authentication Required</h2>
        <p class="text-white/80 text-sm sm:text-base">Please sign in to access this page</p>
        <button class="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-white/30 hover:border-white/50">
          Sign In to Continue
        </button>
      `;
      
      content.appendChild(icon);
      content.appendChild(message);
      contentBox.appendChild(content);
      coverPage.appendChild(contentBox);
      body.appendChild(coverPage);

      // Add click handler
      coverPage.addEventListener("click", () => {
        window.location.href = "signin.html";
      });

      // Add hover effect to the entire overlay
      coverPage.addEventListener("mousemove", (e) => {
        const rect = coverPage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        contentBox.style.transform = `
          scale(1.05)
          perspective(1000px)
          rotateY(${(x - rect.width / 2) / 50}deg)
          rotateX(${-(y - rect.height / 2) / 50}deg)
        `;
      });

      coverPage.addEventListener("mouseleave", () => {
        contentBox.style.transform = "scale(1) perspective(1000px) rotateY(0deg) rotateX(0deg)";
      });
    }
  }
});
