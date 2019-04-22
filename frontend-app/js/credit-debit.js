const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const go = document.querySelector('#go');
const limitSelect = document.querySelector('#limit');
const onSuccess = document.querySelectorAll('.successMsg');
const errMsg = document.querySelectorAll('.errMsg');
const errorMsg = document.querySelector('.errMsg');
const debitForm = document.querySelector('#debit');
const debitBtn = document.querySelector('#debitbtn');
const creditForm = document.querySelector('#credit');
const creditBtn = document.querySelector('#creditbtn');

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
      if (data1.status === 201) {
        errMsg.forEach((err) => {
          err.parentElement.style.display = 'none';
          err.innerHTML = '';
        });
        onSuccess.forEach((success) => {
          success.parentElement.style.display = 'flex';
          success.innerHTML = 'Transaction was successful';
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
        errorMsg.parentElement.style.display = 'flex';
        errorMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
      } else {
        errorMsg.parentElement.style.display = 'none';
        errorMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        errorMsg.parentElement.style.display = 'flex';
        errorMsg.innerHTML = 'you must be an admin or staff to view accounts';
      } else {
        errorMsg.parentElement.style.display = 'none';
        // creating the table row element with the data gotten from the api
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
          const balance = document.createElement('div');
          balance.className = 'amount';
          balance.innerHTML = i.balance;
          const debit = document.createElement('div');
          debit.className = 'edit';
          const aDebit = document.createElement('a');
          aDebit.href = '#';
          aDebit.className = 'delete-btn';
          aDebit.id = 'show-modal';
          aDebit.innerHTML = 'Debit';
          debit.appendChild(aDebit);
          const credit = document.createElement('div');
          credit.className = 'edit';
          const aCredit = document.createElement('a');
          aCredit.href = '#';
          aCredit.className = 'edit-btn';
          aCredit.id = 'show-modal2';
          aCredit.innerHTML = 'Credit';
          credit.appendChild(aCredit);
          tableRow.appendChild(accountNumber);
          tableRow.appendChild(accountName);
          tableRow.appendChild(balance);
          tableRow.appendChild(debit);
          tableRow.appendChild(credit);
          table.appendChild(tableRow);
        });
      }
      return data1;
    })
    .then(() => {
      // MODAL ELEMENT
      const showModal = document.querySelectorAll('#show-modal');
      const showModal2 = document.querySelectorAll('#show-modal2');
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
                // the data of the clicked element and assigning it to a varaiable for use
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

                // DEBIT BUTTON CLICK EVENT
                debitBtn.addEventListener('click', () => {
                  e.preventDefault();

                  const checkForDigit = /^-?\d+\.?\d*$/;
                  if (checkForDigit.test(debitForm.value)) {
                    debitCreditApi(`${api}/v1/transactions/${ACNumber}/debit`, { amount: debitForm.value });
                  } else {
                    errMsg.forEach((err) => {
                      err.parentElement.style.display = 'flex';
                      err.innerHTML = 'Invalid Amount. Please numbers only';
                    });
                  }
                });

                // CREDIT BUTTON CLICK EVENT
                creditBtn.addEventListener('click', () => {
                  e.preventDefault();
                  const checkForDigit = /^-?\d+\.?\d*$/;
                  if (checkForDigit.test(creditForm.value)) {
                    debitCreditApi(`${api}/v1/transactions/${ACNumber}/credit`, { amount: creditForm.value });
                  } else {
                    errMsg.forEach((err) => {
                      err.parentElement.style.display = 'flex';
                      err.innerHTML = 'Invalid Amount. Please numbers only';
                    });
                  }
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
      modalFunction(showModal2, '.modal2', '#modal2');
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
        errorMsg.parentElement.style.display = 'flex';
        errorMsg.innerHTML = 'you must be logged in to view accounts, Login <a href="./login.html">here</a>';
      } else {
        errorMsg.parentElement.style.display = 'none';
        errorMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      // CREATING TABLE ROW ELEMENT WITH THE DATA GOTTEN FROM THE API
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
      const balance = document.createElement('div');
      balance.className = 'amount';
      balance.innerHTML = i.balance;
      const debit = document.createElement('div');
      debit.className = 'edit';
      const aDebit = document.createElement('a');
      aDebit.href = '#';
      aDebit.className = 'delete-btn';
      aDebit.id = 'show-modal';
      aDebit.innerHTML = 'Debit';
      debit.appendChild(aDebit);
      const credit = document.createElement('div');
      credit.className = 'edit';
      const aCredit = document.createElement('a');
      aCredit.href = '#';
      aCredit.className = 'edit-btn';
      aCredit.id = 'show-modal2';
      aCredit.innerHTML = 'Credit';
      credit.appendChild(aCredit);
      tableRow.appendChild(accountNumber);
      tableRow.appendChild(accountName);
      tableRow.appendChild(balance);
      tableRow.appendChild(debit);
      tableRow.appendChild(credit);
      table.appendChild(tableRow);
      return data1;
    })
    .then(() => {
      // MODAL
      const showModal = document.querySelectorAll('#show-modal');
      const showModal2 = document.querySelectorAll('#show-modal2');
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
                // GETTING THE DATA OF THE ELEMENTS CLICKED AND ASSIGNING IT TO A VARIABLE
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

                // DEBIT BUTTON CLICK EVENT
                debitBtn.addEventListener('click', () => {
                  e.preventDefault();

                  const checkForDigit = /^-?\d+\.?\d*$/;
                  if (checkForDigit.test(debitForm.value)) {
                    debitCreditApi(`${api}/v1/transactions/${ACNumber}/debit`, { amount: debitForm.value });
                  } else {
                    errMsg.forEach((err) => {
                      err.parentElement.style.display = 'flex';
                      err.innerHTML = 'Invalid Amount. Please numbers only';
                    });
                  }
                });

                // CREDIT BUTTON CLICK EVENT
                creditBtn.addEventListener('click', () => {
                  e.preventDefault();
                  const checkForDigit = /^-?\d+\.?\d*$/;
                  if (checkForDigit.test(creditForm.value)) {
                    debitCreditApi(`${api}/v1/transactions/${ACNumber}/credit`, { amount: creditForm.value });
                  } else {
                    errMsg.forEach((err) => {
                      err.parentElement.style.display = 'flex';
                      err.innerHTML = 'Invalid Amount. Please numbers only';
                    });
                  }
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
      modalFunction(showModal2, '.modal2', '#modal2');
    });
};

// LIMIT CLICK EVENT
go.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getAccountsApi(`${api}/v1/accounts?limit=${limitSelect.value}`);
});

const acBtn = document.querySelector('#ac-go');

// GET SPECIFIC ACCOUNT CLICK EVENT
acBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const acInput = document.querySelector('.accounts-input');
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getSpecficAccountApi(`${api}/v1/accounts/${acInput.value}`);
});
