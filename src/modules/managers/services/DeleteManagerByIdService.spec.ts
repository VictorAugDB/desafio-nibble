import AppError from '@shared/errors/AppError';
import { FakeManagersRepository } from '../infra/repositories/fakes/FakeManagersRepository';
import CreateManagerService from './CreateManagerService';
import DeleteManagerByIdService from './DeleteManagerByIdService';

describe('CreateClient', () => {
  it('should be able to delete a manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const deleteManager = new DeleteManagerByIdService(fakeManagersRepository);

    const manager = await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    spyOn(fakeManagersRepository, 'remove');

    await deleteManager.execute(manager.id);

    expect(fakeManagersRepository.remove).toHaveBeenCalled();
  });

  it('not should be able to delete a non-existent manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const deleteManager = new DeleteManagerByIdService(fakeManagersRepository);

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await expect(
      deleteManager.execute('non-existent id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
