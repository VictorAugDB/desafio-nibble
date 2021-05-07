import { injectable, inject } from 'tsyringe';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  take: number;
  skip: number;
}

@injectable()
class FindClientsWithPaginationService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ skip, take }: IRequest): Promise<[Client[], number]> {
    const [clients, number] = await this.clientsRepository.findAndCount(
      skip,
      take,
    );

    return [clients, number];
  }
}

export default FindClientsWithPaginationService;
