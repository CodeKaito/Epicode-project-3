// Importa le variabili email e password dal modulo /index.js
import { email, password } from '/index.js';

// Ottieni riferimenti agli elementi del DOM
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let signIn = document.getElementById('signIn');

// Aggiungi un event listener per il tasto "Enter" nella casella di input password
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // Chiamata alla funzione authenticateUser quando viene premuto "Enter" nella casella di input password
        authenticateUser();
    }
});

// Aggiungi un event listener al click del pulsante "Sign In"
signIn.addEventListener('click', () => {
    // Chiamata alla funzione authenticateUser quando viene cliccato il pulsante "Sign In"
    authenticateUser();
});

// Funzione per autenticare l'utente
function authenticateUser() {
    // Ottieni i valori inseriti dall'utente nelle caselle di input email e password
    let userEmail = emailInput.value;
    let userPassword = passwordInput.value;

    // Confronta i valori inseriti con le credenziali memorizzate nel modulo /index.js
    if (userEmail === email && userPassword === password) {
        // Se le credenziali sono corrette, logga l'autenticazione e reindirizza alla console di amministrazione
        console.log("Authentication successful");
        alert("Authentication successful, redirect to admin console. Click OK");
        window.location.href = '/admin/homepage/index.html';

    } else {
        // Se le credenziali non sono corrette, visualizzo un alert di failed authentication
        console.log("Authentication failed");
        alert("Authentication failed");
    }
}
