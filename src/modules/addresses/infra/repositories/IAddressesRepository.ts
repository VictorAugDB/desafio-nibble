import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import { FindManyOptions } from 'typeorm';
import Address from '../typeorm/entities/Address';

export interface IAddressesRepository {
  create(
    client_id: string,
    addressesData: ICreateAddressDTO[],
  ): Promise<Address[]>;
  find(options?: FindManyOptions): Promise<Address[]>;
  findById(address_id: string): Promise<Address | undefined>;
  save(addresses: Address[]): Promise<Address[]>;
  remove(address: Address): Promise<void>;
}
