import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import AppError from '@shared/errors/AppError';
import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateClientService from './UpdateClientService';

describe('CreateClient', () => {
  it('should be able to update a client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeAddressesRepository,
    );

    const updateClient = new UpdateClientService(fakeClientsRepository);

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

    const updatedClient = await updateClient.execute({
      id: client.id,
      cpf: client.cpf,
      name: 'John doe',
      email: 'johndoe@gmail.com',
      telephone: client.telephone,
    });

    expect(updatedClient).toEqual({
      id: client.id,
      cpf: client.cpf,
      name: 'John doe',
      email: 'johndoe@gmail.com',
      telephone: client.telephone,
    });
  });

  it('not should be able to update inexistent client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const updateClient = new UpdateClientService(fakeClientsRepository);

    await expect(
      updateClient.execute({
        id: 'not existent id',
        cpf: 'cpf',
        name: 'John doe',
        email: 'johndoe@gmail.com',
        telephone: 'telephone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
