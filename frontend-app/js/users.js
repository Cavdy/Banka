const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const limitSelect = document.querySelector('#limit');
const loader = document.querySelector('#loader');
const submit = document.querySelector('#go');
const errMsg = document.querySelector('.errMsg');
const successMsg = document.querySelector('.successMsg');
const userTable = document.querySelector('.user-table');
const queryForm = document.querySelector('.queryForm');

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
        loader.style.display = 'none';
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view users';
      } else {
        loader.style.display = 'none';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        errMsg.innerHTML = '';
        return response.json();
      }
    })
    .then((data1) => {
      if (data1.status === 401) {
        loader.style.display = 'none';
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be an admin or staff to view accounts';
      } else {
        loader.style.display = 'none';
        userTable.style.display = 'block';
        queryForm.style.display = 'flex';
        errMsg.parentElement.style.display = 'none';
        data1.data.map((i) => {
          const table = document.querySelector('.table');
          const tableRow = document.createElement('div');
          tableRow.classList = 'table-row table-body';
          const userId = document.createElement('div');
          userId.className = 'none';
          userId.innerHTML = i.id;
          const fullname = document.createElement('div');
          fullname.className = 'account-index';
          fullname.innerHTML = `${i.firstname} ${i.lastname}`;
          const email = document.createElement('div');
          email.className = 'account-name';
          email.innerHTML = i.email;
          const type = document.createElement('div');
          type.className = 'account-status';
          type.innerHTML = i.type;
          const isAdmin = document.createElement('div');
          isAdmin.className = 'activate';
          isAdmin.innerHTML = i.isadmin;
          const deleteUser = document.createElement('div');
          deleteUser.className = 'deactivate';
          const aDeleteUser = document.createElement('a');
          aDeleteUser.href = '#';
          aDeleteUser.className = 'delete-btn';
          aDeleteUser.id = 'show-modal';
          aDeleteUser.innerHTML = 'Delete';
          deleteUser.appendChild(aDeleteUser);
          const newBalnace = document.createElement('div');
          newBalnace.className = 'account-status';
          newBalnace.innerHTML = i.newbalance;
          tableRow.appendChild(userId);
          tableRow.appendChild(fullname);
          tableRow.appendChild(email);
          tableRow.appendChild(type);
          tableRow.appendChild(isAdmin);
          tableRow.appendChild(deleteUser);
          table.appendChild(tableRow);
        });

        // show modal
        const showModal = document.querySelectorAll('#show-modal');
        const acName = document.querySelectorAll('#username');

        const modalFunction = (modalClick, modalIn, modalId) => {
          if (modalClick) {
            const mModal = document.querySelector(modalIn);

            modalClick.forEach((modal) => {
              modal.addEventListener('click', (e) => {
                mModal.style.visibility = 'visible';
                mModal.style.opacity = '1';
                if (e.target.parentElement.parentElement) {
                  const userID = e.target.parentElement.parentElement.children[0].innerHTML;
                  const ACName = e.target.parentElement.parentElement.children[1].innerHTML;
                  acName.forEach((name) => {
                    name.innerHTML = ACName;
                  });

                  const del = document.querySelector('#delete');
                  const cancel = document.querySelector('#cancel');

                  del.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteApi(`${api}/v1/users/${userID}`);
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
      }
      return data1;
    });
};

loader.style.display = 'flex';
getUsersApi(`${api}/v1/users/clients?limit=${limitSelect.value}`);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  loader.style.display = 'flex';
  getUsersApi(`${api}/v1/users/clients?limit=${limitSelect.value}`);
});
