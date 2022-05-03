class DeleteNationalRegistrationError extends Error {
  constructor(error: Error) {
    super('Delete national registration error.');
    this.name = 'DeleteNationalRegistrationError';
    this.stack = error.stack;
  }
}

export default DeleteNationalRegistrationError;
