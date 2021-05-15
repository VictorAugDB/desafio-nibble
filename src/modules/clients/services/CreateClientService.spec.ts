import AppError from '@shared/errors/AppError';
import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

describe('CreateClient', () => {
  it('should be able to create a new client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const createClient = new CreateClientService(fakeClientsRepository);

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    expect(client).toHaveProperty('id');
    expect(client.name).toBe('joao');
  });

  it('not should be able to create a new client with same email from another', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const createClient = new CreateClientService(fakeClientsRepository);

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    await expect(
      createClient.execute({
        name: 'joao',
        cpf: '12312312312',
        telephone: '15988874556',
        email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
