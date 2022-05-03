class GetNationalRegistrationByQueryError extends Error {
  constructor(error: Error) {
    super('Get national registration by query error.');
    this.name = 'GetNationalRegistrationByQueryError';
    this.stack = error.stack;
  }
}

export default GetNationalRegistrationByQueryError;
