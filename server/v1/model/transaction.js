export default class Transaction {
  constructor() {
    this.transactionId = null;
    this.accountNumber = null;
    this.amount = null;
    this.cashier = null; // cashier id
    this.transactionType = null; // credit or debit
    this.accountBalance = null;
  }
}
