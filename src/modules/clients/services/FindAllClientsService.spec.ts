import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import FindAllClientsService from './FindAllClientsService';

describe('CreateClient', () => {
  it('should be able to find all clients', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const createClient = new CreateClientService(fakeClientsRepository);

    const findClients = new FindAllClientsService(fakeClientsRepository);

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'abcd@gmail.com',
    });

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'abc@gmail.com',
    });

    const clients = await findClients.execute();

    expect(clients.length).toEqual(2);
  });
});
