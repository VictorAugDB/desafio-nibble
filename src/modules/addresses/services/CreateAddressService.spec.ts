import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import { FakeClientsRepository } from '@modules/clients/infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from '@modules/clients/services/CreateClientService';
import AppError from '@shared/errors/AppError';
import CreateAddressService from './CreateAddressService';

describe('CreateClient', () => {
  it('should be able to create a new address', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);

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

    addressesCreate.map(address => expect(address).toHaveProperty('id'));
  });

  it('not should be able to create a new address if there are duplicate primary addresses ', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);

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

    addressesCreate.map(address => expect(address).toHaveProperty('id'));
  });

  it('not should be able to create a new address to nonexistent client', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );

    await expect(
      createAddress.execute({
        client_id: 'nonexistent client_id',
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
