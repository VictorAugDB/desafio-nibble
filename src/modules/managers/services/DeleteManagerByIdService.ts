import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IManagersRepository } from '../infra/repositories/IManagersRepository';

@injectable()
class DeleteManagerByIdService {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const manager = await this.managersRepository.findById(id);

    if (!manager) {
      throw new AppError('Manager does not exists');
    }

    await this.managersRepository.remove(manager);
  }
}

export default DeleteManagerByIdService;
