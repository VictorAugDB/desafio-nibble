import { getRepository } from 'typeorm';

import Client from '../../models/Client';

class DeleteClientByIdService {
  public async execute(id: string): Promise<void> {
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne(id);

    await clientsRepository.remove(client);
  }
}

export default DeleteClientByIdService;
