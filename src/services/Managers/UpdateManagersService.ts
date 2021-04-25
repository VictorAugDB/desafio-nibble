import { getRepository } from 'typeorm';

import Manager from '@models/Manager';
import { hash } from 'bcryptjs';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateManagerService {
  public async execute({
    id,
    name,
    email,
    password,
  }: Request): Promise<Manager> {
    const managersRepository = getRepository(Manager);

    const checkManagerExists = await managersRepository.findOne({
      where: { id },
    });

    if (!checkManagerExists) {
      throw new Error('Manager does not exists');
    }

    const hashedPassword = await hash(password, 8);

    const manager = {
      ...checkManagerExists,
      name,
      email,
      password: hashedPassword,
    };

    await managersRepository.save(manager);

    return manager;
  }
}

export default UpdateManagerService;
