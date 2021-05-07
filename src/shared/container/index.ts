import { container } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/infra/repositories/IAddressesRepository';
import AddressesRepository from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';
import { IClientsRepository } from '@modules/clients/infra/repositories/IClientsRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IManagersRepository } from '@modules/managers/infra/repositories/IManagersRepository';
import { ManagersRepository } from '@modules/managers/infra/http/repositories/ManagersRepository';

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  ManagersRepository,
);
