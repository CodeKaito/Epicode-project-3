import { email, password } from '/index.js';

import successAlert from '/utils/alert.js';
import { failureAlert } from '/utils/alert.js';

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
        // alert("Authentication successful, redirect to admin console.");
        successAlert('Authentication successful, redirect to admin console. Please wait');
        setTimeout(() => {
            window.location.href = '/admin/homepage/index.html';
        }, 1500);

    } else {
        console.log("Authentication failed");
        // alert("Authentication failed");
        failureAlert('Authentication failed!');
    }
}