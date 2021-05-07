import { inject, injectable } from 'tsyringe';

import { IManagersRepository } from '../infra/repositories/IManagersRepository';
import Manager from '../infra/typeorm/entities/Manager';

@injectable()
class FindAllManagersService {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
  ) {}

  public async execute(): Promise<Manager[]> {
    const managers = await this.managersRepository.find();

    return managers;
  }
}

export default FindAllManagersService;
