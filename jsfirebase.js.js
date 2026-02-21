// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔑 Paste your config here
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ==========================
// 🔥 PRICE SYSTEM
// ==========================

async function loadPrices() {
  const docRef = doc(db, "store", "prices");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const prices = docSnap.data();

    document.getElementById("display1").innerText = prices.price1;
    document.getElementById("display2").innerText = prices.price2;
    document.getElementById("display3").innerText = prices.price3;
    document.getElementById("display4").innerText = prices.price4;
  }
}

async function updatePrices() {
  const prices = {
    price1: document.getElementById("price1").value,
    price2: document.getElementById("price2").value,
    price3: document.getElementById("price3").value,
    price4: document.getElementById("price4").value
  };

  await setDoc(doc(db, "store", "prices"), prices);
  alert("Prices Updated Globally ✅");
  loadPrices();
}

window.updatePrices = updatePrices;
window.onload = loadPrices;

// ==========================
// 🔐 ADMIN LOGIN
// ==========================

async function adminLogin() {
  const email = prompt("Admin Email:");
  const password = prompt("Admin Password:");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("adminPanel").style.display = "block";
    alert("Admin Logged In ✅");
  } catch (error) {
    alert("Login Failed ❌");
  }
}

window.toggleAdmin = adminLogin;