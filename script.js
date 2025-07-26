// ✅ Common Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";;
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, GoogleAuthProvider,signInWithPopup,updateProfile} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore ,collection,addDoc,getDocs,doc,deleteDoc,updateDoc,setDoc,getDoc,serverTimestamp, query, onSnapshot, orderBy} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1pe7LutsnMX_pXjumEm3M_DK-G3hhY3w",
  authDomain: "taleemai-bad1d.firebaseapp.com",
  projectId: "taleemai-bad1d",
  storageBucket: "taleemai-bad1d.firebasestorage.app",
  messagingSenderId: "499476030112",
  appId: "1:499476030112:web:34704b813339437df11fc5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider()

const db = getFirestore(app);

// Export auth and db
export {auth, db}

// ✅ Taleemai button handler
const taleemaiBtn = document.getElementById('taleemai-btn');
if (taleemaiBtn) {
  taleemaiBtn.addEventListener('click', () => {
    window.location.href = 'chatbot.html';
  });
}

// ✅ Sign-up handler
const signupForm = document.getElementById("signup-form");
if (signupForm) {   //This avoids errors on pages that don’t have that form.
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const display_name=signupForm.displayName.value
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
          const user = userCredential.user;

      // Set the username after signup
        updateProfile(user, {
      displayName: display_name 
    }).then(() => {
      console.log("Username set successfully");
      alert("Signed up!");
      window.location.href = "signin.html";
    }).catch((error) => {
      alert("Error updating profile: " + error.message);
    });
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// ✅ Sign-in handler
const signinForm = document.getElementById("signin-form");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signinForm.email.value;
    const password = signinForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signed in!");
        window.location.href = "home.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}


// ✅ Sign-out handler
const signOutBtn = document.getElementById("signout-btn");

if (signOutBtn) {
  signOutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("Signed out!");
        window.location.href = "signin.html"; 
      })
      .catch((error) => {
        alert("Sign-out failed: " + error.message);
      });
  });
}


// ✅ Sign-in through Google handler
const googleSignin=document.getElementById("google-signin");
if(googleSignin){
googleSignin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Signed in as " + result.user.displayName);
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});}


// -------------------------
// Uploading data
// -------------------------





async function uploadData() {
  try {
    const shortQuestions = sqs;  // Define sqs somewhere above
    const Mcqs = mcqs;           // Define mcqs somewhere above

    await setDoc(doc(db, "classes", "12", "subjects", "chemistry", "chapters", "1"), {
      shortQuestions,
      Mcqs
    });

    console.log("Uploaded successfully.");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};










// Page Navigation Handlers
// -------------------------
// Class Selection Handler (home.html)
if (window.location.pathname.includes("home.html")) {
  const classBoxes = document.querySelectorAll("[id='9'], [id='10'], [id='11'], [id='12']");
  classBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const selectedClass = box.id;
      localStorage.setItem("selectedClass", selectedClass);
      window.location.href = "subjects.html";
    });
  });
}

// Subject Selection Handler (subjects.html)
if (window.location.pathname.includes("subjects.html")) {
  const subjectBoxes = document.querySelectorAll("[id='chemistry'], [id='biology'], [id='computer'], [id='physics']");
  subjectBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const selectedSubject = box.id;
      localStorage.setItem("selectedSubject", selectedSubject);
      window.location.href = "chapters.html";
    });
  });
}

// Chapter count configuration
const chapterCounts = {
  '9': {
    'chemistry': 8,
    'biology': 9,
    'physics': 9,
    'computer': 12
  },
  '10': {
    'chemistry': 8,
    'biology': 9,
    'physics': 9,
    'computer': 5
  },
  '11': {
    'chemistry': 11,
    'biology': 12,
    'physics': 8,
    'computer': 10
  },
  '12': {
    'chemistry': 16,
    'biology': 13,
    'physics': 10,
    'computer': 14
  }
};

// Chapter Selection Handler (chapters.html)
if (window.location.pathname.includes("chapters.html")) {
  const selectedClass = localStorage.getItem("selectedClass");
  const selectedSubject = localStorage.getItem("selectedSubject");
  
  if (selectedClass && selectedSubject) {
    const numChapters = chapterCounts[selectedClass][selectedSubject];
    const chapterContainer = document.querySelector(".grid");
    
    // Clear existing chapters
    chapterContainer.innerHTML = "";
    
    // Generate chapters dynamically
    const colors = [
      ['indigo', 'indigo'],
      ['blue', 'blue'],
      ['cyan', 'cyan'],
      ['teal', 'teal'],
      ['emerald', 'emerald'],
      ['green', 'green'],
      ['lime', 'lime'],
      ['yellow', 'yellow'],
      ['amber', 'amber'],
      ['orange', 'orange'],
      ['red', 'red'],
      ['rose', 'rose'],
      ['pink', 'pink'],
      ['fuchsia', 'fuchsia'],
      ['purple', 'purple'],
      ['violet', 'violet']
    ];
    
    for (let i = 1; i <= numChapters; i++) {
      const colorPair = colors[(i - 1) % colors.length];
      const chapterBox = document.createElement('div');
      chapterBox.id = i.toString();
      chapterBox.className = 'chapter-box bg-white rounded-2xl p-1 cursor-pointer';
      chapterBox.innerHTML = `
        <div class="bg-gradient-to-br from-${colorPair[0]}-400 to-${colorPair[1]}-500 rounded-xl p-6 h-full">
          <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
              <span class="min-[400px]:hidden">Ch</span>
              <span class="hidden min-[400px]:inline">Chapter</span>
              &nbsp;${i}
            </h3>
          </div>
        </div>
      `;
      
      chapterBox.addEventListener("click", () => {
        localStorage.setItem("selectedChapter", i.toString());
        window.location.href = "questions.html";
      });
      
      chapterContainer.appendChild(chapterBox);
    }
  }
}

// Questions Page Handler (questions.html)
if (window.location.pathname.includes("questions.html")) {
  async function fetchChapterData() {
    try {
      const selectedClass = localStorage.getItem("selectedClass");
      const selectedSubject = localStorage.getItem("selectedSubject");
      const selectedChapter = localStorage.getItem("selectedChapter");

      if (!selectedClass || !selectedSubject || !selectedChapter) {
        console.error("Missing selection data");
        return;
      }

      // Show loading animation
      const loading = document.getElementById("loading");
      const questionsContent = document.getElementById("questions-content");
      if (loading && questionsContent) {
        loading.classList.remove("hidden");
        questionsContent.classList.add("hidden");
      }

      const docRef = doc(db, "classes", selectedClass, "subjects", selectedSubject, "chapters", selectedChapter);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Document not found.");
        if (loading && questionsContent) {
          loading.classList.add("hidden");
          questionsContent.classList.remove("hidden");
        }
        return;
      }

      const data = docSnap.data();
      displayQuestions(data.shortQuestions, "short-questions");
      displayQuestions(data.Mcqs, "mcqs");

      // Hide loading animation after data is displayed
      if (loading && questionsContent) {
        loading.classList.add("hidden");
        questionsContent.classList.remove("hidden");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      // Hide loading on error
      const loading = document.getElementById("loading");
      const questionsContent = document.getElementById("questions-content");
      if (loading && questionsContent) {
        loading.classList.add("hidden");
        questionsContent.classList.remove("hidden");
      }
    }
  }

  function displayQuestions(questionsArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!Array.isArray(questionsArray)) {
      container.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
          <p class="text-gray-500 dark:text-gray-400 text-center">No questions available.</p>
        </div>
      `;
      return;
    }

    questionsArray.forEach((q, index) => {
      const questionCard = document.createElement("div");
      questionCard.className = "question-card bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md mb-6";

      if (q.question && q.answer && !q.options) {
        // Short Question
        questionCard.innerHTML = `
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <span class="bg-gradient-to-r from-purple-600 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                ${index + 1}
              </span>
              <p class="text-gray-800 dark:text-gray-100 text-lg font-medium">${q.question}</p>
            </div>
            <div class="pl-12">
              <p class="text-gray-600 dark:text-gray-300">
                <span class="font-medium text-purple-600 dark:text-purple-400">Answer:</span> 
                ${q.answer}
              </p>
            </div>
          </div>
        `;
      } else if (q.question && q.options && q.correctAnswer) {
        // MCQ
        const optionsHTML = Object.entries(q.options)
          .map(([key, value]) => `
            <div class="flex items-center gap-3 p-3 rounded-lg ${
              key.toLowerCase() === q.correctAnswer.toLowerCase() 
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
              : 'hover:bg-gray-50 dark:hover:bg-slate-700'
            }">
              <span class="w-8 h-8 rounded-full border-2 ${
                key.toLowerCase() === q.correctAnswer.toLowerCase() 
                ? 'border-green-500 text-green-500 dark:border-green-400 dark:text-green-400' 
                : 'border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400'
              } flex items-center justify-center font-medium">
                ${key.toUpperCase()}
              </span>
              <span class="${
                key.toLowerCase() === q.correctAnswer.toLowerCase() 
                ? 'text-green-700 dark:text-green-400' 
                : 'text-gray-700 dark:text-gray-300'
              }">${value}</span>
            </div>
          `).join("");

        questionCard.innerHTML = `
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <span class="bg-gradient-to-r from-purple-600 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                ${index + 1}
              </span>
              <p class="text-gray-800 dark:text-gray-100 text-lg font-medium">${q.question}</p>
            </div>
            <div class="pl-12 space-y-2">
              ${optionsHTML}
            </div>
          </div>
        `;
      }

      container.appendChild(questionCard);
    });
  }

  fetchChapterData();
}

// ✅ Feedback handler
if (window.location.pathname.includes("feedback.html")) {
  // Back button handler
  const backBtn = document.createElement("button");
  backBtn.className = "fixed top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-lg font-medium shadow-md hover:opacity-90 transition-all duration-300";
  backBtn.textContent = "Back";
  backBtn.onclick = () => history.back();
  document.body.appendChild(backBtn);

  // Create success message overlay (hidden by default)
  const successOverlay = document.createElement("div");
  successOverlay.className = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transform scale-0 opacity-0 transition-all duration-300 z-50";
  successOverlay.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-1 max-w-md w-full mx-4">
      <div class="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-8 text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p class="text-white/90">Your feedback has been submitted successfully.</p>
        <button class="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 border border-white/30 hover:border-white/50">
          Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(successOverlay);

  // Add click handler to close button and overlay
  successOverlay.querySelector('button').addEventListener('click', () => {
    successOverlay.classList.remove('scale-100', 'opacity-100');
    successOverlay.classList.add('scale-0', 'opacity-0');
  });

  // Load and display previous feedbacks
  const feedbacksContainer = document.getElementById("previousFeedbacks");
  if (feedbacksContainer) {
    const q = query(collection(db, "feedback"), orderBy("timestamp", "desc"));
    
    onSnapshot(q, (snapshot) => {
      feedbacksContainer.innerHTML = "";
      
      if (snapshot.empty) {
        feedbacksContainer.innerHTML = `
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
            <p class="text-white/80">No feedback submitted yet. Be the first one!</p>
          </div>
        `;
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const feedbackEl = document.createElement("div");
        feedbackEl.className = "bg-white/10 backdrop-blur-md rounded-xl p-6 mb-4";
        
        const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
        const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : "Just now";
        
        feedbackEl.innerHTML = `
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-medium text-white">${data.userName}</h3>
              <div class="text-yellow-400">${stars}</div>
            </div>
            <span class="text-sm text-white/70">${date}</span>
          </div>
          <p class="text-white/90 mt-2">${data.feedback}</p>
        `;
        
        feedbacksContainer.appendChild(feedbackEl);
      });
    });
  }

  // Feedback form handler
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      if (!auth.currentUser) {
        alert("Please sign in to submit feedback");
        return;
      }

      const feedback = document.getElementById("feedback").value;
      const rating = parseInt(document.getElementById("ratingInput").value);

      if (rating === 0) {
        alert("Please select a rating");
        return;
      }

      try {
        await addDoc(collection(db, "feedback"), {
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName || "Anonymous",
          feedback,
          rating,
          timestamp: serverTimestamp()
        });

        // Clear form
        document.getElementById("feedback").value = "";
        document.getElementById("ratingInput").value = "0";
        document.querySelectorAll(".star-btn").forEach(btn => {
          btn.classList.remove("text-yellow-400");
        });

        // Show success message
        successOverlay.classList.remove('scale-0', 'opacity-0');
        successOverlay.classList.add('scale-100', 'opacity-100');

        // Auto hide after 3 seconds
        setTimeout(() => {
          successOverlay.classList.remove('scale-100', 'opacity-100');
          successOverlay.classList.add('scale-0', 'opacity-0');
        }, 3000);

      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback. Please try again.");
      }
    });
  }
}


document.getElementById("ai").addEventListener("click", () => {
  window.location.href = "https://chatbot-rosy-two-23.vercel.app/";
});
