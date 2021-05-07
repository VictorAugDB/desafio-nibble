import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import Manager from '@modules/managers/infra/typeorm/entities/Manager';
import { inject, injectable } from 'tsyringe';
import { IManagersRepository } from '../infra/repositories/IManagersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  manager: Manager;
  token: string;
}

@injectable()
class AuthenticateManagerService {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const manager = await this.managersRepository.findByEmail(email);

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
