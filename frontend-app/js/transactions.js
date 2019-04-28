const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const email = sessionStorage.getItem('email');
const accountSelect = document.querySelector('#account-select');
const submit = document.querySelector('#ac-go');
const errMsg = document.querySelector('.errMsg');

// GET FETCH API REQUEST TO GET A SPECIFIC ACCOUNT TRANSACTION
const getSpecificTransactionApi = (url) => {
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
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      const i = data1.data;
      const acNumber = document.querySelector('#account-number');
      const amount = document.querySelector('#amount');
      const oldBalance = document.querySelector('#oldbalance');
      const newBal = document.querySelector('#newbalance');
      const tranType = document.querySelector('#transactiontype');
      const cashier = document.querySelector('#cashierid');
      const tranDate = document.querySelector('#trandate');
      acNumber.innerHTML = i[0].accountnumber;
      amount.innerHTML = i[0].amount;
      oldBalance.innerHTML = i[0].oldbalance;
      newBal.innerHTML = i[0].newbalance;
      cashier.innerHTML = i[0].cashier;
      tranType.innerHTML = i[0].type;
      tranDate.innerHTML = i[0].createdon;
      return data1;
    });
};

// GET FETCH API REQUEST TO GET ALL TRANSACTION OF AN ACCOUNT
const getTransactionsApi = (url) => {
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
      const tableElement = document.querySelector('.tran-table');
      if (data1.status === 404) {
        errMsg.parentElement.style.display = 'flex';
        tableElement.style.display = 'none';
        errMsg.innerHTML = 'No transaction found for this account';
      } else {
        errMsg.parentElement.style.display = 'none';
        tableElement.style.display = 'block';
        data1.data.map((i) => {
          const table = document.querySelector('.table');
          const tableRow = document.createElement('div');
          tableRow.classList = 'table-row table-body';
          const transactionId = document.createElement('div');
          transactionId.className = 'none';
          transactionId.innerHTML = i.id;
          const createdOn = document.createElement('div');
          createdOn.className = 'account-name';
          createdOn.innerHTML = i.createdon;
          const accountNumber = document.createElement('div');
          accountNumber.className = 'account-index';
          accountNumber.innerHTML = i.accountnumber;
          const type = document.createElement('div');
          type.className = 'account-status';
          type.innerHTML = i.type;
          const record = document.createElement('div');
          record.className = 'record';
          const aRecord = document.createElement('a');
          aRecord.href = '#';
          aRecord.className = 'record-btn';
          aRecord.id = 'show-modal';
          aRecord.innerHTML = 'View Record';
          record.appendChild(aRecord);
          const newBalnace = document.createElement('div');
          newBalnace.className = 'account-status';
          newBalnace.innerHTML = i.newbalance;
          tableRow.appendChild(transactionId);
          tableRow.appendChild(createdOn);
          tableRow.appendChild(accountNumber);
          tableRow.appendChild(type);
          tableRow.appendChild(record);
          tableRow.appendChild(newBalnace);
          table.appendChild(tableRow);
        });
      }
      return data1;
    })
    .then(() => {
      // modal
      const showModal = document.querySelectorAll('#show-modal');
      const modalFunction = (modalClick, modalIn, modalId) => {
        if (modalClick) {
          const mModal = document.querySelector(modalIn);

          modalClick.forEach((modal) => {
            modal.addEventListener('click', (e) => {
              mModal.style.visibility = 'visible';
              mModal.style.opacity = '1';
              if (e.target.parentElement.parentElement) {
                const tranId = e.target.parentElement.parentElement.children[0].innerHTML;
                getSpecificTransactionApi(`${api}/v1/transactions/${tranId}`);
              }
            });
          });
        }

        window.addEventListener('click', (e) => {
          const modal = document.querySelector(modalId);
          const cModal = document.querySelector(modalIn);
          if (e.target === modal) {
            cModal.style.visibility = 'hidden';
            cModal.style.opacity = '0';
          }
        });
      };

      modalFunction(showModal, '.modal', '#modal');
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
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        errMsg.innerHTML = 'you must be an admin or staff to view accounts';
      } else {
        data1.data.map((i) => {
          const option = document.createElement('option');
          const attr = document.createAttribute('value');
          attr.value = i.accountnumber;
          option.setAttributeNode(attr);
          option.innerHTML = i.accountnumber;
          accountSelect.appendChild(option);
        });
        getTransactionsApi(`${api}/v1/accounts/${accountSelect.value}/transactions`);
      }
      return data1;
    });
};
getAccountsApi(`${api}/v1/users/${email}/accounts`);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getTransactionsApi(`${api}/v1/accounts/${accountSelect.value}/transactions`);
});
