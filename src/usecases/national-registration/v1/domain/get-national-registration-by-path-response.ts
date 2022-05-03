import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import { Either } from "@usecases/helpers/either";
import NationalRegistrationResponse from "./national-registration-response";

export type GetNationalRegistrationByPathResponse = Either<
  InvalidDataError | NationalRegistrationNotFoundError,
  NationalRegistrationResponse
>
