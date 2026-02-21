const phoneNumber = "8615253131891";
const adminPassword = "brolyss5";
let adminLoggedIn = false;

/* Loader */
window.addEventListener("load",function(){
    document.getElementById("loader").style.display="none";
});

/* Flip Card */
function flipCard(card){
    card.classList.toggle("flip");
    playPokedexSound();
}

/* Sound */
function playPokedexSound(){
    const audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type="square";
    oscillator.frequency.setValueAtTime(600,audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200,audioCtx.currentTime+0.15);

    gainNode.gain.setValueAtTime(0.2,audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime+0.2);
}

/* WhatsApp */
function buyProduct(event,productName){
    event.stopPropagation();
    let message=encodeURIComponent("Hi PokeDoc! I want to buy: "+productName);
    window.open("https://wa.me/"+phoneNumber+"?text="+message,"_blank");
}

/* Dark Mode */
document.getElementById("darkToggle").addEventListener("click",function(){
    document.body.classList.toggle("dark");
});

/* Admin */
function toggleAdmin(){
    const panel=document.getElementById("adminPanel");

    if(adminLoggedIn){
        panel.style.display=panel.style.display==="none"?"block":"none";
        return;
    }

    let pass=prompt("Enter Admin Password:");

    if(pass===adminPassword){
        adminLoggedIn=true;
        panel.style.display="block";
    }else{
        alert("Incorrect password");
    }
}

function updatePrices(){
    document.getElementById("display1").innerText=
        document.getElementById("price1").value+" each";

    document.getElementById("display2").innerText=
        document.getElementById("price2").value+" each";

    document.getElementById("display3").innerText=
        document.getElementById("price3").value+" each";

    document.getElementById("display4").innerText=
        document.getElementById("price4").value+" each";
}