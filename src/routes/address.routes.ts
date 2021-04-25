import AddressesController from '@controllers/AddressesController';
import { Router } from 'express';
import ensureAuthenticated from 'middlewares/ensureAuthenticated';

export const addressRouter = Router();

const addressesController = new AddressesController();

addressRouter.use(ensureAuthenticated);

addressRouter.get('/', addressesController.find);
addressRouter.post('/', addressesController.create);
addressRouter.put('/', addressesController.update);
addressRouter.delete('/', addressesController.delete);
