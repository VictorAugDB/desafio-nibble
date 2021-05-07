import ClientsController from '@modules/clients/infra/http/controllers/ClientsController';
import { Router } from 'express';
import ensureAuthenticated from '@modules/managers/infra/http/middlewares/ensureAuthenticated';

export const clientRouter = Router();

const clientsController = new ClientsController();

clientRouter.use(ensureAuthenticated);

clientRouter.get('/', clientsController.find);
clientRouter.post('/', clientsController.create);
clientRouter.put('/', clientsController.update);
clientRouter.delete('/', clientsController.delete);
