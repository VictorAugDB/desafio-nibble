import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Address from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '../infra/repositories/IAddressesRepository';

interface IRequest {
  addresses: Address[];
}

@injectable()
class UpdateAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ addresses }: IRequest): Promise<Address[]> {
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

    await this.addressesRepository.save(addresses);

    return addresses;
  }
}

export default UpdateAddressesService;
