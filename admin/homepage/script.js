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
        // cardBodyDeleteButton.addEventListener('click', () => {
        //     deleteData(_id, name);
        // });

        cardBodyDeleteButton.addEventListener('click', () => {
          // Richiamo la funzione della creazione del modale
          modalCreation(_id, name);
          
          // Customizzo la descrizione della funzione per comparire il nome del prodotto
          let modalBody = document.querySelector('#staticBackdrop .modal-body');
          modalBody.innerHTML = `<p>Are you sure you want to delete the product <strong>${name}<strong>?</p>`;

          let modalTitle = document.querySelector('#staticBackdropLabel');
          modalTitle.innerText = 'Delete Confirmation';

          let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
          modal.show();
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

// Modal creation
// <!-- Button trigger modal -->
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//   Launch static backdrop modal
// </button>

// <!-- Modal -->
// <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Understood</button>
//       </div>
//     </div>
//   </div>
// </div>

let modalCreation = (itemId, itemName) => {

  let divModal = document.createElement('div');
  divModal.classList.add('modal', 'fade');
  divModal.id = 'staticBackdrop';
  divModal.setAttribute('data-bs-backdrop', 'static');
  divModal.setAttribute('data-bs-keyboard', 'false');
  divModal.setAttribute('tabindex', '-1');
  divModal.setAttribute('aria-labelledby', 'staticBackdropLabel');
  divModal.setAttribute('aria-hidden', 'true');

  let divDialog = document.createElement('div');
  divDialog.classList.add('modal-dialog');
  divModal.appendChild(divDialog);

  let divContent = document.createElement('div');
  divContent.classList.add('modal-content');
  divDialog.appendChild(divContent);

  let divHeader = document.createElement('div');
  divHeader.classList.add('modal-header');
  divContent.appendChild(divHeader);

  let modalTitle = document.createElement('h1');
  modalTitle.classList.add('modal-title', 'fs-5');
  modalTitle.id = 'staticBackdropLabel';
  modalTitle.innerText = 'Modal title';
  divHeader.appendChild(modalTitle);

  let closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');
  divHeader.appendChild(closeButton);

  let divBody = document.createElement('div');
  divBody.classList.add('modal-body');

  divContent.appendChild(divBody);
  
  let divFooter = document.createElement('div');
  divFooter.classList.add('modal-footer');
  divContent.appendChild(divFooter);

  // Creo il button della chiusura del modale
  let closeButtonFooter = document.createElement('button');
  closeButtonFooter.type = 'button';
  closeButtonFooter.classList.add('btn', 'btn-secondary');
  closeButtonFooter.setAttribute('data-bs-dismiss', 'modal');
  closeButtonFooter.innerText = 'Close';
  divFooter.appendChild(closeButtonFooter);

  // Creo il button della conferma
  let understoodButton = document.createElement('button');
  understoodButton.type = 'button';
  understoodButton.classList.add('btn', 'btn-primary');
  understoodButton.innerText = 'Yes';
  understoodButton.setAttribute('data-bs-dismiss', 'modal');

  understoodButton.addEventListener('click', () => {
    deleteData(itemId, itemName);

    let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.hide();
  });

  divFooter.appendChild(understoodButton);

  // Inserisco il modale nel html
  document.body.appendChild(divModal);
};

// Chiamata api GET al reload della pagina
window.onload = fetchData();