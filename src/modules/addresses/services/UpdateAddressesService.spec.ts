import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import { FakeClientsRepository } from '@modules/clients/infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from '@modules/clients/services/CreateClientService';
import AppError from '@shared/errors/AppError';
import CreateAddressService from './CreateAddressService';
import UpdateAddressesService from './UpdateAddressesService';

describe('CreateClient', () => {
  it('should be able to update addresses', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);
    const updateAddress = new UpdateAddressesService(fakeAddressesRepository);

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    const addressesCreate = await createAddress.execute({
      client_id: client.id,
      addresses: [
        {
          cep: '12345154',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1234',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: true,
        },
        {
          cep: '12345153',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1233',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: false,
        },
      ],
    });

    const updatedAddresses = await updateAddress.execute({
      addresses: [
        {
          ...addressesCreate[0],
          cep: '1234567',
          is_primary_address: false,
        },
        {
          ...addressesCreate[1],
          cep: '1234578',
          is_primary_address: true,
        },
      ],
    });

    expect(updatedAddresses[0].cep).toEqual('1234567');
    expect(updatedAddresses[0].is_primary_address).toEqual(false);
    expect(updatedAddresses[1].cep).toEqual('1234578');
    expect(updatedAddresses[1].is_primary_address).toEqual(true);
  });

  it('not should be able to update with two primary addresses', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);
    const updateAddress = new UpdateAddressesService(fakeAddressesRepository);

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    const addressesCreate = await createAddress.execute({
      client_id: client.id,
      addresses: [
        {
          cep: '12345154',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1234',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: true,
        },
        {
          cep: '12345153',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1233',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: false,
        },
      ],
    });

    await expect(
      updateAddress.execute({
        addresses: [
          {
            ...addressesCreate[0],
            cep: '1234567',
            is_primary_address: true,
          },
          {
            ...addressesCreate[1],
            cep: '1234578',
            is_primary_address: true,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be able to update addresse without primary address', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);
    const updateAddress = new UpdateAddressesService(fakeAddressesRepository);

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    const addressesCreate = await createAddress.execute({
      client_id: client.id,
      addresses: [
        {
          cep: '12345154',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1234',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: true,
        },
        {
          cep: '12345153',
          state: 'sp',
          city: 'votorantim',
          district: 'José do crespo',
          road: 'Avenida da paz',
          number: '1233',
          complement: 'casa',
          type: 'comercial',
          is_primary_address: false,
        },
      ],
    });

    await expect(
      updateAddress.execute({
        addresses: [
          {
            ...addressesCreate[0],
            cep: '1234567',
            is_primary_address: false,
          },
          {
            ...addressesCreate[1],
            cep: '1234578',
            is_primary_address: false,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
