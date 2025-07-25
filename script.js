// ✅ Common Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";;
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, GoogleAuthProvider,signInWithPopup,updateProfile} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore ,collection,addDoc,getDocs,doc,deleteDoc,updateDoc,setDoc,getDoc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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


export {auth}





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

    await setDoc(doc(db, "classes", "9", "subjects", "computer", "chapters", "12"), {
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

// Chapter Selection Handler (chapters.html)
if (window.location.pathname.includes("chapters.html")) {
  const chapterBoxes = document.querySelectorAll(".chapter-box");
  chapterBoxes.forEach(box => {
    box.addEventListener("click", async () => {
      const selectedChapter = box.id;
      localStorage.setItem("selectedChapter", selectedChapter);
      window.location.href = "questions.html";
    });
  });
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

      const docRef = doc(db, "classes", selectedClass, "subjects", selectedSubject, "chapters", selectedChapter);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("Document not found.");
        return;
      }

      const data = docSnap.data();
      displayQuestions(data.shortQuestions, "short-questions");
      displayQuestions(data.Mcqs, "mcqs");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function displayQuestions(questionsArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    if (!Array.isArray(questionsArray)) {
      container.innerHTML = "<p>No data available.</p>";
      return;
    }

    questionsArray.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question";

      // For Short Questions
      if (q.question && q.answer && !q.options) {
        div.innerHTML = `
          <p><strong>Q${index + 1}:</strong> ${q.question}</p>
          <p><em>Ans:</em> ${q.answer}</p>
          <hr/>
        `;
      }
      // For MCQs with options as object
      else if (q.question && q.options && q.correctAnswer) {
        const optionsHTML = Object.entries(q.options)
          .map(([key, value]) => `<li><strong>${key.toUpperCase()}.</strong> ${value}</li>`)
          .join("");

        div.innerHTML = `
          <p><strong>Q${index + 1}:</strong> ${q.question}</p>
          <ul>${optionsHTML}</ul>
          <p><em>Correct Answer:</em> <strong>${q.correctAnswer.toUpperCase()}</strong></p>
          <hr/>
        `;
      }
      // Fallback
      else {
        div.textContent = `${index + 1}. ${JSON.stringify(q)}`;
      }

      container.appendChild(div);
    });
  }

  fetchChapterData();
}


document.getElementById("ai").addEventListener("click", () => {
  window.location.href = "https://chatbot-rosy-two-23.vercel.app/";
});
