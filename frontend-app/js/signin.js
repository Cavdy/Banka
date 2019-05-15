const api = 'https://bankaapp-api.herokuapp.com/api/v1';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const togglePassword = document.querySelector('.toggle-password-button');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
const see = document.querySelector('#see');
const unsee = document.querySelector('#unsee');
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

// secretToken from URL
const urlParams = new URLSearchParams(window.location.search);
const secretToken = urlParams.get('secret');

// PATCH TO VERIFY ACCOUNT
const patchApi = (url) => {
  fetch(url, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  })
    .then(response => response.json())
    .then((data1) => {
      const notifyMsg = document.querySelector('.notify-msg');
      if (data1.status === 422) {
        notifyMsg.parentElement.classList.add('notify-error', 'notify-show');
        notifyMsg.innerHTML = 'Invalid secret token. Please check your email';
        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      } else if (data1.status === 200) {
        notifyMsg.parentElement.classList.add('notify-success', 'notify-show');
        notifyMsg.innerHTML = 'Account successfully verified. You can login';
        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      }
    });
};

if (secretToken !== null
  && secretToken !== '') {
  patchApi(`${api}/auth/verify/${secretToken}`);
}

// GET FETCH API REQUEST TO GET A PARTICULAR ACCOUNT INFO
const getUserApi = (url) => {
  const token = sessionStorage.getItem('token');
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  })
    .then(response => response.json())
    .then((data1) => {
      const i = data1.data;
      if (i.type === 'staff' || i.isadmin === true) {
        location.replace('./viewaccounts.html');
      } else if (i.type === 'client' && i.isadmin === false) {
        location.replace('./dashboard.html');
      }
    });
};

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
      const notifyMsg = document.querySelector('.notify-msg');
      if (data1.status === 422) {
        loader.style.display = 'none';
        errorPassword.innerHTML = data1.data;
      } else if (data1.status === 404) {
        loader.style.display = 'none';
        errorEmail.innerHTML = data1.data;
      } else if (data1.status === 401) {
        loader.style.display = 'none';
        notifyMsg.parentElement.classList.add('notify-error', 'notify-show');
        notifyMsg.innerHTML = 'Account not verified. Please check your email';

        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      } else if (data1.status === 201) {
        sessionStorage.setItem('token', data1.data.token);
        sessionStorage.setItem('email', data1.data.email);
        sessionStorage.setItem('id', data1.data.id);
        sessionStorage.setItem('login', login);
        sessionStorage.setItem('avatar', data1.data.avatar);
        getUserApi(`${api}/users/${data1.data.id}`);
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
