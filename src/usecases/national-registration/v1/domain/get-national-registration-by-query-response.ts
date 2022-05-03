import GetNationalRegistrationByQueryError from "@usecases/errors/get-national-registration-by-query-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import { Either } from "@usecases/helpers/either";
import NationalRegistrationPaginationResponse from "./national-registration-pagination-response";

export type GetNationalRegistrationByQueryResponse = Either<
  InvalidDataError | GetNationalRegistrationByQueryError,
  NationalRegistrationPaginationResponse
>
