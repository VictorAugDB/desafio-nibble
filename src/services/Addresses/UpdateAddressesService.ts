import AppError from '@errors/AppError';
import { getRepository } from 'typeorm';

import Address from '@models/Address';

interface Request {
  addresses: Address[];
}

class UpdateAddressesService {
  public async execute({ addresses }: Request): Promise<Address[]> {
    const addressesRepository = getRepository(Address);

    const checkPrimaryAddresses = addresses.map(
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

    await addressesRepository.save(addresses);

    return addresses;
  }
}

export default UpdateAddressesService;
