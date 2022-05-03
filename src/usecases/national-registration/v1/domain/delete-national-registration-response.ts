import DeleteNationalRegistrationError from "@usecases/errors/delete-national-registration-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import { Either } from "@usecases/helpers/either";

export type DeleteNationalRegistrationResponse = Either<
  InvalidDataError | DeleteNationalRegistrationError | NationalRegistrationNotFoundError,
  void
>
