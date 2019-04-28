const api = 'https://bankaapp-api.herokuapp.com/api/v1';
const token = sessionStorage.getItem('token');
const id = sessionStorage.getItem('id');
const profileSection = document.querySelector('.profile-section');
const firstname = document.querySelector('.firstname');
const lastname = document.querySelector('.lastname');
const email = document.querySelector('.email');
const type = document.querySelector('.type');
const admin = document.querySelector('.admin');

// GET FETCH API REQUEST TO GET A PARTICULAR ACCOUNT INFO
const getAccountApi = (url) => {
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
        profileSection.style.display = 'none';
      }
      profileSection.style.display = 'flex';
      return response.json();
    })
    .then((data1) => {
      const i = data1.data;
      firstname.innerHTML = i.firstname;
      lastname.innerHTML = i.lastname;
      email.innerHTML = i.email;
      type.innerHTML = i.type;
      admin.innerHTML = i.isadmin;
    });
};

getAccountApi(`${api}/users/${id}`);
