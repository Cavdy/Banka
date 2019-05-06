const token = sessionStorage.getItem('token');
const api = 'https://bankaapp-api.herokuapp.com/api';
const limitSelect = document.querySelector('#limit');
const loader = document.querySelector('#loader');
const submit = document.querySelector('#go');
const errMsg = document.querySelector('.errMsg');
const successMsg = document.querySelector('.successMsg');
const userTable = document.querySelector('.user-table');
const queryForm = document.querySelector('.queryForm');
const fnameAndLnameRegex = /^[a-zA-Z ]{2,15}$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const type = document.querySelector('.form-select');
const password = document.querySelector('#password');
const errorFname = document.querySelector('.errorfname');
const errorLname = document.querySelector('.errorlname');
const errorEmail = document.querySelector('.erroremail');
const errorPassword = document.querySelector('.errorpassword');
const addStaff = document.querySelector('#add-staff');
const submitStaff = document.querySelector('#submit-staff');
const togglePassword = document.querySelector('.toggle-password-button');
const see = document.querySelector('#see');
const unsee = document.querySelector('#unsee');
let fnamePassed, lnamePassed, emailPassed, passwordPassed;

const fnameChecker = () => {
  if (!fnameAndLnameRegex.test(firstName.value)
    || firstName.value.length === 0
    || firstName.value === '') {
    errorFname.innerHTML = 'first name should at least be 2 characters';
    fnamePassed = false;
  } else {
    errorFname.innerHTML = '';
    fnamePassed = true;
  }
};

firstName.addEventListener('keyup', fnameChecker);
submitStaff.addEventListener('click', fnameChecker);

const lnameChecker = () => {
  if (!fnameAndLnameRegex.test(lastName.value)
    || lastName.value.length === 0
    || lastName.value === '') {
    errorLname.innerHTML = 'last name should at least be 2 characters';
    lnamePassed = false;
  } else {
    errorLname.innerHTML = '';
    lnamePassed = true;
  }
};

lastName.addEventListener('keyup', lnameChecker);
submitStaff.addEventListener('click', lnameChecker);

const emailChecker = () => {
  if (!emailRegex.test(email.value)
    || email.value.length === 0
    || email.value === '') {
    errorEmail.innerHTML = 'invaild email address';
    emailPassed = false;
  } else {
    errorEmail.innerHTML = '';
    emailPassed = true;
  }
};
email.addEventListener('keyup', emailChecker);
submitStaff.addEventListener('click', emailChecker);

const passwordChecker = () => {
  if (!passwordRegex.test(password.value)
    || password.value.length === 0
    || password.value === '') {
    errorPassword
      .innerHTML = 'Password must have 1 lowercase, uppercase, number and special character';
    passwordPassed = false;
  } else {
    errorPassword.innerHTML = '';
    passwordPassed = true;
  }
};
password.addEventListener('keyup', passwordChecker);
submitStaff.addEventListener('click', passwordChecker);

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
          const emailEl = document.createElement('div');
          emailEl.className = 'account-name';
          emailEl.innerHTML = i.email;
          const typeEl = document.createElement('div');
          typeEl.className = 'account-status';
          typeEl.innerHTML = i.type;
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
          tableRow.appendChild(emailEl);
          tableRow.appendChild(typeEl);
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

// POST FETCH API REQUEST
const postApi = (url, data) => {
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
    .then((response) => {
      const error = document.querySelector('.errMsg');
      const cModal = document.querySelector('.modal2');
      if (response.status === 403) {
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
        loader.style.display = 'none';
        error.parentElement.style.display = 'flex';
        error.innerHTML = 'You are not logged in. Login <a href="./login.html">here</a>';
      } else if (response.status === 401) {
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
        loader.style.display = 'none';
        error.parentElement.style.display = 'flex';
        error.innerHTML = 'You are not an admin to perform this task';
      } else if (response.status === 409) {
        loader.style.display = 'none';
        errorEmail.innerHTML = 'email already exist';
      } else if (response.status === 201) {
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
        loader.style.display = 'none';
        const success = document.querySelector('.successMsg');
        success.parentElement.style.display = 'flex';
        success.innerHTML = 'User created successfully';
        setInterval(() => {
          document.location.reload(true);
        }, 3000);
      }
    });
};

loader.style.display = 'flex';
getUsersApi(`${api}/v1/users/staffs`);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const tableBodies = document.querySelectorAll('.table-body');
  tableBodies.forEach((tableBody) => {
    tableBody.remove();
  });

  loader.style.display = 'flex';
  getUsersApi(`${api}/v1/users/staffs?limit=${limitSelect.value}`);
});

// ADD STAFF
addStaff.addEventListener('click', (e) => {
  e.preventDefault();

  // SHOW FORM MODAL
  const modalFunction = (modalIn, modalId) => {
    const mModal = document.querySelector(modalIn);
    mModal.style.visibility = 'visible';
    mModal.style.opacity = '1';

    window.addEventListener('click', () => {
      const modal = document.querySelector(modalId);
      const cModal = document.querySelector(modalIn);
      if (e.target === modal) {
        cModal.style.visibility = 'hidden';
        cModal.style.opacity = '0';
      }
    });

    submitStaff.addEventListener('click', (event) => {
      event.preventDefault();
      if (fnamePassed === true && lnamePassed === true && emailPassed === true && passwordPassed === true) {
        loader.style.display = 'flex';
        if (type.value === 'staff') {
          const signupData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            type: type.value,
            password: password.value,
            isAdmin: false,
          };
          postApi(`${api}/v1/users/addstaff`, signupData);
        } else {
          const signupData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            type: 'staff',
            password: password.value,
            isAdmin: true,
          };
          postApi(`${api}/v1/users/addstaff`, signupData);
        }
      }
    });
  };

  modalFunction('.modal2', '#modal2');
});

togglePassword.addEventListener('click', (e) => {
  e.preventDefault();

  if (password.type === 'password') {
    password.type = 'text';
    see.style.display = 'block';
    unsee.style.display = 'none';
  } else {
    password.type = 'password';
    see.style.display = 'none';
    unsee.style.display = 'block';
  }
});
