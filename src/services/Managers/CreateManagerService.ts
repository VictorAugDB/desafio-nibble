import { getRepository } from 'typeorm';

import Manager from '@models/Manager';
import { hash } from 'bcryptjs';
import AppError from '@errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateManagerService {
  public async execute({ name, email, password }: Request): Promise<Manager> {
    const managersRepository = getRepository(Manager);

    const checkManagerExists = await managersRepository.findOne({
      where: { email },
    });

    if (checkManagerExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const manager = managersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await managersRepository.save(manager);

    return manager;
  }
}

export default CreateManagerService;
