import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import AppError from '@shared/errors/AppError';
import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

describe('CreateClient', () => {
  it('should be able to create a new client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeAddressesRepository,
    );

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
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

    expect(client).toHaveProperty('id');
    expect(client.name).toBe('joao');
  });

  it('not should be able to create a new client with same email from another', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeAddressesRepository,
    );

    await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
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
      createClient.execute({
        name: 'joao',
        cpf: '12312312312',
        telephone: '15988874556',
        email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
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
