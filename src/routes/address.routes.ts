import AddressesController from '@controllers/AddressesController';
import { Router } from 'express';

export const addressRouter = Router();

const addressesController = new AddressesController();

addressRouter.get('/', addressesController.find);
addressRouter.post('/', addressesController.create);
addressRouter.put('/', addressesController.update);
addressRouter.delete('/', addressesController.delete);
