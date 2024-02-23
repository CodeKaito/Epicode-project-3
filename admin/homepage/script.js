// l'endpoint dell'api URL
import apiUrl from "/index.js";
// L'autorization key per accedere all'api
import { authorizationToken } from "/index.js";

import successAlert from '/utils/alert.js';
import { failureAlert } from '/utils/alert.js';

// Variabili globali
let homepage = document.getElementById('homepage');

// Function per fare il la chiamata GET principale dell'api
async function fetchData() {
    try {
        let response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${authorizationToken}`
            }
        });

        let data = await response.json();
        console.log(data);

        // Se non ci sono dati visualizzo il titolo creato dalla funzione noElementTitle()
        if (data.length === 0) {
          noElementTitle();
        } else {

          // Altrimenti se ci sono dati visualizzo le card create dinamicamente
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

// Funzione che crea le card in modo dinamico
let createTemplate = (data) => {
  // Utilizzo del map per separare l'api originale inserendo i valori in un nuovo array chiamato cardElements
  const cardElements = data.map(({ _id, name, description, imageUrl, price, brand }) => {
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
          cardBodyParagraph.classList.add('text-truncate'); 

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

        // Un listener sul button di delete che richiama la funzione deleteData per cancellare il prodotto
        cardBodyDeleteButton.addEventListener('click', () => {
            deleteData(_id, name);
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

        return divCol;
    });

    // Aggiungo tutti gli elementi di cardElements a homepage
    homepage.append(...cardElements);
    console.log(cardElements);
};

// Funzione per eliminare un dato
async function deleteData(itemId, name) {
    try {
      const response = await fetch(`${apiUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authorizationToken}`
        },
      });

      // Ricevo a video un messaggio della riuscita dell'eliminazione del prodotto
      successAlert("Product: " + name + ", has been successfully deleted");
      
      // Faccio partire un delay 
      setTimeout(() => {
        // Puoi richiamare la funzione fetchData per aggiornare la visualizzazione dopo l'eliminazione
        fetchData();
      
        // Riaggiorno la pagina
        location.reload();
      }, 2500);
      

    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // alert("Errore durante l'eliminazione del dato. Riprova più tardi.");
      failureAlert("Error while deleting the product. Try again later.");
    }
}

// Chiamata api GET al reload della pagina
window.onload = fetchData();