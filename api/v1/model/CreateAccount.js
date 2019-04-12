export default class Account {
  constructor() {
    this.id = null;
    this.accountNumber = null;
    this.createdOn = null;
    this.owner = null; // user id
    this.type = null; // savings, current
    this.status = null; // draft, active, or dormant
    this.balance = null;
  }
}
