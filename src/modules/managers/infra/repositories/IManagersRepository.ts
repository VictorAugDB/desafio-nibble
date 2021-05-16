import { ICreateManagerDTO } from '@modules/managers/dtos/ICreateManagerDTO';
import Manager from '../typeorm/entities/Manager';

export interface IManagersRepository {
  create(managerData: ICreateManagerDTO): Promise<Manager>;
  findById(manager_id: string): Promise<Manager | undefined>;
  findByEmail(email: string): Promise<Manager | undefined>;
  find(): Promise<Manager[]>;
  save(manager: Manager): Promise<Manager>;
  remove(manager: Manager): Promise<void>;
}
