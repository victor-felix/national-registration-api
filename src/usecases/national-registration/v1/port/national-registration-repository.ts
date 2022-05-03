import NationalRegistration from "@entities/national-registration";
import NationalRegistrationResponse from "../domain/national-registration-pagination-response";

export default interface NationalRegistrationRepository {
  findById: (id: string) => Promise<NationalRegistration>;
  findByNumber: (number: string) => Promise<NationalRegistration>;
  query: (entity: NationalRegistration) => Promise<NationalRegistrationResponse>;
  save: (entity: NationalRegistration) => Promise<NationalRegistration>;
  delete: (id: string) => Promise<void>;
}
