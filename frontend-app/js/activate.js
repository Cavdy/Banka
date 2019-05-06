const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const go = document.querySelector('#go');
const limitSelect = document.querySelector('#limit');
const loader = document.querySelector('#loader');
const successMsg = document.querySelector('.successMsg');
const errMsg = document.querySelector('.errMsg');
const userTable = document.querySelector('.user-table');
const queryForm = document.querySelector('.queryForm');

// POST FETCH REQUEST FOR ACCOUNTS
const formSelect = document.querySelector('.form-select');
const submit = document.querySelector('#submit');

const patchApi = (url, data) => {
  fetch(url, {
    method: 'PATCH',
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
      const cModal = document.querySelector('.modal');
      if (data1.status === 200) {
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
        errMsg.parentElement.style.display = 'none';
        errMsg.innerHTML = '';
        successMsg.parentElement.style.display = 'flex';
        successMsg.innerHTML = 'Account updated Successfuly';
        setInterval(() => {
          document.location.reload(true);
        }, 3000);
      }
    });
};

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
    .then(response => response.json())
    .then((data) => {
      const cModal = document.querySelector('.modal');
      if (data.status === 200) {
        loader.style.display = 'none';
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
        successMsg.parentElement.style.display = 'flex';
        successMsg.innerHTML = 'Account successfully deleted';
        setInterval(() => {
          location.reload(true);
        }, 3000);
      }
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
        errMsg.parentElement.style.display = 'flex';
        errMsg.innerHTML = 'you must be logged in to view accounts';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
      } else {
        errMsg.parentElement.style.display = 'none';
        loader.style.display = 'none';
        errMsg.innerHTML = '';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        loader.style.display = 'none';
        errMsg.parentElement.style.display = 'flex';
        errMsg.innerHTML = 'you must be an admin or staff to view accounts';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
      } else {
        errMsg.parentElement.style.display = 'none';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        data1.data.map((i) => {
          loader.style.display = 'none';
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
          const activate = document.createElement('div');
          activate.className = 'activate';
          const aActivate = document.createElement('a');
          aActivate.href = '#';
          aActivate.className = 'activate-btn';
          aActivate.id = 'show-modal';
          aActivate.innerHTML = 'Active/Dormant';
          activate.appendChild(aActivate);
          const deleteAccount = document.createElement('div');
          deleteAccount.className = 'deactivate';
          const aDeleteAccount = document.createElement('a');
          aDeleteAccount.href = '#';
          aDeleteAccount.className = 'deactivate-btn';
          aDeleteAccount.id = 'show-modal2';
          aDeleteAccount.innerHTML = 'Delete';
          deleteAccount.appendChild(aDeleteAccount);
          tableRow.appendChild(accountNumber);
          tableRow.appendChild(accountName);
          tableRow.appendChild(status);
          tableRow.appendChild(activate);
          tableRow.appendChild(deleteAccount);
          table.appendChild(tableRow);
        });
      }

      // modal
      const showModal = document.querySelectorAll('#show-modal');
      const showModal2 = document.querySelectorAll('#show-modal2');
      const accountName = document.querySelectorAll('#username');
      const accountNumber = document.querySelectorAll('#acnumber');
      const accountBalance = document.querySelectorAll('#balance');

      const modalFunction = (modalClick, modalIn, modalId) => {
        if (modalClick) {
          const mModal = document.querySelector(modalIn);
          const onPatch = document.querySelector('.onPatch');
          const onDelete = document.querySelector('.onDelete');

          modalClick.forEach((modal) => {
            modal.addEventListener('click', (e) => {
              const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
              const ACName = e.target.parentElement.parentElement.children[1].innerHTML;
              const ACBalance = e.target.parentElement.parentElement.children[2].innerHTML;
              // CHECK IF PATCH BUTTON IS CLICKED
              if (e.target.id === 'show-modal') {
                onDelete.style.display = 'none'; // HIDE DELETE
                onPatch.style.display = 'block'; // SHOW PATCH
                mModal.style.visibility = 'visible';
                mModal.style.opacity = '1';
                if (e.target.parentElement.parentElement) {
                  accountName.forEach((name) => {
                    name.innerHTML = ACName;
                  });
                  accountNumber.forEach((number) => {
                    number.innerHTML = ACNumber;
                  });
                  accountBalance.forEach((balance) => {
                    balance.innerHTML = ACBalance;
                  });

                  submit.addEventListener('click', () => {
                    e.preventDefault();
                    patchApi(`${api}/v1/accounts/${ACNumber}`, { status: formSelect.value });
                  });
                }
              } else if (e.target.id === 'show-modal2') {
                onPatch.style.display = 'none'; // HIDE PATCH
                onDelete.style.display = 'block'; // SHOW DELETE
                mModal.style.visibility = 'visible';
                mModal.style.opacity = '1';
                if (e.target.parentElement.parentElement) {
                  accountName.forEach((name) => {
                    name.innerHTML = ACName;
                  });
                  accountNumber.forEach((number) => {
                    number.innerHTML = ACNumber;
                  });

                  const del = document.querySelector('#delete');
                  const cancel = document.querySelector('#cancel');

                  del.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteApi(`${api}/v1/accounts/${ACNumber}`);
                    e.target.parentElement.parentElement.remove();
                    loader.style.display = 'flex';
                  });

                  cancel.addEventListener('click', (event) => {
                    event.preventDefault();
                    const cModal = document.querySelector(modalIn);
                    cModal.style.visibility = 'hidden';
                    cModal.style.opacity = '0';
                  });
                }
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
      modalFunction(showModal2, '.modal', '#modal');

      return data1;
    });
};

loader.style.display = 'flex';
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
        loader.style.display = 'none';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        loader.style.display = 'none';
        errMsg.innerHTML = '';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 404) {
        loader.style.display = 'none';
        errMsg.parentElement.style.display = 'flex';
        errMsg.innerHTML = 'no account found';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
      } else {
        errMsg.parentElement.style.display = 'none';
        loader.style.display = 'none';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
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
        const activate = document.createElement('div');
        activate.className = 'activate';
        const aActivate = document.createElement('a');
        aActivate.href = '#';
        aActivate.className = 'activate-btn';
        aActivate.id = 'show-modal';
        aActivate.innerHTML = 'Active/Dormant';
        activate.appendChild(aActivate);
        const deleteAccount = document.createElement('div');
        deleteAccount.className = 'deactivate';
        const aDeleteAccount = document.createElement('a');
        aDeleteAccount.href = '#';
        aDeleteAccount.className = 'deactivate-btn';
        aDeleteAccount.id = 'show-modal2';
        aDeleteAccount.innerHTML = 'Delete';
        deleteAccount.appendChild(aDeleteAccount);
        tableRow.appendChild(accountNumber);
        tableRow.appendChild(accountName);
        tableRow.appendChild(status);
        tableRow.appendChild(activate);
        tableRow.appendChild(deleteAccount);
        table.appendChild(tableRow);
      }
      return data1;
    })
    .then(() => {
      // modal
      const showModal = document.querySelectorAll('#show-modal');
      const showModal2 = document.querySelectorAll('#show-modal2');
      const accountName = document.querySelectorAll('#username');
      const accountNumber = document.querySelectorAll('#acnumber');
      const accountBalance = document.querySelectorAll('#balance');

      const modalFunction = (modalClick, modalIn, modalId) => {
        if (modalClick) {
          const mModal = document.querySelector(modalIn);
          const onPatch = document.querySelector('.onPatch');
          const onDelete = document.querySelector('.onDelete');

          modalClick.forEach((modal) => {
            modal.addEventListener('click', (e) => {
              const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
              const ACName = e.target.parentElement.parentElement.children[1].innerHTML;
              const ACBalance = e.target.parentElement.parentElement.children[2].innerHTML;
              // CHECK IF PATCH BUTTON IS CLICKED
              if (e.target.id === 'show-modal') {
                onDelete.style.display = 'none'; // HIDE DELETE
                onPatch.style.display = 'block'; // SHOW PATCH
                mModal.style.visibility = 'visible';
                mModal.style.opacity = '1';
                if (e.target.parentElement.parentElement) {
                  accountName.forEach((name) => {
                    name.innerHTML = ACName;
                  });
                  accountNumber.forEach((number) => {
                    number.innerHTML = ACNumber;
                  });
                  accountBalance.forEach((balance) => {
                    balance.innerHTML = ACBalance;
                  });

                  submit.addEventListener('click', () => {
                    e.preventDefault();
                    patchApi(`${api}/v1/accounts/${ACNumber}`, { status: formSelect.value });
                  });
                }
              } else if (e.target.id === 'show-modal2') {
                onPatch.style.display = 'none'; // HIDE PATCH
                onDelete.style.display = 'block'; // SHOW DELETE
                mModal.style.visibility = 'visible';
                mModal.style.opacity = '1';
                if (e.target.parentElement.parentElement) {
                  accountName.forEach((name) => {
                    name.innerHTML = ACName;
                  });
                  accountNumber.forEach((number) => {
                    number.innerHTML = ACNumber;
                  });

                  const del = document.querySelector('#delete');
                  const cancel = document.querySelector('#cancel');

                  del.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteApi(`${api}/v1/accounts/${ACNumber}`);
                    e.target.parentElement.parentElement.remove();
                    loader.style.display = 'flex';
                  });

                  cancel.addEventListener('click', (event) => {
                    event.preventDefault();
                    const cModal = document.querySelector(modalIn);
                    cModal.style.visibility = 'hidden';
                    cModal.style.opacity = '0';
                  });
                }
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
      modalFunction(showModal2, '.modal', '#modal');
    });
};

go.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  loader.style.display = 'flex';
  getAccountsApi(`${api}/v1/accounts?limit=${limitSelect.value}`);
});

const search = document.querySelector('#search');

search.addEventListener('keyup', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  loader.style.display = 'flex';
  getSpecficAccountApi(`${api}/v1/accounts/${search.value}`);
});
