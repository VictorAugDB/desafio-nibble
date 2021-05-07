import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';

@injectable()
class DeleteClientByIdService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client does not exists');
    }

    await this.clientsRepository.remove(client);
  }
}

export default DeleteClientByIdService;
