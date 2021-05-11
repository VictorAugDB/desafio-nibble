import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import FindAllClientsService from './FindAllClientsService';

describe('CreateClient', () => {
  it('should be able to find all clients', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeAddressesRepository,
    );

    const findClients = new FindAllClientsService(fakeClientsRepository);

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'abcd@gmail.com',
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

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'abc@gmail.com',
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

    const clients = await findClients.execute();

    expect(clients.length).toEqual(2);
  });
});
