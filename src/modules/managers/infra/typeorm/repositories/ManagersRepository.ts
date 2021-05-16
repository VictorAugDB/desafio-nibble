import { ICreateManagerDTO } from '@modules/managers/dtos/ICreateManagerDTO';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IManagersRepository } from '../../repositories/IManagersRepository';
import Manager from '../entities/Manager';

@EntityRepository(Manager)
export class ManagersRepository implements IManagersRepository {
  private ormRepository: Repository<Manager>;

  constructor() {
    this.ormRepository = getRepository(Manager);
  }

  public async findById(manager_id: string): Promise<Manager | undefined> {
    const manager = await this.ormRepository.findOne({
      where: { id: manager_id },
    });

    return manager;
  }

  public async findByEmail(email: string): Promise<Manager | undefined> {
    const manager = await this.ormRepository.findOne({
      where: { email },
    });

    return manager;
  }

  public async create(managerData: ICreateManagerDTO): Promise<Manager> {
    const manager = this.ormRepository.create({
      name: managerData.name,
      email: managerData.email,
      password: managerData.password,
    });

    await this.ormRepository.save(manager);

    return manager;
  }

  public async find(): Promise<Manager[]> {
    const managers = await this.ormRepository.find();

    return managers;
  }

  public async save(manager: Manager): Promise<Manager> {
    await this.ormRepository.save(manager);

    return manager;
  }

  public async remove(manager: Manager): Promise<void> {
    await this.ormRepository.remove(manager);
  }
}
