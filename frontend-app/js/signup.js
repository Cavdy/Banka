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
const avatar = document.querySelector('.avatar');
const avatarImage = document.querySelector('#avatar');
const inputForm = document.querySelector('.input-form-form');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
const next = document.querySelector('#next');
const loader = document.querySelector('#loader');
let fnamePassed, lnamePassed, emailPassed, passwordPassed;
const togglePassword = document.querySelector('.toggle-password-button');
const see = document.querySelector('#see');
const unsee = document.querySelector('#unsee');

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
next.addEventListener('click', fnameChecker);

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
next.addEventListener('click', lnameChecker);

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
next.addEventListener('click', emailChecker);

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
next.addEventListener('click', passwordChecker);

// POST FETCH API REQUEST
const postApi = (url, data) => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer',
    body: data,
  })
    .then(response => response.json())
    .then((data1) => {
      if (data1.status === 409) {
        loader.style.display = 'none';
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 201) {
        loader.style.display = 'none';
        const notifyMsg = document.querySelector('.notify-msg');
        notifyMsg.parentElement.classList.add('notify-success', 'notify-show');
        notifyMsg.innerHTML = data1.data;
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';

        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      }
    });
};

avatarImage.addEventListener('change', () => {
  const oFReader = new FileReader();
  oFReader.readAsDataURL(avatarImage.files[0]);
  oFReader.onload = (oFREvent) => {
    document.querySelector('.display-avatar').src = oFREvent.target.result;
  };
});

submit.addEventListener('click', (e) => {
  e.preventDefault();

  if (fnamePassed === true
    && lnamePassed === true
    && emailPassed === true
    && passwordPassed === true) {
    loader.style.display = 'flex';
    const signupData = new FormData();
    signupData.append('firstName', firstName.value);
    signupData.append('lastName', lastName.value);
    signupData.append('email', email.value);
    signupData.append('password', password.value);
    signupData.append('avatar', avatarImage.files[0]);
    postApi(`${api}/auth/signup`, signupData);
  }
});

togglePassword.addEventListener('click', (e) => {
  e.preventDefault();

  if (password.type === 'password') {
    password.type = 'text';
    see.style.display = 'block';
    unsee.style.display = 'none';
  } else {
    password.type = 'password';
    see.style.display = 'none';
    unsee.style.display = 'block';
  }
});

next.addEventListener('click', (e) => {
  e.preventDefault();

  if (fnamePassed === true
    && lnamePassed === true
    && emailPassed === true
    && passwordPassed === true) {
    inputForm.classList.add('animate-form');
    avatar.classList.remove('animate-avatar');
  }
});
