import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import FindClientsWithPaginationService from './FindClientsWithPaginationService';

describe('CreateClient', () => {
  it('should be able to find clients with pagination', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const createClient = new CreateClientService(fakeClientsRepository);

    const findClients = new FindClientsWithPaginationService(
      fakeClientsRepository,
    );

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

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'ab@gmail.com',
    });

    const [clients, number] = await findClients.execute({
      skip: 1,
      take: 2,
    });

    expect(clients.length).toEqual(2);
    expect(number).toEqual(3);
  });
});
