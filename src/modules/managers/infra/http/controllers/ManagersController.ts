import { Request, Response } from 'express';
import CreateManagerService from '@modules/managers/services/CreateManagerService';
import UpdateManagerService from '@modules/managers/services/UpdateManagersService';
import DeleteManagerByIdService from '@modules/managers/services/DeleteManagerByIdService';
import FindAllManagersService from '@modules/managers/services/FindAllManagersService';
import { container } from 'tsyringe';

export default class ManagersController {
  public async find(request: Request, response: Response): Promise<Response> {
    const findManagers = container.resolve(FindAllManagersService);

    const managers = await findManagers.execute();

    const managersWithoutPassword = managers.map(manager => ({
      ...manager,
      password: undefined,
    }));

    return response.json(managersWithoutPassword);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createManager = container.resolve(CreateManagerService);

    const manager = await createManager.execute({
      name,
      email,
      password,
    });
    return response.json({
      ...manager,
      password: undefined,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, email, password } = request.body;

    const updateManager = container.resolve(UpdateManagerService);

    const manager = await updateManager.execute({
      id,
      name,
      email,
      password,
    });
    return response.json(manager);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteManager = container.resolve(DeleteManagerByIdService);

    await deleteManager.execute(String(id));
    return response.status(204).send();
  }
}
