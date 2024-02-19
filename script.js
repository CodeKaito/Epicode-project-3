// l'endpoint dell'api URL
const apiUrl = "https://striveschool-api.herokuapp.com/api/product";

// L'autorization key per accedere all'api
const authorizationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MDgzNjcyOTAsImV4cCI6MTcwOTU3Njg5MH0.hxAVd25Y1IiaQFxzOn8nHtkhpHiuOuzNwBSZT_pyrt4";

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

    } catch (error) {
        console.log(error);
    }
};

let createTemplate = () => {

};

// Chiamata api al riavvio della pagina
window.onload = () => {
    fetchData();
};
