class NationalRegistrationNotFoundError extends Error {
  constructor() {
    super('National registration not found error.');
    this.name = 'NationalRegistrationNotFoundError';
  }
}

export default NationalRegistrationNotFoundError;
