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
    let detailsHtml = `
        <div class="card details">
            <img src="${imageUrl}" alt="${name}" class="card-img-top" />
            <div class="card-body">
                <h1>${name}</h1>
                <p>Price: ${price}</p>
                <p>Description: ${description}</p>
                <p>Category: ${brand}</p>
            </div>
        </div>
    `;
    detailsContainer.innerHTML = detailsHtml;
};