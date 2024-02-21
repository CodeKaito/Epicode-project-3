// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

let detailsContainer = document.getElementById('details-container');

// Crea la pagina di show dell'artista, ma solo se l'URL contiene un parametro!
if (window.location.search) {
    let params = new URLSearchParams(window.location.search);
    let queryValue = params.get('q');
    console.log(window.location.search);

    // Utilizza async/await per gestire in modo più pulito le promesse
    async function fetchData() {
        try {
            let response = await fetch(`${apiUrl}/${queryValue}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authorizationToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Errore nella risposta dalla richiesta: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log(data);
            showDetails(data);
        } catch (error) {
            console.error("Errore durante la chiamata API:", error);
        }
    }

    // Chiamare la funzione fetchData
    fetchData();
}

let showDetails = ({ name, description, price, brand, imageUrl }) => {

    let divCol = document.createElement('div');
    divCol.classList.add('col-md-3');

    let divCard = document.createElement('div');
    divCard.classList.add('card', 'details');

    let imgCard = document.createElement('img');
    imgCard.src = imageUrl;
    imgCard.alt = name;
    imgCard.classList.add('card-img-top');

    let divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');

    let title = document.createElement('h5');
    title.innerText = name;

    let priceParagraph = document.createElement('p');
    priceParagraph.innerText = `Price: ${price}`;

    let descriptionParagraph = document.createElement('p');
    descriptionParagraph.innerText = `Description: ${description}`;

    let brandParagraph = document.createElement('p');
    brandParagraph.innerText = `Brand: ${brand}`;

    divCardBody.appendChild(title);
    divCardBody.appendChild(priceParagraph);
    divCardBody.appendChild(descriptionParagraph);
    divCardBody.appendChild(brandParagraph);

    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    divCol.appendChild(divCard);

    detailsContainer.appendChild(divCol);
};

export default queryValue;