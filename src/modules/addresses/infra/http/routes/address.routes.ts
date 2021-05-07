import AddressesController from '@modules/addresses/infra/http/controllers/AddressesController';
import { Router } from 'express';
import ensureAuthenticated from '@modules/managers/infra/http/middlewares/ensureAuthenticated';

export const addressRouter = Router();

const addressesController = new AddressesController();

addressRouter.use(ensureAuthenticated);

addressRouter.get('/', addressesController.find);
addressRouter.get('/specific', addressesController.findById);
addressRouter.post('/', addressesController.create);
addressRouter.put('/', addressesController.update);
addressRouter.delete('/', addressesController.delete);
