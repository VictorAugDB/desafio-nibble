import { Request, Response } from 'express';
import AuthenticateManagerService from '@modules/managers/services/AuthenticateManagerService';
import { ManagersRepository } from '@modules/managers/infra/http/repositories/ManagersRepository';

export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const managersRepository = new ManagersRepository();

    const authenticateManager = new AuthenticateManagerService(
      managersRepository,
    );

    const { manager, token } = await authenticateManager.execute({
      email,
      password,
    });

    const clientAuthWithoutPassword = {
      user: {
        id: manager.id,
        name: manager.name,
        email: manager.email,
        created_at: manager.created_at,
        updated_at: manager.updated_at,
      },
      token,
    };

    return response.json(clientAuthWithoutPassword);
  }
}
