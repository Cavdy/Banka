const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const go = document.querySelector('#go');
const limitSelect = document.querySelector('#limit');
const successMsg = document.querySelector('.successMsg');
const errMsg = document.querySelector('.errMsg');
const userTable = document.querySelector('.user-table');
const queryForm = document.querySelector('.queryForm');
const search = document.querySelector('#search');

// DELETE FETCH REQUEST FOR ACCOUNTS
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
    .then(response => response.json());
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
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be an admin or staff to view accounts';
      } else {
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        data1.data.map((i) => {
          const table = document.querySelector('.table');
          const tableRow = document.createElement('div');
          tableRow.classList = 'table-row table-body';
          const accountNumber = document.createElement('div');
          accountNumber.className = 'account-index';
          accountNumber.innerHTML = i.accountnumber;
          const accountName = document.createElement('div');
          accountName.className = 'account-name';
          accountName.innerHTML = `${i.firstname} ${i.lastname}`;
          const status = document.createElement('div');
          status.className = 'account-status';
          status.innerHTML = i.status;
          const type = document.createElement('div');
          type.className = 'activate';
          type.innerHTML = i.type;
          const deleteAccount = document.createElement('div');
          deleteAccount.className = 'deactivate';
          const aDeleteAccount = document.createElement('a');
          aDeleteAccount.href = '#';
          aDeleteAccount.className = 'deactivate-btn';
          aDeleteAccount.innerHTML = 'Delete';
          deleteAccount.appendChild(aDeleteAccount);
          tableRow.appendChild(accountNumber);
          tableRow.appendChild(accountName);
          tableRow.appendChild(status);
          tableRow.appendChild(type);
          tableRow.appendChild(deleteAccount);
          table.appendChild(tableRow);
        });

        // DELETE
        const dels = document.querySelectorAll('.deactivate-btn');
        dels.forEach((del) => {
          del.addEventListener('click', (e) => {
            const acnumber = e.target.parentElement.parentElement.children[0].innerHTML;
            deleteApi(`${api}/v1/accounts/${acnumber}`);
            e.target.parentElement.parentElement.remove();
            successMsg.parentElement.style.display = 'flex';
            successMsg.innerHTML = 'Account successfully deleted';
            setInterval(() => {
              location.reload(true);
            }, 3000);
          });
        });
      }
      return data1;
    });
};
getAccountsApi(`${api}/v1/accounts?limit=${limitSelect.value}`);

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
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be an admin or staff to view accounts';
      } else if (data1.status === 404) {
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'no account found';
      } else {
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        const i = data1.data;
        const table = document.querySelector('.table');
        const tableRow = document.createElement('div');
        tableRow.classList = 'table-row table-body';
        const accountNumber = document.createElement('div');
        accountNumber.className = 'account-index';
        accountNumber.innerHTML = i.accountnumber;
        const accountName = document.createElement('div');
        accountName.className = 'account-name';
        accountName.innerHTML = `${i.firstname} ${i.lastname}`;
        const status = document.createElement('div');
        status.className = 'account-status';
        status.innerHTML = i.status;
        const type = document.createElement('div');
        type.className = 'activate';
        type.innerHTML = i.type;
        const deleteAccount = document.createElement('div');
        deleteAccount.className = 'deactivate';
        const aDeleteAccount = document.createElement('a');
        aDeleteAccount.href = '#';
        aDeleteAccount.className = 'deactivate-btn';
        aDeleteAccount.innerHTML = 'Delete';
        deleteAccount.appendChild(aDeleteAccount);
        tableRow.appendChild(accountNumber);
        tableRow.appendChild(accountName);
        tableRow.appendChild(status);
        tableRow.appendChild(type);
        tableRow.appendChild(deleteAccount);
        table.appendChild(tableRow);

        // DELETE
        const dels = document.querySelectorAll('.deactivate-btn');
        dels.forEach((del) => {
          del.addEventListener('click', (e) => {
            const acnumber = e.target.parentElement.parentElement.children[0].innerHTML;
            deleteApi(`${api}/v1/accounts/${acnumber}`);
            e.target.parentElement.parentElement.remove();
            successMsg.parentElement.style.display = 'flex';
            successMsg.innerHTML = 'Account successfully deleted';
            setInterval(() => {
              location.reload(true);
            }, 3000);
          });
        });

        return data1;
      }
    });
};

go.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getAccountsApi(`${api}/v1/accounts?limit=${limitSelect.value}`);
});

search.addEventListener('keyup', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getSpecficAccountApi(`${api}/v1/accounts/${search.value}`);
});
