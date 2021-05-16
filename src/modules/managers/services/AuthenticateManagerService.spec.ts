import AppError from '@shared/errors/AppError';
import { FakeManagersRepository } from '../infra/repositories/fakes/FakeManagersRepository';
import AuthenticateManagerService from './AuthenticateManagerService';
import CreateManagerService from './CreateManagerService';

describe('CreateClient', () => {
  it('should be able to authenticate a manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const authenticateManager = new AuthenticateManagerService(
      fakeManagersRepository,
    );

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateManager.execute({
        email: 'abcd@gmail.com',
        password: '123456',
      }),
    ).resolves.toHaveProperty('token');
  });

  it('not should be able to authenticate a manager with wrong credentials', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const authenticateManager = new AuthenticateManagerService(
      fakeManagersRepository,
    );

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateManager.execute({
        email: 'abcd@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateManager.execute({
        email: 'abcde@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
