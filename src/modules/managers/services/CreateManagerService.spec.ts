import AppError from '@shared/errors/AppError';
import { FakeManagersRepository } from '../infra/repositories/fakes/FakeManagersRepository';
import CreateManagerService from './CreateManagerService';

describe('CreateClient', () => {
  it('should be able to create a new manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);

    const manager = await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    expect(manager).toHaveProperty('id');
    expect(manager.name).toBe('joao');
  });

  it('not should be able to create a new manager with the same email', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await expect(
      createManager.execute({
        name: 'joao two',
        email: 'abcd@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
