const api = 'https://bankaapp-api.herokuapp.com/api';
const token = sessionStorage.getItem('token');

const fnameAndLnameRegex = /^[a-zA-Z ]{2,15}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const type = document.querySelector('.form-select');
const password = document.querySelector('#password');
const errorFname = document.querySelector('.errorfname');
const errorLname = document.querySelector('.errorlname');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
let fnamePassed, lnamePassed, emailPassed, passwordPassed;

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

// POST FETCH API REQUEST
const postApi = (url, data) => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  })
    .then((response) => {
      const error = document.querySelector('.errMsg');
      if (response.status === 403) {
        error.parentElement.style.display = 'flex';
        error.innerHTML = 'You are not logged in. Login <a href="./login.html">here</a>';
      } else if (response.status === 401) {
        error.parentElement.style.display = 'flex';
        error.innerHTML = 'You are not an admin to perform this task';
      } else if (response.status === 409) {
        errorEmail.innerHTML = 'email already exist';
      } else if (response.status === 201) {
        const success = document.querySelector('.successMsg');
        success.parentElement.style.display = 'flex';
        success.innerHTML = 'User created successfully';
        setInterval(() => {
          document.location.reload(true);
        }, 3000);
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (fnamePassed === true && lnamePassed === true && emailPassed === true && passwordPassed === true) {
    if (type.value === 'staff') {
      const signupData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        type: type.value,
        password: password.value,
        isAdmin: false,
      };
      postApi(`${api}/auth/signup/addstaff`, signupData);
    } else {
      const signupData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        type: 'staff',
        password: password.value,
        isAdmin: true,
      };
      postApi(`${api}/auth/signup/addstaff`, signupData);
    }
  }
});
