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
        console.log(data);
        if (data.length === 0) {
          noElementTitle();
        } else {
          createTemplate(data);
        };
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

let noElementTitle = () => {
  let divCol = document.createElement('div');
  divCol.classList.add('d-flex', 'justify-content-center', 'col-sm-6', 'align-items-center');

  let divTitle = document.createElement('h3');
  divTitle.innerText = "No elements to display.";

  divCol.appendChild(divTitle);

  homepage.appendChild(divCol);
};

let createTemplate = (data) => {
    const cardElements = data.map(({ _id, name, description, imageUrl, price, brand }) => {
        let divCol = document.createElement('div');
        divCol.classList.add('col-xl-3', 'col-md-6' , 'mb-3');

        let divCard = document.createElement('div');
        divCard.classList.add('card', 'text-center');

        let imgCard = document.createElement('img');
        imgCard.src = `${imageUrl}`;
        imgCard.classList.add('card-img-top');
        imgCard.alt = `${name}`;

        let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        let cardBodyBrand = document.createElement('p');
        cardBodyBrand.innerText = `${brand}`;
        cardBodyBrand.classList.add('brand-text');

        let cardBodyTitle = document.createElement('h5');
        cardBodyTitle.innerText = `${name}`;

        let cardBodyParagraph = document.createElement('p');
        cardBodyParagraph.innerText = `${description}`;
        cardBodyParagraph.classList.add('text-truncate');

        let divCardBodyPrice = document.createElement('div');
        divCardBodyPrice.classList.add('row');
        

        let cardBodyPrice = document.createElement('p');
        cardBodyPrice.innerText = `Price: $${price}`;
        cardBodyPrice.classList.add('col-6', 'd-flex', 'align-items-center', 'justify-content-center', 'mb-3');

        let cardBodyButton = document.createElement('a');
        cardBodyButton.href = `./pages/details/index.html?q=${_id}`;
        cardBodyButton.classList.add('col-6','btn', 'btn-primary', 'cardButton');
        cardBodyButton.innerText = 'Details';

        divCardBody.appendChild(cardBodyBrand)
        divCardBody.appendChild(cardBodyTitle);
        divCardBody.appendChild(cardBodyParagraph);

        divCardBody.appendChild(divCardBodyPrice);
        divCardBodyPrice.appendChild(cardBodyPrice);
        
        divCardBodyPrice.appendChild(cardBodyButton);

        divCard.appendChild(imgCard);
        divCard.appendChild(divCardBody);

        divCol.appendChild(divCard);

        return divCol;
    });

    homepage.append(...cardElements);
};

window.onload = () => {
    fetchData();
};