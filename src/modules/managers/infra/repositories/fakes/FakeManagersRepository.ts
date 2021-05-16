import { ICreateManagerDTO } from '@modules/managers/dtos/ICreateManagerDTO';
import { v4 as uuid } from 'uuid';

import Manager from '../../typeorm/entities/Manager';
import { IManagersRepository } from '../IManagersRepository';

export class FakeManagersRepository implements IManagersRepository {
  private managers: Manager[] = [];

  public async findById(manager_id: string): Promise<Manager | undefined> {
    const findManager = this.managers.find(
      manager => manager.id === manager_id,
    );

    return findManager;
  }

  public async findByEmail(email: string): Promise<Manager | undefined> {
    const findManager = this.managers.find(manager => manager.email === email);

    return findManager;
  }

  public async create(managerData: ICreateManagerDTO): Promise<Manager> {
    const manager = new Manager();

    Object.assign(manager, {
      id: uuid(),
      name: managerData.name,
      email: managerData.email,
      password: managerData.password,
    });

    this.managers.push(manager);

    return manager;
  }

  public async find(): Promise<Manager[]> {
    const managersData = [...this.managers];

    return managersData;
  }

  public async save(manager: Manager): Promise<Manager> {
    const findIndex = this.managers.findIndex(
      findManager => findManager.id === manager.id,
    );

    this.managers[findIndex] = manager;

    return manager;
  }

  public async remove(manager: Manager): Promise<void> {
    this.managers.filter(filterManager => filterManager.id !== manager.id);
  }
}
