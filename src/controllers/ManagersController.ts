import Client from '@models/Client';
import { Request, Response } from 'express';
import CreateManagerService from '@services/Managers/CreateManagerService';
// import DeleteManagerByIdService from '@services/Managers/DeleteManagerByIdService';
// import UpdateManagerService from '@services/Managers/UpdateManagerService';
import { getRepository } from 'typeorm';

export default class ManagersController {
  public async find(request: Request, response: Response): Promise<Response> {
    const managersRepository = getRepository(Client);
    const manager = await managersRepository.find();

    return response.json(manager);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createManager = new CreateManagerService();

      const manager = await createManager.execute({
        name,
        email,
        password,
      });
      return response.json(manager);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const { id, name, email, password } = request.body;

  //     const updateManager = new UpdateManagerService();

  //     const manager = await updateManager.execute({
  //       id,
  //       name,
  //       email,
  //       password,
  //     });
  //     return response.json(manager);
  //   } catch (err) {
  //     return response.status(400).json(err.message);
  //   }
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const { id } = request.query;

  //     const deleteManager = new DeleteManagerByIdService();

  //     await deleteManager.execute(String(id));
  //     return response.status(204).send();
  //   } catch (err) {
  //     return response.status(400).json(err.message);
  //   }
  // }
}
