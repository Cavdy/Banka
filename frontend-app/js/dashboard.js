const api = 'https://bankaapp-api.herokuapp.com/api/v1';
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
const loader = document.querySelector('#loader');
const totalBalance = document.querySelector('.total-balance-amount');
const accountsElement = document.querySelector('.accounts');
const dashboard = document.querySelector('.dashboard-wrapper');
const welcomeUser = document.querySelector('.welcome-user');
const errMsg = document.querySelector('.errMsg');

lastLogin.innerHTML = login;

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
        loader.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
        errMsg.parentElement.style.display = 'flex';
      }
      errMsg.parentElement.style.display = 'none';
      return response.json();
    })
    .then((data1) => {
      loader.style.display = 'none';
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
        loader.style.display = 'none';
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
        loader.style.display = 'none';
        errMsg.innerHTML = 'you don\'t have an account, create <a href="./createaccount.html">one</a>';
        errMsg.parentElement.style.display = 'flex';
      } else {
        loader.style.display = 'none';
        errMsg.parentElement.style.display = 'none';
        // set the dahsboard hidden
        accountsElement.style.display = 'flex';
        dashboard.style.display = 'flex';
        welcomeUser.style.display = 'flex';

        data1.data.map((i) => {
          const option = document.createElement('option');
          const attr = document.createAttribute('value');
          attr.value = i.accountnumber;
          option.setAttributeNode(attr);
          option.innerHTML = i.accountnumber;
          accountSelect.appendChild(option);
        });

        getAccountApi(`${api}/accounts/${accountSelect.value}`);
      }
    });
};

loader.style.display = 'flex';
getAccountsApi(`${api}/users/${email}/accounts`);

// set the dahsboard hidden
accountsElement.style.display = 'none';
dashboard.style.display = 'none';
welcomeUser.style.display = 'none';

submit.addEventListener('click', (e) => {
  e.preventDefault();
  loader.style.display = 'flex';
  const selected = accountSelect.value;
  getAccountApi(`${api}/accounts/${selected}`);
});

const welcome = document.querySelector('.welcome-user');

setTimeout(() => {
  welcome.style.display = 'none';
}, 5000);
