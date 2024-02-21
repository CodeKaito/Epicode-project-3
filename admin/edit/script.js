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

const patchBtn = document.getElementById('patchBtn');

let params = new URLSearchParams(window.location.search);
let queryValue = params.get('q');

const itemIdToUpdate = queryValue;

// Funzione per ottenere i valori degli elementi e fare la chiamata API di tipo POST
async function patchData(e) {
    e.preventDefault();
    const productsToUpdate = {
        name: productTitle.value,
        description: productDesc.value,
        brand: productBrand.value,
        imageUrl: imageUrl.value,
        price: productPrice.value,
    };

    try {
        let response = await fetch(`${apiUrl}/${itemIdToUpdate}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authorizationToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productsToUpdate),
        });

        let data = await response.json();
        console.log('Dati aggiornati con successo:', data);

        window.location.href = '/admin/homepage/index.html'

    } catch (error) {
        console.error("Errore durante la chiamata API:", error);
    }
}

// Funzione per caricare i dati all'avvio della pagina
async function loadData() {
    try {
        let response = await fetch(`${apiUrl}/${itemIdToUpdate}`, {
            headers: {
                'Authorization': `Bearer ${authorizationToken}`,
            },
        });

        let data = await response.json();

        // Popolo gli input con i dati della card, di modo che l'update sia piú veloce
        productTitle.value = data.name;
        productDesc.value = data.description;
        productBrand.value = data.brand;
        imageUrl.value = data.imageUrl;
        productPrice.value = data.price;

        console.log('Dati caricati con successo:', data);
    } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
    }
}

// Chiamare la funzione per caricare i dati all'avvio della pagina
window.onload = loadData;

patchBtn.addEventListener('click', patchData);