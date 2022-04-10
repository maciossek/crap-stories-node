import httpStatus from "http-status";

export default class ApiError extends Error {
  status;
  stack = "";

  /**
   * @param  {String}  message:  string        [description]
   * @param  {Number}  status:   number        HTTP Status Code use httpStatus
   * @param  {String}  stack:    string        Stacktrace
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, stack = "") {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.stack = stack;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this);
    }
  }
}
