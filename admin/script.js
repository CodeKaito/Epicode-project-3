import { email, password } from '/index.js';

let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let signIn = document.getElementById('signIn');

passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        authenticateUser();
    }
});

signIn.addEventListener('click', () => {
    authenticateUser();
});

function authenticateUser() {
    let userEmail = emailInput.value;
    let userPassword = passwordInput.value;

    if (userEmail === email && userPassword === password) {
        console.log("Authentication successful");
        window.location.href = '/admin/homepage/index.html';
    } else {
        console.log("Authentication failed");
        alert("Authentication failed");
    }
}