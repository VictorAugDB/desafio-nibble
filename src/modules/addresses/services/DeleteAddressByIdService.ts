import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import { IAddressesRepository } from '../infra/repositories/IAddressesRepository';

@injectable()
class DeleteAddressByIdService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address does not exists');
    }

    if (address.is_primary_address) {
      throw new AppError('Not is possible to delete a primary address');
    }

    await this.addressesRepository.remove(address);
  }
}

export default DeleteAddressByIdService;
