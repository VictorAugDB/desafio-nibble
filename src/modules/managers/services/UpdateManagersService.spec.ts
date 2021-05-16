import AppError from '@shared/errors/AppError';
import { FakeManagersRepository } from '../infra/repositories/fakes/FakeManagersRepository';
import CreateManagerService from './CreateManagerService';
import UpdateManagerService from './UpdateManagersService';

describe('CreateClient', () => {
  it('should be able to create a new manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const updateManager = new UpdateManagerService(fakeManagersRepository);

    const manager = await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    const updatedManager = await updateManager.execute({
      id: manager.id,
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(updatedManager.name).toEqual('John doe');
    expect(updatedManager.email).toEqual('johndoe@gmail.com');
  });

  it('not should be able to update a non-existent manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const updateManager = new UpdateManagerService(fakeManagersRepository);

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await expect(
      updateManager.execute({
        id: 'non-existent id',
        name: 'John doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
