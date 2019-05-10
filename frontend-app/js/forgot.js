const api = 'https://bankaapp-api.herokuapp.com/api/v1';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const password = document.querySelector('#password');
const cPassword = document.querySelector('#confirmPassword');
const errorPassword = document.querySelector('.errorpassword');
const errorPassword2 = document.querySelector('.errorpassword2');
const togglePassword = document.querySelector('.toggle-password-button');
const togglePassword2 = document.querySelector('.toggle-password-button2');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
const see = document.querySelector('#see');
const unsee = document.querySelector('#unsee');
const see2 = document.querySelector('#see2');
const unsee2 = document.querySelector('#unsee2');
let passwordPassed, passwordPassed2;

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

const password2Checker = () => {
  if (password.value !== cPassword.value) {
    errorPassword2
      .innerHTML = 'Password do not match';
    passwordPassed2 = false;
  } else {
    errorPassword2.innerHTML = '';
    passwordPassed2 = true;
  }
};
cPassword.addEventListener('keyup', password2Checker);
submit.addEventListener('click', password2Checker);

// resetToken from URL
const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get('reset');

// PATCH TO VERIFY ACCOUNT
const patchApi = (url, data) => {
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
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((data1) => {
      const notifyMsg = document.querySelector('.notify-msg');
      if (data1.status === 422) {
        loader.style.display = 'none';
        notifyMsg.parentElement.classList.add('notify-error', 'notify-show');
        notifyMsg.innerHTML = 'Invalid reset token. Please check your email';
        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      } else if (data1.status === 200) {
        loader.style.display = 'none';
        notifyMsg.parentElement.classList.add('notify-success', 'notify-show');
        notifyMsg.innerHTML = 'Password reset successfully. You can login';

        password.value = '';
        cPassword.value = '';
        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (passwordPassed === true && passwordPassed2 === true) {
    loader.style.display = 'flex';
    const forgotData = {
      password: password.value,
    };
    if (resetToken !== null
      && resetToken !== '') {
      patchApi(`${api}/auth/forgot/${resetToken}`, forgotData);
    }
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

togglePassword2.addEventListener('click', (e) => {
  e.preventDefault();
  if (cPassword.type === 'password') {
    cPassword.type = 'text';
    see2.style.display = 'block';
    unsee2.style.display = 'none';
  } else {
    cPassword.type = 'password';
    see2.style.display = 'none';
    unsee2.style.display = 'block';
  }
});
