export class ApiResponse extends Response {
  constructor(success, errorCode=undefined, message, data = {}) {
    super("APi Response");
    this.success = success;
    this.message = message;
    this.data = data;
    this.errorCode = errorCode;
  }
}

// universal error - 0
// username - 1
// gmail - 2
// phone - 3
// password -4