class CreateNationalRegistrationError extends Error {
  constructor(error: Error) {
    super('Create national registration error.');
    this.name = 'CreateNationalRegistrationError';
    this.stack = error.stack;
  }
}

export default CreateNationalRegistrationError;
