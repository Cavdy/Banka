/* eslint-disable no-param-reassign */
import accountsData from '../../dummyJson/accounts';

const { accounts } = accountsData;

const CreateAccountService = {
  createAccount(accountData, userData) {
    const accountsLength = accounts.length;
    const newId = accountsLength + 1;
    const accountNumberGenerator = Math.floor(Math.random() * 1000000000) + 3000000000;
    const date = new Date();
    const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const owner = userData.loggedUser.id;
    const { firstName, lastName, email } = userData.loggedUser;
    const balance = 0.00;
    const status = 'active';

    // assign data
    accountData.id = newId;
    accountData.firstName = firstName;
    accountData.lastName = lastName;
    accountData.email = email;
    accountData.accountNumber = accountNumberGenerator;
    accountData.createdOn = createdOn;
    accountData.owner = owner;
    accountData.status = status;
    accountData.balance = balance;
    accounts.push(accountData);
    return accountData;
  },
  patchAccount(accountNumber, accountUpdate, staff) {
    let account;

    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= accounts.length - 1; i++) {
        // eslint-disable-next-line eqeqeq
        if (accounts[i].accountNumber == accountNumber) {
          accounts[i].status = accountUpdate.status;
          account = accounts[i];
        }
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },
  deleteAccount(accountNumber, staff) {
    let account;

    if (staff.loggedUser.type === 'staff' || staff.loggedUser.isAdmin === true) {
      const Account = accounts.find(mAccount => mAccount.accountNumber == accountNumber);

      if (typeof Account !== 'undefined') {
        accounts.splice(Account.id - 1, 1);
        account = 'account deleted';
      } else {
        account = 'no account found or account has been deleted';
      }
    } else {
      account = 'Sorry you don\'t have permission to perform this task';
    }
    return account;
  },
};

export default CreateAccountService;
