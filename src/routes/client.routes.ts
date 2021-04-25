import ClientsController from 'controllers/ClientsController';
import { Router } from 'express';
import ensureAuthenticated from 'middlewares/ensureAuthenticated';

export const clientRouter = Router();

const clientsController = new ClientsController();

clientRouter.use(ensureAuthenticated);

clientRouter.get('/', clientsController.find);
clientRouter.post('/', clientsController.create);
clientRouter.put('/', clientsController.update);
clientRouter.delete('/', clientsController.delete);
