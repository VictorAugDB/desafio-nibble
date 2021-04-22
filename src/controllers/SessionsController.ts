import { Request, Response } from 'express';
import AuthenticateManagerService from '@services/Managers/AuthenticateManagerService';

export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateManager = new AuthenticateManagerService();

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
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}
