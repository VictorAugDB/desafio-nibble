import { FakeAddressesRepository } from '@modules/addresses/infra/repositories/fakes/FakeAddressesRepository';
import { FakeClientsRepository } from '@modules/clients/infra/repositories/fakes/FakeClientsRepository';
import CreateClientService from '@modules/clients/services/CreateClientService';
import AppError from '@shared/errors/AppError';
import CreateAddressService from './CreateAddressService';
import DeleteAddressByIdService from './DeleteAddressByIdService';

describe('CreateClient', () => {
  it('should be able to delete an address', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const deleteAddress = new DeleteAddressByIdService(fakeAddressesRepository);
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

    spyOn(fakeAddressesRepository, 'remove');

    await deleteAddress.execute(addressesCreate[1].id);

    expect(fakeAddressesRepository.remove).toHaveBeenCalled();
  });

  it('not should be able to delete non-existent address', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const deleteAddress = new DeleteAddressByIdService(fakeAddressesRepository);
    const createClient = new CreateClientService(fakeClientsRepository);

    const client = await createClient.execute({
      name: 'joao',
      cpf: '12312312312',
      telephone: '15988874556',
      email: 'asdhaasaaasaaaasasaaasauhd@gmail.com',
    });

    await createAddress.execute({
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
      deleteAddress.execute('non-existent id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not should be able to delete primary address', async () => {
    const fakeAddressesRepository = new FakeAddressesRepository();
    const fakeClientsRepository = new FakeClientsRepository();

    const createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeClientsRepository,
    );
    const deleteAddress = new DeleteAddressByIdService(fakeAddressesRepository);
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
    await expect(
      deleteAddress.execute(addressesCreate[0].id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
