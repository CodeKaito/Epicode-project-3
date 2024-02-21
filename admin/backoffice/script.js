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

let cardCreation = document.getElementById('cardCreation');

const addBtn = document.getElementById('addBtn');

productTitle.addEventListener('input', updateCard);

productDesc.addEventListener('input', updateCard);

productBrand.addEventListener('input', updateCard);

imageUrl.addEventListener('input', updateCard);

productPrice.addEventListener('input', updateCard);

function updateCard() {
    clearCardCreation();
    cardExample(productTitle.value, productDesc.value, imageUrl.value, productBrand.value, productPrice.value );
}

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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        let data = await response.json();
        console.log(data);
        window.location.href = '/admin/homepage/index.html';

    } catch (error) {
        console.error("Errore durante la chiamata API:", error);
    }
}

addBtn.addEventListener('click', fetchData);

function clearCardCreation() {
    // Remove all child elements from cardCreation
    while (cardCreation.firstChild) {
        cardCreation.removeChild(cardCreation.firstChild);
    }
}

async function cardExample(title, description, image, brand, price) {
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
        cardBodyPrice.innerText = price || '$54';

    divCardBody.appendChild(cardBodyBrand)
    divCardBody.appendChild(cardBodyTitle);
    divCardBody.appendChild(cardBodyParagraph);
    divCardBody.appendChild(cardBodyPrice);

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    cardCreation.appendChild(divCard);


}

cardExample();