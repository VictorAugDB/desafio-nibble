import ClientsController from 'controllers/ClientsController';
import { Router } from 'express';

export const clientRouter = Router();

const clientsController = new ClientsController();

clientRouter.get('/', clientsController.find);
clientRouter.post('/', clientsController.create);
clientRouter.put('/', clientsController.update);
clientRouter.delete('/', clientsController.delete);
