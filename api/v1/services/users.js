import dummyUsers from '../../dummyJson/users';

const { users } = dummyUsers;

const UsersServices = {
  getAllUsers(staff) {
    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      return users.map((user) => {
        return user;
      });
    }
    return 'You don\'t have permission to view this page';
  },

  deleteUser(id, staff) {
    let deleteMsg;
    if (staff.loggedUser.type === 'staff') {
      const User = users.find(user => user.id == id && user.type != 'staff');
      if (typeof User === 'undefined') {
        deleteMsg = 'Sorry you can not delete a staff';
      } else {
        users.splice(User.id - 1, 1);
        deleteMsg = 'deleted';
      }
    } else if (staff.loggedUser.isAdmin === true) {
      const User = users.find(user => user.id == id);
      users.splice(User.id - 1, 1);
    } else {
      deleteMsg = 'You don\'t have permission to do this task';
    }
    return deleteMsg;
  },
};

export default UsersServices;
