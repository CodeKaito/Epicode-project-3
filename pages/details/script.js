// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

let detailsContainer = document.getElementById('details-container');

// Crea la pagina di show dell'artista, ma solo se l'URL contiene un parametro!
if (window.location.search) {
    let params = new URLSearchParams(window.location.search);
    // Utilizzo la queryValue per essere utilizzato come id
    let queryValue = params.get('q');

    // Utilizzo dell async/await per gestire in modo più pulito le promesse
    async function fetchData() {
        try {
            let response = await fetch(`${apiUrl}/${queryValue}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                },
            });

            let data = await response.json();

            // Richiamata della funzione per la creazione della card detail
            showDetails(data);

        } catch (error) {
            console.error("Errore durante la chiamata API:", error);
        }
    }

    // Chiamata della funzione fetchData per effettuare la chiamata GET
    fetchData();
}

// Creazione della card di detail in modo dinamico con js
let showDetails = ({ name, description, price, brand, imageUrl }) => {

    let divCol = document.createElement('div');
        divCol.classList.add('col-md-6');

    let divCard = document.createElement('div');
        divCard.classList.add('card', 'mb-3', 'details');

    let divRow = document.createElement('div');
        divRow.classList.add('row', 'g-0');

    let divColImg = document.createElement('div');
        divColImg.classList.add('col-lg-5');

    let imgCard = document.createElement('img');
        imgCard.src = imageUrl;
        imgCard.alt = name;
        imgCard.classList.add('img-fluid', 'rounded-start');

    let divColCardBody = document.createElement('div');
        divColCardBody.classList.add('col-lg-7');

    let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body', 'border-card-body');

    let title = document.createElement('p');
        title.innerHTML = `<p>Name of the product: <strong>${name}<strong><p>`;

    let priceParagraph = document.createElement('p');
        priceParagraph.innerHTML = `<p>Price: $<strong>${price}<strong><p>`;

    let descriptionParagraph = document.createElement('p');
        descriptionParagraph.innerHTML = `<p>Description: <strong>${description}<strong><p>`;

    let brandParagraph = document.createElement('p');
        brandParagraph.innerHTML = `<p>Brand: <strong>${brand}<strong><p>`;

        divCardBody.appendChild(title);
        divCardBody.appendChild(priceParagraph);
        divCardBody.appendChild(descriptionParagraph);
        divCardBody.appendChild(brandParagraph);

        divColImg.appendChild(imgCard);
    
        divRow.appendChild(divColImg);
        divRow.appendChild(divColCardBody);

        divColCardBody.appendChild(divCardBody);

        divCard.appendChild(divRow);

        divCol.appendChild(divCard);

        detailsContainer.appendChild(divCol);
};
