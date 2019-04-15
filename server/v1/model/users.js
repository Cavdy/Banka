export default class User {
  constructor() {
    this.id = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.password = null;
    this.type = null; // client or staff
    this.isAdmin = null; // must be a staff user account
  }
}
