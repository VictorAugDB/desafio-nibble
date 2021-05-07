import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '../typeorm/entities/Address';

export interface IAddressesRepository {
  create(
    client_id: string,
    addressesData: ICreateAddressDTO[],
  ): Promise<Address[]>;
  find(): Promise<Address[]>;
  findById(address_id: string): Promise<Address | undefined>;
  save(addresses: Address[]): Promise<Address[]>;
  remove(address: Address): Promise<void>;
}
