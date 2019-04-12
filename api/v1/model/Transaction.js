export default class Transaction {
  constructor() {
    this.id = null;
    this.createdOn = null;
    this.type = null; // credit or debit
    this.accountNumber = null;
    this.cashier = null; // cashier id
    this.amount = null;
    this.oldBalance = null;
    this.newBalance = null;
  }
}
