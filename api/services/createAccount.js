import accountsData from '../dummyJson/accounts';

const { accounts } = accountsData;

console.log(accounts);

const CreateAccountService = {
  createAccount(accountData) {
    const accountsLength = accounts.length;
    const newId = accountsLength + 1;
    accountData.id = newId;
    accounts.push(accountData);
    return accountData;
  },
};

export default CreateAccountService;
