
import {auth} from "./script.js"
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";




  const body = document.body;


        const loader = document.getElementById("auth-loader");
        const content = document.getElementById("content");

  onAuthStateChanged(auth, (user) => {
    if (user) {



        loader.style.display = "none";
        if(window.Location.href=="authonly.html")
            content.style.display = "flex";

        const name=document.getElementById("name")
        if(user.displayName)
            name.innerText="Welcome "+user.displayName;
        else
            name.innerText="Welcome Someone with no name";
        

    } else {
      // ❌ Not signed in



        const hello = document.createElement("div");
        hello.innerHTML = "Wassup";
        hello.style.width = "fit-content";
        hello.style.height = "5vh";
        hello.style.backgroundColor = "red";
        hello.style.display = "flex";
        hello.style.justifyContent = "center";
        hello.style.alignItems = "center";
        hello.style.border = "2px solid black";
        hello.style.padding="2px"
        hello.style.cursor = "pointer"; // Optional, gives click hint








        const coverPage=document.createElement("div")
        coverPage.style.width="100%"
        coverPage.style.height="100%"
        coverPage.style.zIndex="10000"
        coverPage.style.backgroundColor="black"
        coverPage.style.display = "flex";
        coverPage.style.justifyContent = "center";
        coverPage.style.alignItems = "center";
        coverPage.style.position = "fixed";
        coverPage.style.top = "0";
        coverPage.style.left = "0";


        hello.innerHTML = "You are not authorized to enter buddy , turn around";
        coverPage.appendChild(hello)
        body.appendChild(coverPage);

        coverPage.addEventListener("click", () => {
        window.location.href = "signin.html";
      });

    }
  });
