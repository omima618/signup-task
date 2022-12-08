const userMail = document.querySelector('.user-mail');

// GET USER MAIL FROM LOCAL STORAGE
const mail =
    localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user')).email;

// SHOW USER MAIL IN UI
userMail.innerHTML = mail ? mail : '';
