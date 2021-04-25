import { getRepository } from 'typeorm';

import Manager from '../../models/Manager';

class DeleteManagerByIdService {
  public async execute(id: string): Promise<void> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne(id);

    await managersRepository.remove(manager);
  }
}

export default DeleteManagerByIdService;
