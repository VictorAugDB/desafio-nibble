import ManagersController from 'controllers/ManagersController';
import { Router } from 'express';
import ensureAuthenticated from 'middlewares/ensureAuthenticated';

export const managerRouter = Router();

const managersController = new ManagersController();

managerRouter.get('/', managersController.find);
managerRouter.post('/', managersController.create);
managerRouter.put('/', managersController.update);
managerRouter.delete('/', managersController.delete);
