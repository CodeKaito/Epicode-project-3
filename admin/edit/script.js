// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

import successAlert from '/utils/alert.js';
import { failureAlert } from '/utils/alert.js';

// Global variables
let productTitle = document.getElementById('productTitle');
let productDesc = document.getElementById('productDesc');
let productBrand = document.getElementById('productBrand');
let imageUrl = document.getElementById('imageUrl');
let productPrice = document.getElementById('productPrice');

// Aggiunge un event listener per il blur sull'elemento productTitle
productTitle.addEventListener('blur', async function (e) {
    // Ottiene il valore dell'input al momento del blur
    const valoreInput = e.target.value;
    // Inizio del try catch
    try {
        // Effettua una chiamata API di tipo GET per ottenere i dati
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authorizationToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Estrae i dati dalla risposta
        let data = await response.json();

        // Estrae i titoli dalla risposta API
        const titoliAPI = data.map(item => item.name);

        // Controlla se il valore dell'input è già presente nei titoli ottenuti dall'API
        if (titoliAPI.includes(valoreInput)) {
            // Se sì, mostra un avviso all'utente
            // alert('Attenzione! Esiste già un prodotto con lo stesso titolo');
            failureAlert("Error! There's already a product with this name");
        }
    } catch (error) {
        // Gestisce gli errori durante la chiamata API
        console.error("Errore durante la chiamata GET API:", error);
    }
});

// Degli addEventListener che captano ció che ho in input per aggiornare la card che funge da anteprima
productTitle.addEventListener('input', updateCard);
productDesc.addEventListener('input', updateCard);
productBrand.addEventListener('input', updateCard);
imageUrl.addEventListener('input', updateCard);
productPrice.addEventListener('input', updateCard);



function updateCard() {
    clearCardCreation();
    cardExample(productTitle.value, productDesc.value, imageUrl.value, productBrand.value, productPrice.value );
}

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

        // alert('Data updated successfully');

        successAlert('Product updated successfully');

        setTimeout(() => {
            window.location.href = '/admin/homepage/index.html';
        }, 1500);
        

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

        updateCard();

        console.log('Dati caricati con successo:', data);
    } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
    }
}

// Chiamare la funzione per caricare i dati all'avvio della pagina
window.onload = loadData;

patchBtn.addEventListener('click', patchData);

function clearCardCreation() {
    // Remove all child elements from cardCreation
    while (cardCreation.firstChild) {
        cardCreation.removeChild(cardCreation.firstChild);
    }
}

let cardExample = (title, description, image, brand, price) => {
    let divCard = document.createElement('div');
        divCard.classList.add('card', 'text-center');

    let imgCard = document.createElement('img');
        imgCard.src = image || 'https://images.pexels.com/photos/4389675/pexels-photo-4389675.jpeg?auto=compress&cs=tinysrgb&w=600';
        imgCard.classList.add('card-img-top');
        imgCard.alt = title;

    let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

    let cardBodyBrand = document.createElement('p');
        cardBodyBrand.innerText = brand || "I'm the brand";
        cardBodyBrand.classList.add('brand-text');

    let cardBodyTitle = document.createElement('h5');
        cardBodyTitle.innerText = title || 'This is the name';

    let cardBodyParagraph = document.createElement('p');
        cardBodyParagraph.innerText = description || 'This is the product description';

    let cardBodyPrice = document.createElement('p');
        cardBodyPrice.innerText = '$'+price;

    divCardBody.appendChild(cardBodyBrand)
    divCardBody.appendChild(cardBodyTitle);
    divCardBody.appendChild(cardBodyParagraph);
    divCardBody.appendChild(cardBodyPrice);

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    cardCreation.appendChild(divCard);
}

window.load = cardExample();