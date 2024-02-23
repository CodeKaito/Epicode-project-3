const createAlert = (message, colorClass, timeout=null) => {
    const alert = document.createElement('div');
    const alertButton = document.createElement('button');
    alertButton.innerText = 'OK';
    alert.classList.add('alert', colorClass);
    alert.innerHTML = `<span style="padding:10px">${message}</span>`;
    alert.appendChild(alertButton);
    alertButton.addEventListener('click', () => {
        alert.remove();
    });
    if(timeout != null) {
        setTimeout(() => {
            alert.remove();
        }, Number(timeout));
    }

    document.body.appendChild(alert);
}

const successAlert = (message, timeout=null) => {
    createAlert(message, 'alert-success', timeout);
}

const failureAlert = (message, timeout=null) => {
    createAlert(message, 'alert-failed', timeout);
}

export default successAlert;
export { failureAlert };