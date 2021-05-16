import { FakeManagersRepository } from '../infra/repositories/fakes/FakeManagersRepository';
import CreateManagerService from './CreateManagerService';
import FindAllManagersService from './FindAllManagersService';

describe('CreateClient', () => {
  it('should be able to create a new manager', async () => {
    const fakeManagersRepository = new FakeManagersRepository();

    const createManager = new CreateManagerService(fakeManagersRepository);
    const findManagers = new FindAllManagersService(fakeManagersRepository);

    await createManager.execute({
      name: 'joao',
      email: 'abcd@gmail.com',
      password: '123456',
    });

    await createManager.execute({
      name: 'joao',
      email: 'abcde@gmail.com',
      password: '123456',
    });

    await createManager.execute({
      name: 'joao',
      email: 'abcdef@gmail.com',
      password: '123456',
    });

    const managers = await findManagers.execute();

    expect(managers.length).toEqual(3);
  });
});
