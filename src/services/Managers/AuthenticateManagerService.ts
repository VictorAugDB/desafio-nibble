import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@errors/AppError';
import authConfig from '@config/auth';

import Manager from '@models/Manager';

interface Request {
  email: string;
  password: string;
}

interface Response {
  manager: Manager;
  token: string;
}

class AuthenticateManagerService {
  public async execute({ email, password }: Request): Promise<Response> {
    const managersRepository = getRepository(Manager);

    const manager = await managersRepository.findOne({ where: { email } });

    if (!manager) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, manager.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: manager.id,
      expiresIn,
    });

    return {
      manager,
      token,
    };
  }
}

export default AuthenticateManagerService;
