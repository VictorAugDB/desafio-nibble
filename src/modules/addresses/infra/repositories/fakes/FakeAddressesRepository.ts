import { v4 as uuid } from 'uuid';

import { IAddressesRepository } from '@modules/addresses/infra/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';

import Address from '../../typeorm/entities/Address';

export class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async create(
    client_id: string,
    addressesData: ICreateAddressDTO[],
  ): Promise<Address[]> {
    const addressesAssigned = addressesData.map(address => {
      const addressData = new Address();

      Object.assign(addressData, {
        id: uuid(),
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
      });

      this.addresses.push(addressData);

      return addressData;
    });

    return addressesAssigned;
  }

  public async find(): Promise<Address[]> {
    const findAddresses = [...this.addresses];

    return findAddresses;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(
      address => address.id === address_id,
    );

    return findAddress;
  }

  public async save(addresses: Address[]): Promise<Address[]> {
    const addressesSaved = addresses.map(address => {
      const findIndex = this.addresses.findIndex(
        findClient => findClient.id === address.id,
      );

      this.addresses[findIndex] = address;

      return address;
    });

    return addressesSaved;
  }

  public async remove(address: Address): Promise<void> {
    this.addresses.filter(filterAddress => filterAddress.id !== address.id);
  }
}
