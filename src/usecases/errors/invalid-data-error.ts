class InvalidDataError extends Error {
  public fields: any;

  constructor(fields: any) {
    super('Invalid data.');
    this.name = 'InvalidDataError';
    this.fields = fields;
  }
}

export default InvalidDataError;
