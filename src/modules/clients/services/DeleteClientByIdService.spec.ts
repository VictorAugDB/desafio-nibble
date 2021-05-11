import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import AppError from '@shared/errors/AppError';
import { FakeClientsRepository } from '../infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import DeleteClientByIdService from './DeleteClientByIdService';

describe('CreateClient', () => {
  it('should be able to delete a client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeAddressesRepository = new FakeAddressesRepository();

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeAddressesRepository,
    );
    const deleteClient = new DeleteClientByIdService(fakeClientsRepository);

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

    spyOn(fakeClientsRepository, 'remove');

    await deleteClient.execute(client.id);

    expect(fakeClientsRepository.remove).toHaveBeenCalled();
  });

  it('not should be able to delete a inexistent client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();

    const deleteClient = new DeleteClientByIdService(fakeClientsRepository);

    await expect(
      deleteClient.execute('not existent id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
