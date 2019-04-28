// Sidebar Toggle 
const sidebar = document.querySelector('.sidebar');

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 900px)').matches) {
    sidebar.classList.remove('sidebar-hide');
  } else {
    sidebar.classList.add('sidebar-hide');
  }
});

if (window.innerWidth <= 600) {
  sidebar.classList.add('sidebar-hide');
}

document.querySelector('#toggle-sidebar').addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-hide');
  if (window.innerWidth <= 600) {
    document.querySelector('.user-nav-icon-box').toggleClass('user-nav-icon-box-active');
  }
});

// Pop box
const userNavUserPop = document.querySelector('.user-nav-user-pop');
const userNavNotificationPop = document.querySelector('.user-nav-notification-pop');

const notificationPop = (element, removeClass, removeElement, toggleClass, toggleElement) => {
  document.querySelector(element).addEventListener('click', () => {
    removeClass.classList.remove(removeElement);
    toggleClass.classList.toggle(toggleElement);
  });
}

notificationPop('.user-nav-icon-box', userNavUserPop, 'user-nav-user-pop-active', userNavNotificationPop, 'user-nav-notification-pop-active');
notificationPop('.user-nav-user', userNavNotificationPop, 'user-nav-notification-pop-active', userNavUserPop, 'user-nav-user-pop-active');

// dismiss alert
const close = document.querySelector('#close');
if (close !== null) {
  close.addEventListener('click', () => {
    document.querySelector('.alert').remove();
  });
}

// modal
const showModal = document.querySelectorAll('#show-modal');
const showModal2 = document.querySelectorAll('#show-modal2');

const modalFunction = (modalClick, modalIn, modalId) => {
  if (modalClick) {
    const mModal = document.querySelector(modalIn);

    modalClick.forEach((modal) => {
      modal.addEventListener('click', () => {
        mModal.style.visibility = 'visible';
        mModal.style.opacity = '1';
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

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.clear();
  location.replace('./index.html');
});

const apiUrl = 'https://bankaapp-api.herokuapp.com/api/v1';
const tokenId = sessionStorage.getItem('token');
const idU = sessionStorage.getItem('id');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const userItems = document.querySelectorAll('.user');
const staffItems = document.querySelectorAll('.staff');
const adminItems = document.querySelectorAll('.admin');
const userFname = document.querySelector('.user-nav-username');

sidebarItems.forEach((sidebarItem) => {
  sidebarItem.style.display = 'none';
});

// GET FETCH API REQUEST TO GET A PARTICULAR ACCOUNT INFO
const getUApi = (url) => {
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${tokenId}`,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  })
    .then(response => response.json())
    .then((data1) => {
      const i = data1.data;
      userFname.innerHTML = i.firstname;
      userFname.style.textTransform = 'capitalize';
      if (i.type === 'staff') {
        staffItems.forEach((staffItem) => {
          staffItem.style.display = 'block';
        });
      } else if (i.isadmin === true) {
        adminItems.forEach((adminItem) => {
          adminItem.style.display = 'block';
        });
      } else {
        userItems.forEach((userItem) => {
          userItem.style.display = 'block';
        });
      }
    });
};

getUApi(`${apiUrl}/users/${idU}`);
