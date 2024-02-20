// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

// Global variables
let productTitle = document.getElementById('productTitle');

let productDesc = document.getElementById('productDesc');

let productBrand = document.getElementById('productBrand');

let imageUrl = document.getElementById('imageUrl');

let productPrice = document.getElementById('productPrice');

const addBtn = document.getElementById('addBtn');

// Funzione per ottenere i valori degli elementi e fare la chiamata API di tipo POST
async function fetchData() {
    // Ottieni i valori degli elementi quando la funzione è chiamata
    const postData = {
        name: productTitle.value,
        description: productDesc.value,
        brand: productBrand.value,
        imageUrl: imageUrl.value,
        price: productPrice.value,
    };

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authorizationToken}`,
            },
            body: JSON.stringify(postData),
        });

        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Errore durante la chiamata API:", error);
    }
}

addBtn.addEventListener('click', fetchData);