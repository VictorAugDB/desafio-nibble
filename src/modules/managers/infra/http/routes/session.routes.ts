import SessionsController from '@modules/managers/infra/http/controllers/SessionsController';
import { Router } from 'express';

export const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', sessionsController.login);
