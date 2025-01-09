/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
/* === Firebase Setup === */
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD9amcE54TgOLn6ER_ybbq7RbIghJlGvgA",
    authDomain: "hot-and-cold-2cdbd.firebaseapp.com",
    projectId: "hot-and-cold-2cdbd",
    storageBucket: "hot-and-cold-2cdbd.firebasestorage.app",
    messagingSenderId: "1019157258412",
    appId: "1:1019157258412:web:3ef3a3fb2dc0bc5a6f7f09"
  };
  const app= initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app);
  console.log(db)
  console.log(auth)
/* === UI === */

/* == UI - Elements == */
const signOutButtonEl = document.getElementById("sign-out-btn")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")
/* == UI - Event Listeners == */
postButtonEl.addEventListener("click", postButtonPressed)

signOutButtonEl.addEventListener("click", authSignOut)

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */
console.log(app.options.projectId)
showLoggedOutView()
onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView
    showProfilePicture(userProfilePictureEl, user)
    showUserGreeting(userGreetingEl,user)
  } else {
    showLoggedOutView
  }
});

/* === Functions === */
function showProfilePicture(imgElement, user) {
    if (user.photoURL) {
        imgElement.src = user.photoURL
    }
    else {
        imgElement.src = "assets/images/defaultPic.jpg"
    }
}

function showUserGreeting(element, user) {
        if (user.displayName) {
            element.innerHTML = "Hi " + user.displayName
        }
        else {
            element.innerHTML = "Hey friend, how are you?"
        }
 }
 
 
/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")


    signInWithEmailAndPassword(auth, emailInputEl.value, passwordInputEl.value)
    .then((userCredential) => {
        // Signed in 
        showLoggedInView()
        // ...
    })
    .catch((error) => {
        console.log(error.message)  
    });
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailInputEl.value, passwordInputEl.value)
    .then((userCredential) => {
        // Signed up 
        showLoggedInView()
        // ...
    })
    .catch((error) => {
        console.log(error.message)
        // ..
    });
}

function authSignOut() {    
    signOut(auth).then(() => {
        // Sign-out successful.
        showLoggedOutView()
    }).catch((error) => {
        // An error happened.
    });
}

 
/* == Functions - UI Functions == */

async function addPostToDB(postBody, user) {

    try {
        const docRef = await addDoc(collection(db, "Posts"), {
            body: postBody,
            UID: user.uid,
            createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
 }
 
function postButtonPressed() {
    const postBody = textareaEl.value
    const user = auth.currentUser
   
    if (postBody) {
        addPostToDB(postBody, user)
        clearInputField(textareaEl)
    }
 }
 

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 
 
 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 
 
 function showView(view) {
    view.style.display = "flex"
 }
 
 
 function hideView(view) {
    view.style.display = "none"
 }
 

//credit: coursera