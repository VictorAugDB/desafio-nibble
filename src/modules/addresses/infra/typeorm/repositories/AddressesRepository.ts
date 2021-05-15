import {
  EntityRepository,
  FindManyOptions,
  getRepository,
  Repository,
} from 'typeorm';
import { IAddressesRepository } from '@modules/addresses/infra/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';

import Address from '../entities/Address';

@EntityRepository(Address)
class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(
    client_id: string,
    addressesData: ICreateAddressDTO[],
  ): Promise<Address[]> {
    const addresses = addressesData.map(address =>
      this.ormRepository.create({
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
      }),
    );

    await this.ormRepository.save(addresses);

    return addresses;
  }

  public async find(options?: FindManyOptions): Promise<Address[]> {
    if (options) {
      const addresses = await this.ormRepository.find(options);

      return addresses;
    }

    const addresses = await this.ormRepository.find();

    return addresses;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id: address_id },
    });

    return address;
  }

  public async save(addresses: Address[]): Promise<Address[]> {
    await this.ormRepository.save(addresses);

    return addresses;
  }

  public async remove(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }
}

export default AddressesRepository;
