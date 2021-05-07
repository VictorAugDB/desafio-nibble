import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';

interface IRequest {
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  email: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    id,
    name,
    cpf,
    telephone,
    email,
  }: IRequest): Promise<Client> {
    const checkClientExists = await this.clientsRepository.findById(id);

    if (!checkClientExists) {
      throw new AppError('Client does not exists');
    }

    const client = {
      ...checkClientExists,
      name,
      cpf,
      telephone,
      email,
    };

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
