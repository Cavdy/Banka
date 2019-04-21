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
const firstName = document.querySelector('#account-status');
const lastLogin = document.querySelector('#lastLogin');
const totalBalance = document.querySelector('.total-balance-amount');

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
      const errMsg = document.querySelector('.errorMessage');
      if (response.status === 403) {
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      data1.data.map((i) => {
        const option = document.createElement('option');
        const attr = document.createAttribute('value');
        attr.value = i.accountnumber;
        option.setAttributeNode(attr);
        option.innerHTML = i.accountnumber;
        accountSelect.appendChild(option);
      });
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
        console.log('you must be logged in to view accounts');
      }
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
