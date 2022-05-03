import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import UpdateNationalRegistrationError from "@usecases/errors/update-national-registration-error";
import { Either } from "@usecases/helpers/either";
import NationalRegistrationResponse from "./national-registration-response";

export type UpdateNationalRegistrationResponse = Either<
  | InvalidDataError
  | UpdateNationalRegistrationError
  | NationalRegistrationNotFoundError,
  NationalRegistrationResponse
>;
