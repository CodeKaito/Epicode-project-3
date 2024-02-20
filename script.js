// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

// Variabili globali
let homepage = document.getElementById('homepage');

// Function per fare il fetching principale dell'api
async function fetchData() {
    try {
        let response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${authorizationToken}`
            }
        });

        let data = await response.json();
        createTemplate(data);

    } catch (error) {
        console.log(error);
    }
};

// <div class="col-md-3">
//             <div class="card">
//                 <img src="..." class="card-img-top" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">Card title</h5>
//                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of
//                         the card's content.</p>
//                     <a href="#" class="btn btn-primary">Go somewhere</a>
//                 </div>
//             </div>
//         </div>

let createTemplate = (data) => {
    data.forEach(({ _id, name, description, imageUrl }) => {
        let divCol = document.createElement('div');
        divCol.classList.add('col-md-3');

        let divCard = document.createElement('div');
        divCard.classList.add('card');

        let imgCard = document.createElement('img');
        imgCard.src = `${imageUrl}`;
        imgCard.classList.add('card-img-top');
        imgCard.alt = `${name}`;

        let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        let cardBodyTitle = document.createElement('h5');
        cardBodyTitle.innerText = `${name}`;

        let cardBodyParagraph = document.createElement('p');
        cardBodyParagraph.innerText = `${description}`;

        let cardBodyButton = document.createElement('a');
        cardBodyButton.href = `./pages/details/index.html?q=${_id}`;
        cardBodyButton.classList.add('btn', 'btn-primary');
        cardBodyButton.innerText = 'Details';

        // Aggiungi gli elementi correttamente
        divCardBody.appendChild(cardBodyTitle);
        divCardBody.appendChild(cardBodyParagraph);
        divCardBody.appendChild(cardBodyButton);

        divCard.appendChild(imgCard);
        divCard.appendChild(divCardBody);

        divCol.appendChild(divCard);

        // Aggiungi il divCol a homepage
        homepage.appendChild(divCol);
    });
};

// Chiamata api al reload della pagina
window.onload = () => {
    fetchData();
};