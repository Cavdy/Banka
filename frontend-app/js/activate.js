const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const go = document.querySelector('#go');
const limitSelect = document.querySelector('#limit');
const onSuccess = document.querySelectorAll('.successMessage');
const errMessage = document.querySelectorAll('.errMessage');
const errMsg = document.querySelector('.errorMessage');

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
      if (data1.status === 200) {
        errMessage.forEach((err) => {
          err.innerHTML = '';
        });
        onSuccess.forEach((success) => {
          success.innerHTML = 'Updated successfully';
          setInterval(() => {
            document.location.reload(true);
          }, 3000);
        });
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
      return data1;
    })
    .then(() => {
      // modal
      const showModal = document.querySelectorAll('#show-modal');
      const accountName = document.querySelectorAll('#username');
      const accountNumber = document.querySelectorAll('#acnumber');
      const accountBalance = document.querySelectorAll('#balance');

      const modalFunction = (modalClick, modalIn, modalId) => {
        if (modalClick) {
          const mModal = document.querySelector(modalIn);

          modalClick.forEach((modal) => {
            modal.addEventListener('click', (e) => {
              mModal.style.visibility = 'visible';
              mModal.style.opacity = '1';
              if (e.target.parentElement.parentElement) {
                const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
                const ACName = e.target.parentElement.parentElement.children[1].innerHTML;
                const ACBalance = e.target.parentElement.parentElement.children[2].innerHTML;
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

      // DELETE
      const dels = document.querySelectorAll('.deactivate-btn');
      dels.forEach((del) => {
        del.addEventListener('click', (e) => {
          const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
          deleteApi(`${api}/v1/accounts/${ACNumber}`);
          e.target.parentElement.parentElement.remove();
        });
      });
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
        errMsg.innerHTML = 'you must be logged in to view accounts';
      } else {
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
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
      aDeleteAccount.innerHTML = 'Delete';
      deleteAccount.appendChild(aDeleteAccount);
      tableRow.appendChild(accountNumber);
      tableRow.appendChild(accountName);
      tableRow.appendChild(status);
      tableRow.appendChild(activate);
      tableRow.appendChild(deleteAccount);
      table.appendChild(tableRow);
      return data1;
    })
    .then(() => {
      // modal
      const showModal = document.querySelectorAll('#show-modal');
      const accountName = document.querySelectorAll('#username');
      const accountNumber = document.querySelectorAll('#acnumber');
      const accountBalance = document.querySelectorAll('#balance');

      const modalFunction = (modalClick, modalIn, modalId) => {
        if (modalClick) {
          const mModal = document.querySelector(modalIn);

          modalClick.forEach((modal) => {
            modal.addEventListener('click', (e) => {
              mModal.style.visibility = 'visible';
              mModal.style.opacity = '1';
              if (e.target.parentElement.parentElement) {
                const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
                const ACName = e.target.parentElement.parentElement.children[1].innerHTML;
                const ACBalance = e.target.parentElement.parentElement.children[2].innerHTML;
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

                console.log(e.target);
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

      // DELETE
      const dels = document.querySelectorAll('.deactivate-btn');
      dels.forEach((del) => {
        del.addEventListener('click', (e) => {
          const ACNumber = e.target.parentElement.parentElement.children[0].innerHTML;
          deleteApi(`${api}/v1/accounts/${ACNumber}`);
          e.target.parentElement.parentElement.remove();
        });
      });
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

const acBtn = document.querySelector('#ac-go');

acBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const acInput = document.querySelector('.accounts-input');
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getSpecficAccountApi(`${api}/v1/accounts/${acInput.value}`);
});
