// ELEMENTS
const form = document.querySelector('.signup-form');
const usernameFeedback = document.querySelector('.username-validation');
const emailFeedback = document.querySelector('.email-validation');
const passwordFeedback = document.querySelector('.password-validation');
const passwordConfirmationFeedback = document.querySelector(
    '.conf-pass-validation'
);

// REGEX PATTERN
const usernamePattern = /^[A-Z]{1}[A-Z0-9]{3,13}[A-Z]{1}$/i;
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// FORM VALIDATION
let invalid = false;
const validationHandler = (userData, error = null) => {
    // RESET ERROR MESSAGE
    usernameFeedback.innerHTML = '';
    emailFeedback.innerHTML = '';
    passwordFeedback.innerHTML = '';
    passwordConfirmationFeedback.innerHTML = '';
    // HANDLE FRONTEND VALIDATION
    if (!userData.username.match(usernamePattern)) {
        usernameFeedback.innerHTML =
            'username should start with character from a-z, end with character, and may contain numbers in between.';
        invalid = true;
    }
    if (!userData.email.match(emailPattern)) {
        emailFeedback.innerHTML = 'Enter a valid email!';
        invalid = true;
    }
    if (userData.password.length < 8) {
        passwordFeedback.innerHTML = 'Password must be at least 8 charcters!';
        invalid = true;
    }
    if (userData.password_confirmation !== userData.password) {
        passwordConfirmationFeedback.innerHTML = 'Password does not match!';
        invalid = true;
    }
    // ALL INPUTS ARE VALID
    if (
        userData.username.match(usernamePattern) &&
        userData.email.match(emailPattern) &&
        userData.password.length >= 8 &&
        userData.password_confirmation === userData.password
    )
        invalid = false;
    // SHOW API ERROR
    if (error) {
        usernameFeedback.innerHTML = error.username ? error.username : '';
        emailFeedback.innerHTML = error.email ? error.email : '';
        passwordFeedback.innerHTML = error.password ? error.password : '';
        passwordConfirmationFeedback.innerHTML = error.password_confirmation
            ? error.password_confirmation
            : '';
    }
};

// REQUEST HANDLER
const sendUserData = async (url, userData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            // SHOW API ERROR
            validationHandler(userData, data.errors);
            throw new Error(data.message);
        }
        localStorage.setItem('user', JSON.stringify(data));
        window.open(`succeed.html`, '_self');
    } catch (error) {
        console.log(error);
    }
};

// ON SUBMIT SIGNUP FORM
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // PREPARE USER DATA
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password_confirmation = form.password_confirmation.value;
    const userData = {
        username,
        email,
        password,
        password_confirmation,
    };
    // FRONTEND VALIDATION
    validationHandler(userData);
    if (invalid) return;
    // SEND REQUEST
    sendUserData('https://goldblv.com/api/hiring/tasks/register', userData);
    return;
});
