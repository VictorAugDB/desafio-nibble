import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

import Client from '@models/Client';

interface Request {
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  email: string;
}

class UpdateClientService {
  public async execute({
    id,
    name,
    cpf,
    telephone,
    email,
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const checkClientExists = await clientsRepository.findOne({
      where: { id },
    });

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

    await clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
