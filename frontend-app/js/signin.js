const api = 'https://bankaapp-api.herokuapp.com/api/v1';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
let emailPassed, passwordPassed;
const date = new Date();
const login = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const emailChecker = () => {
  if (!emailRegex.test(email.value)
    || email.value.length === 0
    || email.value === '') {
    errorEmail.innerHTML = 'invaild email address';
    emailPassed = false;
  } else {
    errorEmail.innerHTML = '';
    emailPassed = true;
  }
};
email.addEventListener('keyup', emailChecker);
submit.addEventListener('click', emailChecker);

const passwordChecker = () => {
  if (!passwordRegex.test(password.value)
    || password.value.length === 0
    || password.value === '') {
    errorPassword
      .innerHTML = 'Password must have 1 lowercase, uppercase, number and special character';
    passwordPassed = false;
  } else {
    errorPassword.innerHTML = '';
    passwordPassed = true;
  }
};
password.addEventListener('keyup', passwordChecker);
submit.addEventListener('click', passwordChecker);

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
        loader.style.display = 'none';
        errorPassword.innerHTML = data1.data;
      } else if (data1.status === 404) {
        loader.style.display = 'none';
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 201) {
        sessionStorage.setItem('token', data1.data.token);
        sessionStorage.setItem('email', data1.data.email);
        sessionStorage.setItem('id', data1.data.id);
        sessionStorage.setItem('login', login);
        location.replace('./dashboard.html');
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (emailPassed === true && passwordPassed === true) {
    loader.style.display = 'flex';
    const signinData = {
      email: email.value,
      password: password.value,
    };
    postApi(`${api}/auth/signin`, signinData);
  }
});
