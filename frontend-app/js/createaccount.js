const api = 'https://bankaapp-api.herokuapp.com/api';
const type = document.querySelector('#type');
const submit = document.querySelector('#submit');
const loader = document.querySelector('#loader');
const msg = document.querySelector('.msg');
const token = sessionStorage.getItem('token');

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
      if (response.status === 403) {
        loader.style.display = 'none';
        msg.innerHTML = 'you must be logged in to create an account';
      }
      return response.json();
    })
    .then((data1) => {
      if (data1.status === 201) {
        loader.style.display = 'none';
        msg.innerHTML = 'Account created successfully, go to your <a href="./dashboard.html">Dashboard</a>';
      }
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  loader.style.display = 'flex';
  const account = {
    type: type.value,
  };
  postApi(`${api}/v1/accounts`, account);
});
