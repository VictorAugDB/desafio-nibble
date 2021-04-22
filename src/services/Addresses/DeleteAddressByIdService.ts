import { getRepository } from 'typeorm';

import Address from '../../models/Address';

class DeleteAddressByIdService {
  public async execute(id: string): Promise<void> {
    const addressesRepository = getRepository(Address);

    const address = await addressesRepository.findOne(id);

    await addressesRepository.remove(address);
  }
}

export default DeleteAddressByIdService;
