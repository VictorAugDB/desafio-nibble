import AppError from '@shared/errors/AppError';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import { IClientsRepository } from '@modules/clients/infra/repositories/IClientsRepository';
import { injectable, inject } from 'tsyringe';
import { IAddressesRepository } from '../infra/repositories/IAddressesRepository';

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
  client_id: string;
  addresses: IAddressProps[];
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ client_id, addresses }: IRequest): Promise<Address[]> {
    const client = await this.clientsRepository.findById(client_id);
    const findAddresses = await this.addressesRepository.find({
      where: { client_id },
    });

    if (!client) {
      throw new AppError('Client does not exists');
    }

    const existentAddressesWithNewAddresses = [...findAddresses, ...addresses];

    const checkPrimaryAddresses = existentAddressesWithNewAddresses.map(
      address => address.is_primary_address,
    );

    if (
      checkPrimaryAddresses.filter(isPrimary => isPrimary === true).length > 1
    ) {
      throw new AppError('Only allowed one primary address');
    }

    if (
      checkPrimaryAddresses.filter(isPrimary => isPrimary === true).length < 1
    ) {
      throw new AppError('Primary address is needed');
    }

    const createdAddresses = await this.addressesRepository.create(
      client_id,
      addresses,
    );

    return createdAddresses;
  }
}

export default CreateAddressService;
