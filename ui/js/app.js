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
