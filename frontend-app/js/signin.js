const api = 'https://bankaapp-api.herokuapp.com/api';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
let emailPassed, passwordPassed;

email.addEventListener('keyup', () => {
  if (!emailRegex.test(email.value)) {
    errorEmail.innerHTML = 'invaild email address';
    emailPassed = false;
  } else {
    errorEmail.innerHTML = '';
    emailPassed = true;
  }
});

password.addEventListener('keyup', () => {
  if (!passwordRegex.test(password.value)) {
    errorPassword.innerHTML = 'Password must at least have 1 alphabet, lowercase, uppercase, number and cannot be less than 8';
    passwordPassed = false;
  } else {
    errorPassword.innerHTML = '';
    passwordPassed = true;
  }
});

// POST FETCH API REQUEST
const postApi = (url, data) => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((data1) => {
      if (data1.status === 422) {
        errorPassword.innerHTML = data1.data;
      } else if (data1.status === 404) {
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 201) {
        localStorage.setItem('token', data1.data.token);
        location.replace('/frontend-app/createaccount.html');
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (emailPassed === true && passwordPassed === true) {
    const signinData = {
      email: email.value,
      password: password.value,
    };
    postApi(`${api}/auth/signin`, signinData);
  }
});
