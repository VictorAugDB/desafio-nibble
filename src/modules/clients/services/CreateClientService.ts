import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import { IAddressesRepository } from '@modules/addresses/infra/repositories/IAddressesRepository';
import { injectable, inject } from 'tsyringe';
import { IClientsRepository } from '../infra/repositories/IClientsRepository';

interface IAddressProps {
  cep: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: string;
  complement: string;
  type: string;
  is_primary_address: boolean;
}

interface IRequest {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  addresses: IAddressProps[];
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    name,
    cpf,
    telephone,
    email,
    addresses,
  }: IRequest): Promise<Client> {
    const checkClientExists = await this.clientsRepository.findByEmail(email);

    if (checkClientExists) {
      throw new AppError('Email already exists');
    }

    const checkDuplicatedPrimaryAddresses = addresses.map(
      address => address.is_primary_address,
    );

    if (
      checkDuplicatedPrimaryAddresses.filter(isPrimary => isPrimary === true)
        .length > 1
    ) {
      throw new AppError('Only allowed one primary address');
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
      telephone,
      email,
    });

    const createdAddresses = await this.addressesRepository.create(
      client.id,
      addresses,
    );

    const addressesMoreClient = {
      ...client,
      addresses: [...createdAddresses],
    };

    return addressesMoreClient;
  }
}

export default CreateClientService;
