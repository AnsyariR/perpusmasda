const firebaseConfig = {
    apiKey: "AIzaSyCABEf7VlTHYWiJw9zwqp9rNOUeVP9Pfsw",
    authDomain: "perpusmasda-31161.firebaseapp.com",
    projectId: "perpusmasda-31161",
    storageBucket: "perpusmasda-31161.appspot.com",
    messagingSenderId: "910743863292",
    appId: "1:910743863292:web:982c68c5eafbdf666e3c79",
    measurementId: "G-S8JN8H4C67"
};

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Login Google
let googleLogin = document.querySelector("#google-login"); 
googleLogin.addEventListener('click', function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        window.location.href = "admin.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

// Login Manual
// let  manualLogin = document.querySelector("#login");
// manualLogin.addEventListener('click', function(){
//     let email = document.querySelector("#email").value;
//     let password = document.querySelector("#password").value;

//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Login
//         const user = userCredential.user;
//         alert("Login Berhasil");
//         sessionStorage.setItem("storage_email", email);
//         sessionStorage.setItem("storage_password", password);
//         window.location.href = "index.html";
       
//     })
//     .catch((error) =>{
//         alert("Email atau Password salah");
//     })
//     e.preventDefault(); 
// });