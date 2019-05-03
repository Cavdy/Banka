const api = 'https://bankaapp-api.herokuapp.com/api/v1';

const fnameAndLnameRegex = /^[a-zA-Z ]{2,15}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorFname = document.querySelector('.errorfname');
const errorLname = document.querySelector('.errorlname');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
let fnamePassed, lnamePassed, emailPassed, passwordPassed;
const date = new Date();
const login = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const fnameChecker = () => {
  if (!fnameAndLnameRegex.test(firstName.value)
    || firstName.value.length === 0
    || firstName.value === '') {
    errorFname.innerHTML = 'first name should at least be 2 characters';
    fnamePassed = false;
  } else {
    errorFname.innerHTML = '';
    fnamePassed = true;
  }
};

firstName.addEventListener('keyup', fnameChecker);
submit.addEventListener('click', fnameChecker);

const lnameChecker = () => {
  if (!fnameAndLnameRegex.test(lastName.value)
    || lastName.value.length === 0
    || lastName.value === '') {
    errorLname.innerHTML = 'last name should at least be 2 characters';
    lnamePassed = false;
  } else {
    errorLname.innerHTML = '';
    lnamePassed = true;
  }
};

lastName.addEventListener('keyup', lnameChecker);
submit.addEventListener('click', lnameChecker);

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
      if (data1.status === 409) {
        loader.style.display = 'none';
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 201) {
        setInterval(() => {
          sessionStorage.setItem('token', data1.data.token);
          sessionStorage.setItem('email', data1.data.email);
          sessionStorage.setItem('id', data1.data.id);
          sessionStorage.setItem('login', login);
          location.replace('./createaccount.html');
        }, 3000);
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (fnamePassed === true
    && lnamePassed === true
    && emailPassed === true
    && passwordPassed === true) {
    loader.style.display = 'flex';
    const signupData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    postApi(`${api}/auth/signup`, signupData);
  }
});
