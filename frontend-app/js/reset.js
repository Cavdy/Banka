const api = 'https://bankaapp-api.herokuapp.com/api/v1';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const email = document.querySelector('#email');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
let emailPassed;

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
      } else if (data1.status === 201) {
        loader.style.display = 'none';
        email.value = '';
        notifyMsg.parentElement.classList.add('notify-success', 'notify-show');
        notifyMsg.innerHTML = 'Reset code has been sent to your email';

        setTimeout(() => {
          notifyMsg.parentElement.classList.remove('notify-show');
        }, 5000);
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (emailPassed === true) {
    loader.style.display = 'flex';
    const resetData = {
      email: email.value,
    };
    postApi(`${api}/auth/reset`, resetData);
  }
});
