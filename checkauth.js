
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
    if (currentPage === 'index.html' || currentPage === 'signin.html') {
      // Redirect to home if trying to access login/signup pages while logged in
      window.location.href = 'home.html';
      return;
    }

    // Show user name if the element exists
    const nameElement = document.getElementById("name");
    if (nameElement) {
      nameElement.innerText = "Welcome " + (user.displayName || "Someone with no name");
    }

  } else {
    // ❌ Not signed in
    if (protectedPages.includes(currentPage)) {
      // Create overlay for unauthorized access
      const coverPage = document.createElement("div");
      coverPage.style.width = "100%";
      coverPage.style.height = "100%";
      coverPage.style.zIndex = "10000";
      coverPage.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      coverPage.style.display = "flex";
      coverPage.style.justifyContent = "center";
      coverPage.style.alignItems = "center";
      coverPage.style.position = "fixed";
      coverPage.style.top = "0";
      coverPage.style.left = "0";

      const message = document.createElement("div");
      message.innerHTML = "Please sign in to access this page";
      message.style.color = "white";
      message.style.padding = "20px 40px";
      message.style.backgroundColor = "#FF4444";
      message.style.borderRadius = "8px";
      message.style.cursor = "pointer";
      message.style.fontFamily = "serif";
      message.style.fontSize = "1.2rem";
      message.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

      coverPage.appendChild(message);
      body.appendChild(coverPage);

      coverPage.addEventListener("click", () => {
        window.location.href = "signin.html";
      });
    }
  }
});
