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
let fnamePassed, lnamePassed, emailPassed, passwordPassed;
const date = new Date();
const login = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

firstName.addEventListener('keyup', () => {
  if (!fnameAndLnameRegex.test(firstName.value)) {
    errorFname.innerHTML = 'first name should at least be 2 characters';
    fnamePassed = false;
  } else {
    errorFname.innerHTML = '';
    fnamePassed = true;
  }
});

lastName.addEventListener('keyup', () => {
  if (!fnameAndLnameRegex.test(lastName.value)) {
    errorLname.innerHTML = 'last name should at least be 2 characters';
    lnamePassed = false;
  } else {
    errorLname.innerHTML = '';
    lnamePassed = true;
  }
});

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

const modal = document.querySelector('.modal');

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
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 201) {
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
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
    const signupData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    postApi(`${api}/auth/signup`, signupData);
  }
});
