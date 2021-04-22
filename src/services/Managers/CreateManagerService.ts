import { getRepository } from 'typeorm';

import Manager from '@models/Manager';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateClientService {
  public async execute({ name, email, password }: Request): Promise<Manager> {
    const managersRepository = getRepository(Manager);

    const checkClientExists = await managersRepository.findOne({
      where: { email },
    });

    if (checkClientExists) {
      throw new Error('Email already exists');
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

export default CreateClientService;
