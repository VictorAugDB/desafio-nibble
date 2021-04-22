import { Router } from 'express';
import { clientRouter } from './client.routes';
import { addressRouter } from './address.routes';
import { managerRouter } from './manager.routes';
import { sessionRouter } from './session.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/address', addressRouter);
routes.use('/manager', managerRouter);
routes.use('/session', sessionRouter);

export default routes;
