import Manager from '@modules/managers/infra/typeorm/entities/Manager';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IManagersRepository } from '../infra/repositories/IManagersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateManagerService {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Manager> {
    const checkManagerExists = await this.managersRepository.findByEmail(email);

    if (checkManagerExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const manager = await this.managersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return manager;
  }
}

export default CreateManagerService;
