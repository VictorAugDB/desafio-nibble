import SessionsController from 'controllers/SessionsController';
import { Router } from 'express';

export const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', sessionsController.login);
