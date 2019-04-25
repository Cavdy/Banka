const api = 'https://bankaapp-api.herokuapp.com/api';
const token = sessionStorage.getItem('token');
const email = sessionStorage.getItem('email');
const login = localStorage.getItem('login');
const accountSelect = document.querySelector('.accounts-select');
const submit = document.querySelector('#submit');
const accountName = document.querySelector('#username');
const accountNumber = document.querySelector('#account-number');
const accountBalance = document.querySelector('#account-balance');
const accountType = document.querySelector('#type');
const accountStatus = document.querySelector('#account-status');
const accountCreated = document.querySelector('#account-created');
const firstName = document.querySelector('#firstname');
const lastLogin = document.querySelector('#lastLogin');
const totalBalance = document.querySelector('.total-balance-amount');
const errMsg = document.querySelector('.errMsg');

lastLogin.innerHTML = login;

// GET FETCH API REQUEST TO GET ALL ACCOUNTS OF A USER
const getAccountsApi = (url) => {
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
    .then((response) => {
      if (response.status === 403) {
        errMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
        errMsg.parentElement.style.display = 'flex';
      } else {
        errMsg.innerHTML = '';
        errMsg.parentElement.style.display = 'none';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 404) {
        errMsg.innerHTML = 'you don\'t have an account, create <a href="./createaccount.html">one</a>';
        errMsg.parentElement.style.display = 'flex';
      } else {
        errMsg.parentElement.style.display = 'none';
        data1.data.map((i) => {
          const option = document.createElement('option');
          const attr = document.createAttribute('value');
          attr.value = i.accountnumber;
          option.setAttributeNode(attr);
          option.innerHTML = i.accountnumber;
          accountSelect.appendChild(option);
        });
      }
    });
};
getAccountsApi(`${api}/v1/users/${email}/accounts`);

// GET FETCH API REQUEST TO GET A PARTICULAR ACCOUNT INFO
const getAccountApi = (url) => {
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
    .then((response) => {
      if (response.status === 403) {
        errMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
        errMsg.parentElement.style.display = 'flex';
      }
      errMsg.parentElement.style.display = 'none';
      return response.json();
    })
    .then((data1) => {
      firstName.innerHTML = data1.data.firstname;
      totalBalance.innerHTML = `#${data1.data.balance}`;
      accountName.innerHTML = `${data1.data.firstname} ${data1.data.lastname}`;
      accountNumber.innerHTML = data1.data.accountnumber;
      accountBalance.innerHTML = `#${data1.data.balance}`;
      accountType.innerHTML = data1.data.type;
      accountStatus.innerHTML = data1.data.status;
      accountCreated.innerHTML = data1.data.createdon;
    });
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const selected = accountSelect.value;
  getAccountApi(`${api}/v1/accounts/${selected}`);
});

const welcome = document.querySelector('.welcome-user');

setTimeout(() => {
  welcome.style.display = 'none';
}, 5000);
