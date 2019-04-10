import accountsData from '../dummyJson/accounts';

const { accounts } = accountsData;

const CreateAccountService = {
  createAccount(accountData) {
    const accountsLength = accounts.length;
    const newId = accountsLength + 1;
    const accountNumberGenerator = Math.floor(Math.random() * 1000000000) + 3000000000;
    const date = new Date();
    const createdOn = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const balance = 0.00;
    const status = 'active';

    accountData.id = newId;
    accountData.accountNumber = accountNumberGenerator;
    accountData.createdOn = createdOn;
    accountData.status = status;
    accountData.balance = balance;
    accounts.push(accountData);
    return accountData;
  },
};

export default CreateAccountService;
