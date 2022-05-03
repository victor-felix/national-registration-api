import NationalRegistrationResponse from "./national-registration-response";

export default interface NationalRegistrationPaginationResponse {
  data: NationalRegistrationResponse[];
  total: number;
  page_total: number;
  next?: number;
  previous?: number;
}
