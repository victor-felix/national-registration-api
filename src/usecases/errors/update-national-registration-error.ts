class UpdateNationalRegistrationError extends Error {
  constructor(error: Error) {
    super('Update national registration error.');
    this.name = 'UpdateNationalRegistrationError';
    this.stack = error.stack;
  }
}

export default UpdateNationalRegistrationError;
