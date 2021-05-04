import { getRepository } from 'typeorm';

import Client from '../../models/Client';
import Address from '../../models/Address';

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
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  addresses: AddressProps[];
}

class CreateClientService {
  public async execute({
    name,
    cpf,
    telephone,
    email,
    addresses,
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);
    const addressesRepository = getRepository(Address);

    const checkClientExists = await clientsRepository.findOne({
      where: { email },
    });

    if (checkClientExists) {
      throw new Error('Email already exists');
    }

    const checkDuplicatedPrimaryAddresses = addresses.map(
      address => address.is_primary_address,
    );

    if (
      checkDuplicatedPrimaryAddresses.filter(isPrimary => isPrimary === true)
        .length > 1
    ) {
      throw new Error('Only allowed one primary address');
    }

    const client = clientsRepository.create({
      name,
      cpf,
      telephone,
      email,
    });

    await clientsRepository.save(client);

    const addressesCreate = addresses.map(address => {
      const createAddress = addressesRepository.create({
        client_id: client.id,
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

    const addressesMoreClient = {
      ...client,
      addresses: [...addressesCreate],
    };

    return addressesMoreClient;
  }
}

export default CreateClientService;
