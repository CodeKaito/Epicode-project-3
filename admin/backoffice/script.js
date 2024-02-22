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

// Button per aggiungere il prodotto
const addBtn = document.getElementById('addBtn');

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
            alert('Attenzione! Esiste già un prodotto con lo stesso titolo');
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

// Controllo del prezzo per evitare che qualcuno inserisca delle lettere
productPrice.addEventListener('input', function (e) {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    e.target.value = inputValue;
});

// La funzione che permette alla card di anteprima del product di esistere
function updateCard() {
    // Il clear ogni volta che l'updateCard viene chiamato perché se no mi duplica n volte la card quante sono le chiamate!
    clearCardCreation();
    // Valorizzazione della card di anteprima
    cardExample(productTitle.value, productDesc.value, imageUrl.value, productBrand.value, productPrice.value);
    // Mi controlla se tutti gli input sono popolati
    checkAllInput();
}

// Funzione per ottenere i valori degli elementi e fare la chiamata API di tipo POST
async function fetchData() {
    // Ottengo i valori degli elementi quando la funzione è chiamata
    const postData = {
        name: productTitle.value,
        description: productDesc.value,
        brand: productBrand.value,
        imageUrl: imageUrl.value,
        price: productPrice.value,
    };
    
    // Chiamata api di tipo POST con body postData
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

        // Ogni volta che aggiungo una card, ho un alert che mi dice che la chiamata POST é andata a buon fine e il nome del prodotto
        alert('Product created successfully: ' + data.name)
        
        // Dopo aver aggiunto il prodotto al api mi sposto sulla pagina principale /admin/homepage
        window.location.href = '/admin/homepage/index.html';

    } catch (error) {
        console.error("Errore durante la chiamata API:", error);
    }
}

// Il button ha evento click per richiamare la funzione per fare la chiamata API di tipo POST
addBtn.addEventListener('click', fetchData);

// Funzione per creare la logica per evitare che si creino infinite cards di anteprima
function clearCardCreation() {
    // Rimuovo tutte le card create per evitare che si creino infinite cards
    while (cardCreation.firstChild) {
        cardCreation.removeChild(cardCreation.firstChild);
    }
}

// Funzione per controllare se tutti gli input sono correttamente popolati, altrimenti inserisce un disabled al button addBtn se non esiste giá nel dom
function checkAllInput() {
    const title = productTitle.value.trim();
    const desc = productDesc.value.trim();
    const brand = productBrand.value.trim();
    const image = imageUrl.value.trim();
    const price = productPrice.value.trim();

    if (title !== '' && desc !== '' && brand !== '' && image !== '' && price !== '') {
        addBtn.classList.remove('disabled');
    } else {
        addBtn.classList.add('disabled');
    }
}

// Creazione della funzione per creare la card di anteprima
let cardExample = (title, description, image, brand, price) => {
    let divCard = document.createElement('div');
        divCard.classList.add('card', 'text-center');

    let imgCard = document.createElement('img');
        imgCard.src = image || 'https://images.pexels.com/photos/4389675/pexels-photo-4389675.jpeg?auto=compress&cs=tinysrgb&w=600';
        imgCard.classList.add('img-fluid');
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
        cardBodyParagraph.classList.add('text-truncate');

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

// Inizializzo la card al reload della page
window.onload = cardExample();
