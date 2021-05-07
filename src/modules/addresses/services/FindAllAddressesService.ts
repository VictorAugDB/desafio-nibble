import { injectable, inject } from 'tsyringe';
import { IAddressesRepository } from '../infra/repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

@injectable()
class FindAllAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<Address[]> {
    const addresses = await this.addressesRepository.find();

    return addresses;
  }
}

export default FindAllAddressesService;
