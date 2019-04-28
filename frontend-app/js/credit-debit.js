const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api/v1';
const onSuccess = document.querySelector('.successMsg');
const errorMsg = document.querySelector('.errMsg');
const debitBtn = document.querySelector('#debit');
const creditBtn = document.querySelector('#credit');
const accountNumber = document.querySelector('#accountnumber');
const amount = document.querySelector('#amount');
const showAccount = document.querySelector('.show-account');
const showNothing = document.querySelector('.show-nothing');
const accountName = document.querySelector('#username');
const acNumber = document.querySelector('#account-number');
const accountBalance = document.querySelector('#account-balance');
const accountType = document.querySelector('#type');
const accountStatus = document.querySelector('#account-status');
const accountCreated = document.querySelector('#account-created');
const transactionElement = document.querySelector('.transaction');

// set the dahsboard hidden
// transactionElement.style.display = 'none';

// POST FETCH REQUEST FOR DEBIT/CREDIT TRANSACTION
const debitCreditApi = (url, data) => {
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
    .then(response => response.json())
    .then((data1) => {
      if (data1.status === 422) {
        errorMsg.parentElement.style.display = 'flex';
        errorMsg.innerHTML = data1.data;
      } else if (data1.status === 201) {
        errorMsg.parentElement.style.display = 'none';
        onSuccess.parentElement.style.display = 'flex';
        onSuccess.innerHTML = 'Transaction was successful';
        setInterval(() => {
          document.location.reload(true);
        }, 3000);
      }
    });
};

// GET FETCH API REQUEST TO GET A SPECIFIC ACCOUNT OF A USER
const getSpecficAccountApi = (url) => {
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
        errorMsg.parentElement.style.display = 'flex';
        errorMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
      } else {
        errorMsg.parentElement.style.display = 'none';
        errorMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      const i = data1.data;
      if (data1.status === 404) {
        showNothing.style.display = 'block';
        showAccount.style.display = 'none';
      } else {
        showNothing.style.display = 'none';
        showAccount.style.display = 'block';

        accountName.innerHTML = `${i.firstname} ${i.lastname}`;
        acNumber.innerHTML = i.accountnumber;
        accountBalance.innerHTML = `#${i.balance}`;
        accountType.innerHTML = i.type;
        accountStatus.innerHTML = i.status;
        accountCreated.innerHTML = i.createdon;

        creditBtn.addEventListener('click', (e) => {
          e.preventDefault();

          debitCreditApi(`${api}/transactions/${i.accountnumber}/credit`, { amount: amount.value });
        });

        debitBtn.addEventListener('click', (e) => {
          e.preventDefault();

          debitCreditApi(`${api}/transactions/${i.accountnumber}/debit`, { amount: amount.value });
        });
      }
    });
};

accountNumber.addEventListener('keyup', () => {
  getSpecficAccountApi(`${api}/accounts/${accountNumber.value}`);
});
