import NationalRegistration from "@entities/national-registration";
import GetNationalRegistrationByQueryRequest
  from "@usecases/national-registration/v1/domain/get-national-registration-by-query-request";
import NationalRegistrationPaginationResponse
  from "@usecases/national-registration/v1/domain/national-registration-pagination-response";
import NationalRegistrationRepository from "@usecases/national-registration/v1/port/national-registration-repository";
import { getRepository, Like } from "typeorm";
import { NationalRegistrationEntity } from "../schemas/public/national-registration-entity";

class TypeORMNationalRegistrationRepository implements NationalRegistrationRepository {

  async findById(id: string): Promise<NationalRegistration> {
    const repository = getRepository<NationalRegistration>(NationalRegistrationEntity);

    return repository.findOne({ where: { id } });
  }

  async findByNumber(number: string): Promise<NationalRegistration> {
    const repository = getRepository<NationalRegistration>(NationalRegistrationEntity);

    return repository.findOne({ where: { number }});
  }

  async query(entity: GetNationalRegistrationByQueryRequest): Promise<NationalRegistrationPaginationResponse> {
    const repository = getRepository<NationalRegistration>(NationalRegistrationEntity);

    let where = {};

    if (entity.blocked) {
      where = {
        ...where,
        blocked: entity.blocked,
      };
    }

    if (entity.number) {
      where = {
        ...where,
        number: Like(`%${entity.number}%`),
      };
    }

    const [data, total] = await repository
    .findAndCount(
      {
        where,
        skip: this.getOffset(entity.skip, entity.take),
        take: entity.take,
      }
    );

    return {
      data,
      total,
      page_total: data.length,
      next: this.getNext(entity.skip),
      previous: this.getPrevious(entity.skip),
    } as NationalRegistrationPaginationResponse;
  }

  async save(entity: NationalRegistration): Promise<NationalRegistration> {
    const repository = getRepository<NationalRegistration>(NationalRegistrationEntity);

    return repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    const repository = getRepository<NationalRegistration>(NationalRegistrationEntity);

    repository.delete(id);
  }

  private getOffset(skip: number, take: number): number {
    const offset = (skip - 1) * take;

    return offset;
  }

  private getNext(skip: number): number {
    const next = Number(skip) + 1;

    return next;
  }

  private getPrevious(skip: number): number {
    if (skip <= 1) {
      return 1;
    }

    const previous = skip - 1;

    return previous;
  }
}

export default TypeORMNationalRegistrationRepository;
