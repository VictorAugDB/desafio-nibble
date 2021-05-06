import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

import Manager from '@models/Manager';

class DeleteManagerByIdService {
  public async execute(id: string): Promise<void> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne(id);

    if (!manager) {
      throw new AppError('Manager does not exists');
    }

    await managersRepository.remove(manager);
  }
}

export default DeleteManagerByIdService;
