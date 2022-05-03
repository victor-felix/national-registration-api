import CreateNationalRegistrationError from "@usecases/errors/create-national-registration-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationAlreadyExistsError from "@usecases/errors/national-registration-already-exists-error";
import { Either } from "@usecases/helpers/either";
import NationalRegistrationResponse from "./national-registration-response";

export type CreateNationalRegistrationResponse = Either<
  InvalidDataError | CreateNationalRegistrationError | NationalRegistrationAlreadyExistsError,
  NationalRegistrationResponse
>
