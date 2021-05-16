import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import { FakeClientsRepository } from '@modules/clients/infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from '@modules/clients/services/CreateClientService';
import CreateAddressService from './CreateAddressService';
import FindAllAddressesService from './FindAllAddressesService';

describe('CreateClient', () => {
  it('should be able to find an address by id', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const createClient = new CreateClientService(fakeClientsRepository);
    const findAddress = new FindAllAddressesService(fakeAddressesRepository);

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

    await expect(findAddress.execute()).resolves.toEqual(addressesCreate);
  });
});
