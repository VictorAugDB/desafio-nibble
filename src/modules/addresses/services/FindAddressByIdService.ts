import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { IAddressesRepository } from '../infra/repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

@injectable()
class FindAddressByIdService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(id: string): Promise<Address> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address does not exists');
    }

    return address;
  }
}

export default FindAddressByIdService;
