import Manager from '@modules/managers/infra/typeorm/entities/Manager';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IManagersRepository } from '../infra/repositories/IManagersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateManagerService {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<Manager> {
    const checkManagerExists = await this.managersRepository.findById(id);

    if (!checkManagerExists) {
      throw new AppError('Manager does not exists');
    }

    const hashedPassword = await hash(password, 8);

    const manager = {
      ...checkManagerExists,
      name,
      email,
      password: hashedPassword,
    };

    await this.managersRepository.save(manager);

    return manager;
  }
}

export default UpdateManagerService;
