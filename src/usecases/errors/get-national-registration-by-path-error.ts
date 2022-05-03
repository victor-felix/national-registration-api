class GetNationalRegistrationByPathError extends Error {
  constructor(error: Error) {
    super('Get national registration by path error.');
    this.name = 'GetNationalRegistrationByPathError';
    this.stack = error.stack;
  }
}

export default GetNationalRegistrationByPathError;
