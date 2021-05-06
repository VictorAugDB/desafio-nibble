import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';
import Client from '@models/Client';
import Address from '@models/Address';

interface AddressProps {
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

interface Request {
  client_id: string;
  addresses: AddressProps[];
}

class CreateAddressService {
  public async execute({ client_id, addresses }: Request): Promise<Address[]> {
    const clientsRepository = getRepository(Client);
    const addressesRepository = getRepository(Address);

    const client = await clientsRepository.findOne({
      where: { id: client_id },
    });

    if (!client) {
      throw new AppError('Client does not exists');
    }

    const addressesWithClientAddresses = [...client.addresses, ...addresses];

    const checkPrimaryAddresses = addressesWithClientAddresses.map(
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

    const addressesCreate = addresses.map(address => {
      const createAddress = addressesRepository.create({
        client_id,
        cep: address.cep,
        state: address.state,
        city: address.city,
        district: address.district,
        road: address.road,
        number: address.number,
        complement: address.complement,
        type: address.type,
        is_primary_address: address.is_primary_address,
      });

      return createAddress;
    });

    await addressesRepository.save(addressesCreate);

    return addressesCreate;
  }
}

export default CreateAddressService;
