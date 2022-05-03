export default interface ResultValidator<TValue> {
  isValid: boolean;
  value?: TValue;
  fields?: any;
}
