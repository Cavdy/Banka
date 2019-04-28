const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const limitSelect = document.querySelector('#limit');
const submit = document.querySelector('#go');
const errMsg = document.querySelector('.errMsg');

// DELETE FETCH REQUEST FOR USERS
const deleteApi = (url) => {
  fetch(url, {
    method: 'DELETE',
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
      if (response.status === 204) {
        errMessage.forEach((err) => {
          err.innerHTML = '';
        });
        onSuccess.forEach((success) => {
          success.innerHTML = 'Deleted successfully';
          setInterval(() => {
            document.location.reload(true);
          }, 3000);
        });
      }
    });
};

// GET FETCH API REQUEST TO GET ALL ACCOUNTS OF A USER
const getUsersApi = (url) => {
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

        // DELETE
        const dels = document.querySelectorAll('.deactivate-btn');
        dels.forEach((del) => {
          del.addEventListener('click', (e) => {
            const id = e.target.parentElement.parentElement.children[0].innerHTML;
            deleteApi(`${api}/v1/users/${id}`);
            e.target.parentElement.parentElement.remove();
          });
        });
      }
      return data1;
    });
};
getUsersApi(`${api}/v1/users/clients`);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getTransactionsApi(`${api}/v1/accounts/${accountSelect.value}/transactions`);
});
