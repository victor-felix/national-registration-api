class NationalRegistrationAlreadyExistsError extends Error {
  constructor() {
    super('National registration already exists error.');
    this.name = 'NationalRegistrationAlreadyExistsError';
  }
}

export default NationalRegistrationAlreadyExistsError;
