import ResultValidator from './result-validator';

export default interface RequestValidator<TRequest> {
  validate: (request: TRequest) => ResultValidator<TRequest>;
}