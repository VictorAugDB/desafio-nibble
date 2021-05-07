import { injectable, inject } from 'tsyringe';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

@injectable()
class FindAllClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.find();

    return clients;
  }
}

export default FindAllClientsService;
