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

//TODO: Trasformare in map
let createTemplate = (data) => {
    data.forEach(({ _id, name, description, imageUrl, price, brand }) => {
        let divCol = document.createElement('div');
        divCol.classList.add('col-xl-3', 'col-md-6', 'mb-3');

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

        let cardBodyPrice = document.createElement('p');
        cardBodyPrice.innerText = `$${price}`;

        let cardBodyEditButton = document.createElement('a');
        cardBodyEditButton.href = `/admin/edit/index.html?q=${_id}`;
        cardBodyEditButton.classList.add('btn', 'btn-success', 'edit-button' , 'd-block', 'mb-2');
        cardBodyEditButton.innerText = 'Edit';

        let cardBodyButton = document.createElement('a');
        cardBodyButton.href = `/admin/details/index.html?q=${_id}`;
        cardBodyButton.classList.add('btn', 'btn-primary', 'mb-3');
        cardBodyButton.innerText = 'Details';

        let cardBodyDeleteButton = document.createElement('a');
        cardBodyDeleteButton.classList.add('btn', 'btn-danger', 'delete-button' , 'd-block'); 
        cardBodyDeleteButton.innerText = 'Delete';


        cardBodyDeleteButton.addEventListener('click', () => {
            deleteData(_id);
        });

        divCard.appendChild(cardBodyButton);

        divCardBody.appendChild(cardBodyBrand)
        divCardBody.appendChild(cardBodyTitle);
        divCardBody.appendChild(cardBodyParagraph);
        divCardBody.appendChild(cardBodyPrice);
        
        divCardBody.appendChild(cardBodyEditButton);
        divCardBody.appendChild(cardBodyDeleteButton);

        divCard.appendChild(imgCard);
        divCard.appendChild(divCardBody);

        divCol.appendChild(divCard);

        // Aggiungi il divCol a homepage
        homepage.appendChild(divCol);
    });
};

// Funzione per eliminare un dato
async function deleteData(itemId) {
    try {
      const response = await fetch(`${apiUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authorizationToken}`
        },
      });
  
      // Controlla se la risposta è nel range 200-299 (successo)
      if (response.ok) {
        console.log('Dato eliminato con successo');
        // Puoi richiamare la funzione fetchData per aggiornare la visualizzazione dopo l'eliminazione
        fetchData();
        location.reload();
      } else {
        // Se la risposta non è nel range 200-299, lancia un errore
        throw new Error(`Errore nella chiamata API: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Errore durante la chiamata API:', error.message);
    }
}

// Chiamata api al reload della pagina
window.onload = () => {
    fetchData();
};