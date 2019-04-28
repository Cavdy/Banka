const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const limitSelect = document.querySelector('#limit');
const submit = document.querySelector('#go');
const errMsg = document.querySelector('.errMsg');
const successMsg = document.querySelector('.successMsg');
const userTable = document.querySelector('.user-table');
const queryForm = document.querySelector('.queryForm');

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
    .then(response => response.json());
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
        errMsg.parentElement.style.display = 'flex';
        userTable.style.display = 'none';
        queryForm.style.display = 'none';
        errMsg.innerHTML = 'you must be logged in to view users';
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
          aDeleteUser.id = 'delete';
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

        // DELETE
        const dels = document.querySelectorAll('.delete-btn');
        dels.forEach((del) => {
          del.addEventListener('click', (e) => {
            const id = e.target.parentElement.parentElement.children[0].innerHTML;
            deleteApi(`${api}/v1/users/${id}`);
            e.target.parentElement.parentElement.remove();
            successMsg.parentElement.style.display = 'flex';
            successMsg.innerHTML = 'User successfully deleted';
            setInterval(() => {
              location.reload(true);
            }, 3000);
          });
        });
      }
      return data1;
    });
};
getUsersApi(`${api}/v1/users/staffs`);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  getUsersApi(`${api}/v1/users/staffs?limit=${limitSelect.value}`);
});
