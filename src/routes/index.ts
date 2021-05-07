import { Router } from 'express';
import { clientRouter } from '../modules/clients/infra/http/routes/client.routes';
import { addressRouter } from '../modules/addresses/infra/http/routes/address.routes';
import { managerRouter } from '../modules/managers/infra/http/routes/manager.routes';
import { sessionRouter } from '../modules/managers/infra/http/routes/session.routes';

const routes = Router();

routes.use('/client', clientRouter);
routes.use('/address', addressRouter);
routes.use('/manager', managerRouter);
routes.use('/session', sessionRouter);

export default routes;
