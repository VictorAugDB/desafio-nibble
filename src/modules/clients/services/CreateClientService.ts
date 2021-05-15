import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import { injectable, inject } from 'tsyringe';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';

interface IRequest {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    cpf,
    telephone,
    email,
  }: IRequest): Promise<Client> {
    const checkClientExists = await this.clientsRepository.findByEmail(email);

    if (checkClientExists) {
      throw new AppError('Email already exists');
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
      telephone,
      email,
    });

    return client;
  }
}

export default CreateClientService;
